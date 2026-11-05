'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
for(const name of ['lesson01','lesson02','lesson03','lesson04','lesson05','lesson06'])vm.runInNewContext(fs.readFileSync(path.join(root,'data',name+'-content.js'),'utf8'),ctx);
const d=ctx.window.VinoVattData,l=d.lessons['grape-region'];
assert(l && l.guestStory.length>=5 && l.professional.length===7 && l.threeSteps.length===5);
const cards=d.cards.filter(x=>x.topic==='grape-region'),questions=d.questions.filter(x=>x.topic==='grape-region'),cases=d.practices.filter(x=>x.topic==='grape-region');
assert.equal(cards.length,12);assert.equal(questions.length,12);assert.equal(cases.length,3);
assert.equal(d.topics.find(x=>x.id==='grape-region').status,'lesson');
const labelTheory=l.professional.find(x=>x.title.includes('Reserva'))?.body||'';
for(const token of ['Rioja','36 месяцев','12','Grand Cru','Шампани','Бургундии'])assert(labelTheory.includes(token),'Региональный пример: '+token);
const reserva=d.questions.find(q=>q.id==='e-q007');assert(reserva&&reserva.options[reserva.answer].includes('Проверять'),'Reserva: сохранён правильный ответ');
const all=[...d.cards,...d.questions,...d.practices];assert.equal(new Set(all.map(x=>x.id)).size,all.length);
for(const q of questions){assert(q.options.length>=3&&new Set(q.options).size===q.options.length&&q.answer>=0&&q.answer<q.options.length&&q.why&&q.source);}
for(const p of cases){assert.equal(p.options.filter(o=>o.ok).length,1);assert(p.conclusion.length>50);}
for(const c of cards){for(const key of ['front','back','why','story','source'])assert(typeof c[key]==='string'&&c[key].length>12);}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert(html.includes('lesson05-content.js'));
console.log('PASS: lesson 05, 12 cards, 12 questions, 3 cases');
