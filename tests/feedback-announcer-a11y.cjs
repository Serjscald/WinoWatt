'use strict';
/* Единственное live-объявление явного верного ответа для экранного диктора.
   Проверяется DOM и содержимое aria-live, а не поведение VoiceOver/TalkBack. */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.WINOWATT_BASE_URL||'http://127.0.0.1:8765/';
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(base,{waitUntil:'load'});
  const announcer=page.locator('#announcer');
  assert.equal(await announcer.getAttribute('role'),'status');
  assert.equal(await announcer.getAttribute('aria-live'),'polite');
  assert.equal(await announcer.getAttribute('aria-atomic'),'true');
  await page.locator('.tile.primary').click();
  await page.locator('button.topic').first().click();
  await page.locator('.modes .mode').nth(2).click();
  await page.locator('button.choice').first().click();
  const correctQuiz=await page.locator('.result .correct-answer').innerText();
  const quizText=await announcer.innerText();
  assert(quizText.includes(correctQuiz),'Контроль: диктор не получает правильный ответ');
  assert(quizText.includes('Верно.')||quizText.includes('Неверно.'),'Контроль: отсутствует оценка');
  assert.equal(await page.locator('.result').getAttribute('role'),null,'Контроль: дублирующий live-region');
  await page.locator('button.back').click();
  await page.locator('.modes .mode').nth(3).click();
  await page.locator('button.choice').first().click();
  const correctPractice=await page.locator('.result .correct-answer').innerText();
  const practiceText=await announcer.innerText();
  assert(practiceText.includes(correctPractice),'Практика: диктор не получает лучший ответ');
  assert(practiceText.includes('Хорошее решение.')||practiceText.includes('Есть более подходящий вариант.'),'Практика: отсутствует оценка');
  assert.equal(await page.locator('.result').getAttribute('role'),null,'Практика: дублирующий live-region');
  console.log('PASS: explicit accessible feedback for Control and Practice');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
