'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const fileList=['index.html','css/style.css','data/lesson01-content.js','data/lesson02-content.js','data/lesson03-content.js','data/lesson04-content.js','data/lesson05-content.js','data/lesson06-content.js','data/reverse-questions.js','js/app.js','README.md','SOURCES.md','PROJECT_CANON.md','LESSON_01.md','LESSON_02.md','LESSON_03.md','LESSON_04.md','LESSON_05.md','LESSON_06.md'];
fileList.forEach(f=>assert(fs.existsSync(path.join(root,f)),`Не найден ${f}`));
for(const file of fileList.filter(f=>f.endsWith('.js')))execFileSync(process.execPath,['--check',path.join(root,file)]);
const context={window:{}};
for(const file of ['data/lesson01-content.js','data/lesson02-content.js','data/lesson03-content.js','data/lesson04-content.js','data/lesson05-content.js','data/lesson06-content.js']) vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const d=context.window.VinoVattData;
assert.equal(d.sections.length,8,'Восемь основных разделов');
assert.equal(d.topics.length,6,'Шесть тем введения');
assert.equal(d.sections.find(x=>x.id==='china').status,'placeholder','Китай — заглушка');
assert.deepEqual([...d.sections.map(x=>x.id)],['basics','old-world','new-world','russia','china','sparkling','spirits','coffeeum']);
assert.equal(d.plannedCourses.sparkling.topics.length,7);
assert.equal(d.plannedCourses.spirits.topics.length,6);
assert(d.plannedCourses.spirits.description.includes('Креплёные вина'));
assert(d.sections.slice(-3,-1).every(x=>x.status==='plan'));
assert.equal(d.sections.at(-1).status,'guide','КофеУм — готовый справочник');

assert.deepEqual([...d.topics.filter(t=>t.status==='lesson').map(x=>x.id)],['what-is-wine','wine-character','vine-to-bottle','terroir','grape-region','caviste']);
const ids=new Set();
for(const topic of d.topics.filter(x=>x.status==='lesson')){
 const id=topic.id;
 const l=d.lessons[id];
 assert(l && l.id===id && l.guestStory.length>=4 && l.professional.length===7 && l.threeSteps.length>=3,`Теория: ${id}`);
 const cards=d.cards.filter(c=>c.topic===id),qs=d.questions.filter(q=>q.topic===id),ps=d.practices.filter(p=>p.topic===id);
 assert.equal(cards.length,id==='wine-character'?13:12,`Число карточек: ${id}`);
 assert.equal(qs.length,id==='wine-character'?13:12,`Число вопросов: ${id}`);
 assert.equal(ps.length,id==='wine-character'?4:3,`Число практических кейсов: ${id}`);
 for(const thing of [...cards,...qs,...ps]){assert(!ids.has(thing.id),'Дублирование id '+thing.id);ids.add(thing.id);}
 for(const card of cards){for(const key of ['front','back','why','story','source'])assert(typeof card[key]==='string'&&card[key].length>(key==='source'?4:10),`${card.id}/${key}`)}
 for(const q of qs){assert(q.options.length>=3 && q.options.length<=5,`Опции ${q.id}`);assert.equal(q.options.length,new Set(q.options).size,`Повторы ${q.id}`);assert(Number.isInteger(q.answer) && q.answer>=0 && q.answer<q.options.length,`Верный вариант ${q.id}`);assert(q.source && q.why.length>15,`Нет источника/объяснения ${q.id}`)}
 for(const p of ps){assert(p.options.length>=3 && p.options.filter(o=>o.ok).length===1,`Неоднозначный кейс ${p.id}`);assert(p.options.every(x=>x.label&&x.why),`Нет объяснений ${p.id}`);assert(p.conclusion.length>15)}
 for(const section of l.professional){assert(section.title&&section.body&&section.source&&section.takeaway)}
}
const debate=d.practices.find(p=>p.id==='c-p004');
assert(debate && debate.topic==='wine-character' && debate.scenario.includes('знаток') && debate.conclusion.includes('танины'),'Кейс о Пино Нуаре и Неббиоло');
assert(!debate.scenario.includes('Парф') && !debate.conclusion.includes('Парф'),'Без реальных имён');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(html.includes('ВиноВатт!')&&html.includes('Мощность вина'),'Канон бренда в главном экране');
assert(html.includes('<span class="logo-letters">ВВт</span>'),'Русская монограмма в интерфейсе');
assert(!html.includes('class="logo-mark" aria-hidden="true">V<'),'Старый одиночный V заменён');
const canon=fs.readFileSync(path.join(root,'PROJECT_CANON.md'),'utf8');
assert(canon.includes('ВВт⚡') && canon.includes('WWt⚡'),'Кириллическая и запасная латинская монограммы зафиксированы');
assert(html.includes('data/reverse-questions.js'),'Обратные вопросы подключены');
assert(html.includes('data/beginner-path.js'),'Словарь новичка подключён');
assert(html.includes('data/coffeeum-guide.js'),'Кофейный справочник подключён');
assert(html.includes('lesson01-content.js')&&html.includes('lesson02-content.js')&&html.includes('lesson03-content.js')&&html.includes('lesson04-content.js')&&html.includes('lesson05-content.js')&&html.includes('lesson06-content.js'),'Шесть уроков подключены');
const app=fs.readFileSync(path.join(root,'js/app.js'),'utf8');
assert(app.includes("'vinovatt:learn:v2:' + currentTopic"),'Прогресс по темам');
assert(app.includes('aria-pressed')&&app.includes('aria-valuenow'),'Доступность');
console.log('PASS: ВиноВатт!/WinoWatt, 8 разделов, 6 тем, 6 уроков, 73 карточки, 73 вопроса, 19 кейсов, теория и изоляция прогресса');