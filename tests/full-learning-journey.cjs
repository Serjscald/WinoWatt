'use strict';
/*
 * Полное прохождение 6 тем: 73 карточки, 73 вопроса, 19 практических ситуаций.
 * Запуск: WINOWATT_BASE_URL=http://127.0.0.1:8765/ node tests/full-learning-journey.cjs
 * Нужен локальный HTTP-сервер и Playwright Chromium.
 */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.WINOWATT_BASE_URL||'http://127.0.0.1:8765/';
const sizes=[390,1280];

async function enterTopic(page,i){
 await page.locator('.tile.primary').click();
 await page.locator('button.topic').nth(i).click();
 await page.locator('.modes .mode').first().waitFor();
}
async function leaveToHome(page){
 await page.locator('button.back').click();
 await page.locator('button.back').click();
 await page.locator('.tile.primary').waitFor();
}
async function continueLearning(page){
 await page.getByRole('button',{name:'Показать ответ'}).click();
 await page.getByRole('button',{name:'Следующая карточка',exact:false}).click();
}
async function completeQuiz(page,total,chooseCorrect){
 const directions=[];
 for(let n=0;n<total;n++){
  const tag=await page.locator('section.panel .eyebrow').first().innerText();
  assert(['ПРЯМОЙ ВОПРОС','ОБРАТНЫЙ ВОПРОС'].includes(tag),'Неизвестное направление контроля');
  directions.push(tag);
  const choices=page.locator('button.choice');
  assert.equal(await choices.count(),3,'Три ответа в контроле');
  const correctLabel=await page.evaluate(()=>{
   const d=window.VinoVattData;return Boolean(d&&d.questions?.length);
  });
  assert(correctLabel,'Учебная база не подключена');
  // Выбираем первый ответ: при случайной перестановке будут и верные, и неверные ответы.
  await choices.first().click();
  assert.equal(await page.locator('button.choice.correct').count(),1);
  assert.equal(await page.locator('button.choice:disabled').count(),3);
  const correct=await page.locator('button.choice.correct').innerText();
  assert.equal(await page.locator('.result .correct-answer').innerText(),'Правильный ответ: '+correct);
  assert(await page.locator('.result').isVisible());
  await page.getByRole('button',{name:'Следующий вопрос',exact:false}).click();
 }
 const heading=await page.locator('h1').first().innerText();
 assert.match(heading,new RegExp('Результат: [0-9]+ из '+total));
 const backwards=directions.filter(x=>x==='ОБРАТНЫЙ ВОПРОС').length;
 assert([Math.floor(total/2),Math.ceil(total/2)].includes(backwards),'Баланс контрольных формулировок');
 return {directions,backwards,heading};
}
async function completePractice(page,total){
 for(let n=0;n<total;n++){
  const choices=page.locator('button.choice');
  assert.equal(await choices.count(),3);
  await choices.first().click();
  assert.equal(await page.locator('button.choice.correct').count(),1);
  assert.equal(await page.locator('button.choice:disabled').count(),3);
  const correct=await page.locator('button.choice.correct').innerText();
  assert.equal(await page.locator('.result .correct-answer').innerText(),'Лучшее решение: '+correct);
  assert(await page.locator('.result').getByText('Почему этот подход работает:',{exact:false}).count()>=1);
  await page.getByRole('button',{name:'Следующая ситуация',exact:false}).click();
 }
 assert.match(await page.locator('h1').first().innerText(),new RegExp('Результат: [0-9]+ из '+total));
}
async function trial(browser,width){
 const context=await browser.newContext({viewport:{width,height:844},isMobile:width<=768,hasTouch:width<=768});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'load'});
 const seenLearn=new Set(),topicIds=await page.evaluate(()=>window.VinoVattData.topics.map(x=>x.id));
 assert.equal(topicIds.length,6);
 const cardTotals=[12,13,12,12,12,12],practiceTotals=[3,4,3,3,3,3];
 let learned=0,quizzed=0,practiced=0,firstTopicDirections=null;
 // Межтематическая изоляция: оставленная на третьей карточке тема №1
 // не должна влиять на новую тему №2.
 await enterTopic(page,0);
 await page.locator('.modes .mode').nth(1).click();
 await continueLearning(page);await continueLearning(page);
 assert.match(await page.locator('h1').first().innerText(),/Карточка 3/);
 const progress0=await page.evaluate(id=>JSON.parse(localStorage.getItem('vinovatt:learn:v2:'+id)),topicIds[0]);
 assert.equal(progress0.index,2);
 await page.locator('button.back').click();await leaveToHome(page);
 await enterTopic(page,1);await page.locator('.modes .mode').nth(1).click();
 assert.match(await page.locator('h1').first().innerText(),/Карточка 1/);
 await page.reload({waitUntil:'load'});
 await enterTopic(page,1);await page.locator('.modes .mode').nth(1).click();
 assert.match(await page.locator('h1').first().innerText(),/Карточка 1/);
 await page.locator('button.back').click();await leaveToHome(page);
 for(let i=0;i<6;i++){
  await enterTopic(page,i);
  const total=cardTotals[i],practices=practiceTotals[i],id=topicIds[i];
  await page.locator('.modes .mode').nth(1).click();
  let state=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),'vinovatt:learn:v2:'+id);
  const start=state.index;
  assert.equal(state.order.length,total);
  assert.equal(new Set(state.order).size,total,'Карточки не уникальны');
  assert.equal(Object.values(state.directions).filter(Boolean).length,i===1?6:6,'Баланс первого занятия');
  const initialOrder=[...state.order],initialDirections={...state.directions};
  for(let n=start;n<total;n++){
   const raw=await page.locator('section.panel h2').innerText();
   assert(raw&&!seenLearn.has(id+':'+raw),'Карточка показана повторно: '+id);
   seenLearn.add(id+':'+raw);
   assert.match(await page.locator('h1').first().innerText(),new RegExp('Карточка '+(n+1)+' из '+total));
   await page.getByRole('button',{name:'Показать ответ'}).click();
   assert.equal(await page.locator('.answer-details').count(),1);
   assert(await page.locator('.answer-details').getByText('Источник:',{exact:false}).count()>=1);
   await page.getByRole('button',{name:'Следующая карточка',exact:false}).click();
   if(n===Math.floor(total/2)){
    await page.reload({waitUntil:'load'});await enterTopic(page,i);
    await page.locator('.modes .mode').nth(1).click();
    const persisted=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),'vinovatt:learn:v2:'+id);
    assert.deepEqual(persisted.order,initialOrder,'Порядок сброшен при перезагрузке');
    assert.deepEqual(persisted.directions,initialDirections,'Направления сброшены при перезагрузке');
    assert.equal(persisted.index,n+1,'Индекс прогресса потерян');
   }
  }
  assert.match(await page.locator('h1').first().innerText(),/Все карточки пройдены/);
  assert.equal(await page.evaluate(key=>localStorage.getItem(key),'vinovatt:learn:v2:'+id),null,'Завершённый прогресс должен очищаться');
  learned+=total;
  // Повтор создаёт новую полноценную последовательность с индексом 0.
  await page.getByRole('button',{name:'Повторить с новым порядком'}).click();
  assert.match(await page.locator('h1').first().innerText(),new RegExp('Карточка 1 из '+total));
  const repeat=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),'vinovatt:learn:v2:'+id);
  assert.equal(repeat.index,0);
  assert.equal(Object.values(repeat.directions).filter(Boolean).length,i===1?7:6,'Повтор 13 карточек меняет распределение 6/7');
  await page.locator('button.back').click();
  await page.locator('.modes .mode').nth(2).click();
  const first=await completeQuiz(page,total);
  quizzed+=total;
  assert.equal(first.backwards,6,'Начальное распределение контрольных вопросов');
  await page.getByRole('button',{name:'Попробовать ещё раз'}).click();
  const second=await completeQuiz(page,total);
  assert.equal(second.backwards,i===1?7:6,'Повтор 13 вопросов должен чередовать число обратных');
  quizzed+=total;
  await page.getByRole('button',{name:'К режимам'}).click();
  await page.locator('.modes .mode').nth(3).click();
  await completePractice(page,practices);
  practiced+=practices;
  await page.getByRole('button',{name:'Попробовать ещё раз'}).click();
  await completePractice(page,practices);
  practiced+=practices;
  await page.getByRole('button',{name:'К режимам'}).click();
  await leaveToHome(page);
 }
 assert.equal(learned,73);assert.equal(quizzed,146);assert.equal(practiced,38);
 assert.equal(errors.length,0,'JS ошибки: '+errors.join(' | '));
 console.log('PASS full journey '+width+'px: '+learned+' cards, '+quizzed+' quiz responses, '+practiced+' practices, resume and restarts');
 await context.close();
}
(async()=>{
 const b=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{for(const width of sizes)await trial(b,width);}
 finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
