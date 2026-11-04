'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
for(const n of ['lesson01','lesson02','lesson03','lesson04','lesson05','lesson06'])vm.runInNewContext(fs.readFileSync(path.join(root,'data',n+'-content.js'),'utf8'),ctx);
const d=ctx.window.VinoVattData,l=d.lessons.caviste;
assert.equal(d.topics.filter(x=>x.status==='lesson').length,6);
assert(l&&l.guestStory.length>=5&&l.professional.length===7&&l.threeSteps.length>=4);
const cards=d.cards.filter(x=>x.topic==='caviste'),questions=d.questions.filter(x=>x.topic==='caviste'),cases=d.practices.filter(x=>x.topic==='caviste');
assert.equal(cards.length,12);assert.equal(questions.length,12);assert.equal(cases.length,3);
assert.equal(d.cards.length,73);assert.equal(d.questions.length,73);assert.equal(d.practices.length,19);
const all=[...d.cards,...d.questions,...d.practices];assert.equal(new Set(all.map(x=>x.id)).size,all.length);
for(const x of cards)for(const key of ['front','back','why','story','source'])assert(typeof x[key]==='string'&&x[key].length>12);
for(const q of questions){assert(q.options.length>=3&&new Set(q.options).size===q.options.length&&q.answer>=0&&q.answer<q.options.length&&q.why.length>15);}
for(const p of cases){assert.equal(p.options.filter(o=>o.ok).length,1);assert(p.conclusion.length>20);}
assert(cases.some(x=>x.scenario.includes('Пино Нуар')));
assert(fs.readFileSync(path.join(root,'index.html'),'utf8').includes('lesson06-content.js'));
console.log('PASS: 6 lessons, 73 cards, 73 questions, 19 practical cases');
