'use strict';
/* Проверка читабельности при расширенных текстовых интервалах и увеличении масштаба.
 * Chromium не заменяет реальные iOS/Safari, Android/Chrome и системную настройку шрифта.
 */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.WINOWATT_BASE_URL||'http://127.0.0.1:8765/';
const expandedText=`
  body,button,a{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}
  p{margin-bottom:2em!important}
`;
async function checkFit(page,label){
 const result=await page.evaluate(()=>{
  const vw=window.innerWidth,doc=document.documentElement;
  const offscreen=[...document.querySelectorAll('button')].filter(b=>{
   const s=getComputedStyle(b),r=b.getBoundingClientRect();
   return !b.disabled&&s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0&&(r.left<-2||r.right>vw+2);
  }).map(b=>(b.textContent||b.getAttribute('aria-label')||'').slice(0,70));
  return {width:vw,scroll:doc.scrollWidth,offscreen};
 });
 assert(result.scroll<=result.width+2,label+': горизонтальное переполнение '+JSON.stringify(result));
 assert.equal(result.offscreen.length,0,label+': кнопки выходят за экран: '+result.offscreen.join(', '));
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
  for(const variant of [
   {width:320,zoom:1,spacing:true},
   {width:390,zoom:1,spacing:true},
   {width:768,zoom:2,spacing:false},
   {width:1280,zoom:4,spacing:false}
  ]){
   const page=await browser.newPage({viewport:{width:variant.width,height:900}});
   await page.goto(base,{waitUntil:'load'});
   if(variant.zoom!==1)await page.evaluate(z=>{document.body.style.zoom=String(z)},variant.zoom);
   if(variant.spacing)await page.addStyleTag({content:expandedText});
   const key=variant.width+'px / '+variant.zoom+'x zoom'+(variant.spacing?' / text spacing':'');
   await checkFit(page,'Главная '+key);
   await page.locator('.tile.primary').click();
   await checkFit(page,'Темы '+key);
   await page.locator('button.topic').first().click();
   await checkFit(page,'Режимы '+key);
   await page.locator('.modes .mode').first().click();
   await checkFit(page,'Теория '+key);
   await page.getByRole('button',{name:'Знай как профессионал'}).click();
   await checkFit(page,'Профессиональная теория '+key);
   await page.locator('button.back').click();
   await page.locator('.modes .mode').nth(2).click();
   await checkFit(page,'Контроль '+key);
   await page.locator('button.choice').first().click();
   assert(await page.locator('.result .correct-answer').isVisible(),'Не виден правильный ответ');
   await checkFit(page,'Контроль после ответа '+key);
   await page.locator('button.back').click();
   await page.locator('.modes .mode').nth(3).click();
   await checkFit(page,'Практика '+key);
   await page.locator('button.choice').first().click();
   assert(await page.locator('.result .correct-answer').isVisible(),'Не видно лучшее решение');
   await checkFit(page,'Практика после ответа '+key);
   console.log('PASS: text reflow '+key);
   await page.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
