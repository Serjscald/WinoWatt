'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');const context={window:{}};
for(const p of ['data/lesson01-content.js','data/lesson02-content.js','data/lesson03-content.js','data/lesson04-content.js','data/lesson05-content.js','data/lesson06-content.js'])vm.runInNewContext(fs.readFileSync(path.join(root,p),'utf8'),context);
const d=context.window.VinoVattData,l=d.lessons.terroir;
assert(l&&l.professional.length===7&&l.guestStory.length>=5&&l.threeSteps.length===4);
const cards=d.cards.filter(x=>x.topic==='terroir'),questions=d.questions.filter(x=>x.topic==='terroir'),cases=d.practices.filter(x=>x.topic==='terroir');
assert.equal(cards.length,12);assert.equal(questions.length,12);assert.equal(cases.length,3);
assert.equal(d.topics.find(x=>x.id==='terroir').status,'lesson');
for(const c of cards){for(const field of ['front','back','why','story','source'])assert(typeof c[field]==='string'&&c[field].length>10);}
for(const q of questions){assert(q.options.length>=3&&q.answer>=0&&q.answer<q.options.length&&q.why&&q.source);}
for(const c of cases){assert.equal(c.options.filter(x=>x.ok).length,1);assert(c.conclusion.length>35);}
const ids=[...d.cards,...d.questions,...d.practices].map(x=>x.id);assert.equal(new Set(ids).size,ids.length);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert(html.includes('lesson04-content.js'));
assert(!cards.some(x=>/вкус известняка обязательно|буквальный перенос вкуса/.test(x.back)));
console.log('PASS: 4 урока, 49 карточек, 49 вопросов, 13 кейсов, терруар');
