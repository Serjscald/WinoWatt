'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const ctx={window:{}};
for(let i=1;i<=6;i++){const file=path.join(root,'data','lesson'+String(i).padStart(2,'0')+'-content.js');vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});}
const d=ctx.window.VinoVattData;
assert.equal(d.topics.length,6,'Введение: ровно шесть тем');
assert.equal(d.topics.filter(x=>x.status==='lesson').length,6,'Шесть опубликованных тем');
const counts={cards:0,questions:0,practices:0},ids=new Set();
for(const topic of d.topics){
 const l=d.lessons[topic.id];assert(l,'Отсутствует урок '+topic.id);
 assert.equal(l.id,topic.id);assert(l.goal&&l.guestStory?.length>=4&&l.narrativeCaution&&l.professional?.length===7&&l.myths?.length>=3&&l.threeSteps?.length>=3,'Неполный урок '+topic.id);
 for(const block of l.professional){for(const key of ['title','body','takeaway','source'])assert(typeof block[key]==='string'&&block[key].length>9,'Пустой '+key+' в '+topic.id);}
 const cards=d.cards.filter(x=>x.topic===topic.id),questions=d.questions.filter(x=>x.topic===topic.id),cases=d.practices.filter(x=>x.topic===topic.id);
 assert.equal(cards.length,topic.id==='wine-character'?13:12,'Карточки '+topic.id);
 assert.equal(questions.length,topic.id==='wine-character'?13:12,'Вопросы '+topic.id);
 assert.equal(cases.length,topic.id==='wine-character'?4:3,'Практика '+topic.id);
 for(const card of cards){
  for(const k of ['front','back','why','story','source'])assert(typeof card[k]==='string'&&card[k].trim().length>=(k==='source'?5:10),'Незаполненное поле карточки '+card.id+'/'+k);
 }
 for(const q of questions){
  assert(typeof q.prompt==='string'&&q.prompt.trim().length>12,'Не заполнен вопрос '+q.id);
  assert(q.options.length>=3&&q.options.length<=5&&new Set(q.options).size===q.options.length,'Недопустимые ответы '+q.id);
  assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length,'Индекс ответа '+q.id);
  assert(typeof q.why==='string'&&q.why.length>15&&typeof q.source==='string'&&q.source.length>8,'Нет объяснения/источника '+q.id);
 }
 for(const p of cases){
  assert(p.title&&p.scenario&&p.skill&&p.conclusion&&p.options.length>=3,'Неполный кейс '+p.id);
  assert.equal(p.options.filter(o=>o.ok===true).length,1,'Неправильное число верных ответов '+p.id);
  assert(p.options.every(o=>typeof o.label==='string'&&o.label.length>8&&typeof o.why==='string'&&o.why.length>8),'Неполный выбор кейса '+p.id);
 }
 for(const x of [...cards,...questions,...cases]){assert(!ids.has(x.id),'Дублирование ID '+x.id);ids.add(x.id);}
 counts.cards+=cards.length;counts.questions+=questions.length;counts.practices+=cases.length;
}
assert.deepEqual(counts,{cards:73,questions:73,practices:19});
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(let i=1;i<=6;i++)assert(html.includes('data/lesson'+String(i).padStart(2,'0')+'-content.js'),'Не подключён урок '+i);
const balance=fs.readFileSync(path.join(root,'data/reverse-questions.js'),'utf8');
assert(balance.includes('WinoWattReverse'),'Подключены обратные задания');
const app=fs.readFileSync(path.join(root,'js/app.js'),'utf8');
for(const key of ['shuffle(topicCards().map(c=>c.id))','shuffle(topicQuestions())','shuffle(topicPractices())','shuffle(options.map','shuffle(p.options)'])assert(app.includes(key),'Нарушено перемешивание: '+key);
assert(app.includes('currentTopic')&&app.includes('progressKey')&&app.includes('aria-pressed')&&app.includes('aria-valuenow'),'Нарушена работа уроков или доступность');
console.log('PASS: audit all 6 lessons — 73 cards, 73 questions, 19 cases, unique IDs, complete sources, modes connected, shuffling present');
