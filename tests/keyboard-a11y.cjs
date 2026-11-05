'use strict';
/* Проверка клавиатурной навигации и сохранения контекста после замены экранов. */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.WINOWATT_BASE_URL||'http://127.0.0.1:8765/';
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:844}});
   const page=await context.newPage();
   await page.goto(base,{waitUntil:'load'});
   await page.keyboard.press('Tab');
   assert.equal(await page.evaluate(()=>document.activeElement?.className),'skip-link','Первый Tab должен открыть ссылку перехода');
   assert(await page.locator('.skip-link').isVisible(),'Ссылка видима при фокусе');
   await page.keyboard.press('Enter');
   assert.equal(await page.evaluate(()=>document.activeElement?.id),'main','Переход к основному содержимому');
   const step=async(selector,expected)=>{
    await page.locator(selector).first().focus();
    await page.keyboard.press('Enter');
    await page.locator('#main h1').first().waitFor();
    assert.match(await page.locator('#main h1').first().innerText(),expected);
    await page.waitForFunction(()=>document.activeElement===document.querySelector('#main h1'));
   };
   await step('.tile.primary',/Введение|Основы винной культуры/i);
   await step('button.topic',/вино|вин|виноград/i);
   await step('.modes .mode',/вино|вин|виноград/i);
   assert.equal(await page.locator('.skip-link').count(),1);
   assert.equal(await page.locator('button:focus').count(),0,'Клавиатурный фокус не остался на удалённой кнопке');
   console.log('PASS: keyboard navigation and heading focus, '+width+'px');
   await context.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
