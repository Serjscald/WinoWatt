'use strict';
/*
 * ВиноВатт! — проверка реального браузера на смартфонной ширине.
 * Запуск: npx playwright install chromium && node tests/browser-e2e.cjs
 * Сервер: python3 -m http.server 8765 --bind 127.0.0.1
 */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.WINOWATT_BASE_URL || 'http://127.0.0.1:8765/';
const widths=[320,375,390,768,1280];
async function launch(){
 return chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
}
async function checkFit(page,description){
 const d=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,ww:window.innerWidth}));
 assert(d.sw<=d.ww+2,description+' — горизонтальная прокрутка '+d.sw+' > '+d.ww);
}
async function checkTapTargets(page,description){
 const undersized=await page.locator('button').evaluateAll(buttons=>buttons.filter(b=>{
  const s=getComputedStyle(b),r=b.getBoundingClientRect();
  return !b.disabled&&s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0&&r.height<43.5;
 }).map(b=>({label:(b.innerText||b.getAttribute('aria-label')||'').slice(0,65),height:Math.round(b.getBoundingClientRect().height)})));
 assert.deepEqual(undersized,[],description+' — кнопки ниже 44 px');
}
async function openTopic(page,i){
 await page.locator('.tile.primary').click();
 await page.locator('button.topic').nth(i).click();
 await page.locator('.modes .mode').first().waitFor();
}
(async()=>{
 const browser=await launch();
 try{
  for(const width of widths){
   const context=await browser.newContext({viewport:{width,height:844},isMobile:width<769,hasTouch:width<769,deviceScaleFactor:1});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   await page.goto(base,{waitUntil:'load'});
   assert.match(await page.title(),/ВиноВатт/);
   assert.equal(await page.locator('.tile').count(),8);
   assert.deepEqual(await page.locator('.tile-symbol').allInnerTexts(),['🍇','🏰','🌎','🇷🇺','🇨🇳','🥂','🥃','☕'],'Пиктограммы восьми разделов');
   await page.locator('.tile.coffeeum').click();
   assert.equal(await page.locator('button.topic').count(),6,'КофеУм: шесть глав');
   await page.locator('button.topic').nth(1).click();
   assert(await page.getByText('18 г', {exact:false}).count()>=1,'Рожковая кофемашина: базовый рецепт');
   await checkFit(page,'КофеУм: рожковая машина / '+width);
   await page.locator('button.back').click();
   await page.locator('button.topic').nth(4).click();
   assert(await page.getByText('Флэт-уайт',{exact:false}).count()>=1,'Карта кофейных напитков');
   await checkFit(page,'КофеУм: напитки / '+width);
   await page.locator('button.back').click();
   await page.locator('button.back').click();
   for(const [name,count] of [['Игристые вина',7],['Крепкие напитки',6]]){
    await page.locator('.tile').filter({hasText:name}).click();
    assert.equal(await page.locator('button.topic').count(),count,'План раздела '+name);
    assert.equal(await page.locator('.modes').count(),0,'Пустой раздел не имитирует готовые уроки');
    await checkFit(page,name+' / '+width);
    await page.locator('button.topic').first().click();
    assert.match(await page.locator('h1').innerText(),/Рождение пузырька|Сырьё и производство/);
    assert.match(await page.locator('.pagehead .eyebrow').innerText(),/В ПОДГОТОВКЕ/);
    await page.locator('button.back').click();
    await page.locator('button.back').click();
   }
   await checkFit(page,'Главная '+width);
   if(width<=390)await checkTapTargets(page,'Главная / '+width);
   await page.locator('.tile.primary').click();
   assert.equal(await page.locator('button.topic').count(),6);
   await checkFit(page,'Список тем '+width);
   for(let i=0;i<6;i++){
    await page.locator('button.topic').nth(i).click();
    assert.equal(await page.locator('.modes .mode').count(),4,'Четыре режима на теме '+i);
    await checkFit(page,'Меню урока '+i+' / '+width);
    if(width<=390)await checkTapTargets(page,'Меню урока '+i+' / '+width);
    await page.locator('.modes .mode').first().click();
    assert(await page.locator('section.panel').count()>=1,'Теория: тема '+i);
    await checkFit(page,'Теория '+i+' / '+width);
    await page.getByRole('button',{name:'Знай как профессионал'}).click();
    assert(await page.getByText('Запомнить:',{exact:false}).count()>=1,'Профессиональный раздел '+i);
    await checkFit(page,'Профессиональный раздел '+i+' / '+width);
    await page.locator('button.back').click();
    await page.locator('.modes .mode').nth(1).click();
    assert(await page.getByRole('button',{name:'Показать ответ'}).isVisible());
    const directionBefore=await page.locator('section.panel .eyebrow').first().innerText();
    await page.getByRole('button',{name:'Показать ответ'}).click();
    assert(await page.locator('.answer-details').isVisible(),'Ответ не открылся');
    await page.getByRole('button',{name:'Следующая карточка',exact:false}).click();
    assert(await page.getByRole('button',{name:'Показать ответ'}).isVisible(),'Вторая карточка');
    const directionNext=await page.locator('section.panel .eyebrow').first().innerText();
    await page.reload({waitUntil:'load'});
    await openTopic(page,i);
    await page.locator('.modes .mode').nth(1).click();
    assert.match(await page.locator('h1').first().innerText(),/Карточка 2/,'Сохранение прогресса '+i);
    const directionRestored=await page.locator('section.panel .eyebrow').first().innerText();
    assert.equal(directionRestored,directionNext,'Направление не восстановлено: тема '+i);
    assert(['ПРЯМОЙ ВОПРОС','ОБРАТНЫЙ ВОПРОС'].includes(directionBefore),'Направление первой карточки');
    await checkFit(page,'Карточки '+i+' / '+width);
    await page.locator('button.back').click();
    await page.locator('.modes .mode').nth(2).click();
    const quizButtons=page.locator('button.choice');
    assert((await quizButtons.count())>=3);
    await quizButtons.first().click();
    assert(await page.locator('.result').isVisible(),'Результат ответа Контроля');
    assert(await page.locator('button.choice').first().isDisabled(),'Ответы блокируются после выбора');
    const quizFeedback=await page.locator('.result .correct-answer').innerText();
    const quizCorrect=await page.locator('button.choice.correct').innerText();
    assert.equal(quizFeedback,'Правильный ответ: '+quizCorrect,'Обратная связь Контроля совпадает с верной кнопкой');
    await page.getByRole('button',{name:'Следующий вопрос',exact:false}).click();
    await checkFit(page,'Контроль '+i+' / '+width);
    if(width<=390)await checkTapTargets(page,'Контроль '+i+' / '+width);
    await page.locator('button.back').click();
    await page.locator('.modes .mode').nth(3).click();
    assert((await page.locator('button.choice').count())>=3,'Практика доступна');
    await page.locator('button.choice').first().click();
    assert(await page.locator('.result').isVisible(),'Объяснение кейса');
    const practiceFeedback=await page.locator('.result .correct-answer').innerText();
    const practiceCorrect=await page.locator('button.choice.correct').innerText();
    assert.equal(practiceFeedback,'Лучшее решение: '+practiceCorrect,'Практика прямо называет верное решение');
    assert(await page.getByText('Почему этот подход работает:',{exact:false}).count()>=1,'Есть обоснование лучшего выбора');
    await checkFit(page,'Практика '+i+' / '+width);
    if(width<=390)await checkTapTargets(page,'Практика '+i+' / '+width);
    await page.locator('button.back').click();
    await page.locator('button.back').click();
   }
   const sound=page.locator('#sound-toggle');
   await sound.click();
   assert.equal(await sound.getAttribute('aria-pressed'),'false');
   await page.reload({waitUntil:'load'});
   assert.equal(await page.locator('#sound-toggle').getAttribute('aria-pressed'),'false','Звук не сохраняется');
   await page.locator('#sound-toggle').click();
   assert.equal(await page.locator('#sound-toggle').getAttribute('aria-pressed'),'true');
   assert.equal(errors.length,0,'JS errors: '+errors.join(' | '));
   console.log('PASS: browser width '+width+'px, 6 lessons, theory, learning resume, quiz, practice, sound, overflow');
   await context.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
