'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const fileList=['index.html','css/style.css','data/lesson01-content.js','data/lesson02-content.js','js/app.js','README.md','SOURCES.md','PROJECT_CANON.md','LESSON_01.md','LESSON_02.md'];
fileList.forEach(f=>assert(fs.existsSync(path.join(root,f)),`Не найден ${f}`));
for(const file of fileList.filter(f=>f.endsWith('.js')))execFileSync(process.execPath,['--check',path.join(root,file)]);
const context={window:{}};
for(const file of ['data/lesson01-content.js','data/lesson02-content.js']) vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const d=context.window.VinoVattData;
assert.equal(d.sections.length,5,'Пять основных разделов');
assert.equal(d.topics.length,6,'Шесть тем введения');
assert.equal(d.sections.at(-1).status,'placeholder','Китай — заглушка');
assert.deepEqual([...d.topics.filter(t=>t.status==='lesson').map(x=>x.id)],['what-is-wine','wine-character']);
const ids=new Set();
for(const topic of d.topics.filter(x=>x.status==='lesson')){
 const id=topic.id;
 const l=d.lessons[id];
 assert(l && l.id===id && l.guestStory.length>=4 && l.professional.length===7 && l.threeSteps.length>=3,`Теория: ${id}`);
 const cards=d.cards.filter(c=>c.topic===id),qs=d.questions.filter(q=>q.topic===id),ps=d.practices.filter(p=>p.topic===id);
 assert.equal(cards.length,12,`12 карточек: ${id}`);
 assert.equal(qs.length,12,`12 вопросов: ${id}`);
 assert.equal(ps.length,3,`3 практических кейса: ${id}`);
 for(const thing of [...cards,...qs,...ps]){assert(!ids.has(thing.id),'Дублирование id '+thing.id);ids.add(thing.id);}
 for(const card of cards){for(const key of ['front','back','why','story','source'])assert(typeof card[key]==='string'&&card[key].length>(key==='source'?4:10),`${card.id}/${key}`)}
 for(const q of qs){assert(q.options.length>=3 && q.options.length<=5,`Опции ${q.id}`);assert.equal(q.options.length,new Set(q.options).size,`Повторы ${q.id}`);assert(Number.isInteger(q.answer) && q.answer>=0 && q.answer<q.options.length,`Верный вариант ${q.id}`);assert(q.source && q.why.length>15,`Нет источника/объяснения ${q.id}`)}
 for(const p of ps){assert(p.options.length>=3 && p.options.filter(o=>o.ok).length===1,`Неоднозначный кейс ${p.id}`);assert(p.options.every(x=>x.label&&x.why),`Нет объяснений ${p.id}`);assert(p.conclusion.length>15)}
 for(const section of l.professional){assert(section.title&&section.body&&section.source&&section.takeaway)}
}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(html.includes('ВиноВатт!')&&html.includes('Мощность вина'),'Канон бренда в главном экране');
assert(html.includes('lesson01-content.js')&&html.includes('lesson02-content.js'),'Оба урока подключены');
const app=fs.readFileSync(path.join(root,'js/app.js'),'utf8');
assert(app.includes("'vinovatt:learn:v2:' + currentTopic"),'Прогресс по темам');
assert(app.includes('aria-pressed')&&app.includes('aria-valuenow'),'Доступность');
console.log('PASS: ВиноВатт!/WinoWatt, 5 разделов, 6 тем, 2 урока, 24 карточки, 24 вопроса, 6 кейсов, теория и изоляция прогресса');