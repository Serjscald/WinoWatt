'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
for(const f of ['data/lesson01-content.js','data/lesson02-content.js','data/lesson03-content.js','data/lesson04-content.js','data/lesson05-content.js','data/lesson06-content.js','js/app.js']){
 execFileSync(process.execPath,['--check',path.join(root,f)]);
}
const context={window:{}};
for(const f of ['data/lesson01-content.js','data/lesson02-content.js','data/lesson03-content.js','data/lesson04-content.js','data/lesson05-content.js','data/lesson06-content.js']) vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),context);
const d=context.window.VinoVattData;
assert.equal(d.sections.length,8);
assert.equal(d.topics.length,6);
assert.equal(d.sections.find(x=>x.id==='china').status,'placeholder');
assert.deepEqual([...d.topics.filter(t=>t.status==='lesson').map(x=>x.id)],['what-is-wine','wine-character','vine-to-bottle','terroir','grape-region','caviste']);
const l=d.lessons['vine-to-bottle'];
assert.equal(l.professional.length,7);assert.equal(l.threeSteps.length,4);
assert(l.guestStory.length>=5 && l.storyTitle && l.processTitle);
const cards=d.cards.filter(x=>x.topic==='vine-to-bottle'),qs=d.questions.filter(x=>x.topic==='vine-to-bottle'),ps=d.practices.filter(x=>x.topic==='vine-to-bottle');
assert.equal(cards.length,12);assert.equal(qs.length,12);assert.equal(ps.length,3);
const ids=new Set();for(const x of [...d.cards,...d.questions,...d.practices]){assert(!ids.has(x.id),`duplicate ${x.id}`);ids.add(x.id)}
for(const c of cards){for(const k of ['front','back','why','story','source'])assert(c[k]&&c[k].length>(k==='source'?4:10))}
for(const q of qs){assert(q.options.length>=3);assert(new Set(q.options).size===q.options.length);assert(q.answer>=0 && q.answer<q.options.length);assert(q.why&&q.source)}
for(const p of ps){assert.equal(p.options.filter(x=>x.ok).length,1);assert(p.conclusion.length>30)}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert(html.includes('lesson03-content.js'));
const app=fs.readFileSync(path.join(root,'js/app.js'),'utf8');assert(app.includes('activeLesson().storyTitle')&&app.includes('activeLesson().processTitle'));
console.log('PASS: третий урок — 7 профессиональных блоков, 12 карточек, 12 вопросов, 3 кейса; подключён к интерфейсу');