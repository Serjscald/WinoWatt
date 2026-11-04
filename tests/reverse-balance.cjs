'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
for(let n=1;n<=6;n++)vm.runInNewContext(fs.readFileSync(path.join(root,'data','lesson'+String(n).padStart(2,'0')+'-content.js'),'utf8'),ctx);
vm.runInNewContext(fs.readFileSync(path.join(root,'data/reverse-questions.js'),'utf8'),ctx);
const d=ctx.window.VinoVattData,r=ctx.window.WinoWattReverse;let totalCards=0,totalQuestions=0;
for(const topic of d.topics){
 const cards=d.cards.filter(x=>x.topic===topic.id),qs=d.questions.filter(x=>x.topic===topic.id);
 for(const c of cards){const spec=r.card(c.id);assert(spec&&spec.prompt&&spec.answer&&spec.options.length===3,'Нет обратной карточки '+c.id);assert.equal(spec.options[0],spec.answer);assert.equal(new Set(spec.options).size,3);assert(spec.prompt.length>35);assert(!spec.prompt.includes(spec.answer),'Подсказка прямо содержит ответ: '+c.id);totalCards++;}
 for(const q of qs){const spec=r.question(q.id);assert(spec&&spec.prompt&&spec.answer&&spec.options.length===3,'Нет обратного вопроса '+q.id);assert.equal(spec.options[0],spec.answer);assert.equal(new Set(spec.options).size,3);assert(spec.prompt.length>35);assert(!spec.prompt.includes(spec.answer),'Подсказка прямо содержит ответ: '+q.id);totalQuestions++;}
 for(const count of [Math.floor(cards.length/2),Math.ceil(cards.length/2)]){
  const ds=r.makeDirections(cards,count);assert.equal(Object.values(ds).filter(Boolean).length,count);
  const dq=r.makeDirections(qs,count);assert.equal(Object.values(dq).filter(Boolean).length,count);
 }
}
assert.equal(totalCards,73);assert.equal(totalQuestions,73);
const app=fs.readFileSync(path.join(root,'js/app.js'),'utf8');
assert(app.includes('learningDirections(v.order)')&&app.includes('nextReverseCount(')&&app.includes('reversed?spec.prompt')&&app.includes('reversed?rev.prompt'),'Не подключено управление направлениями');
console.log('PASS: 73 обратные карточки и 73 вопроса; баланс 50/50, нечётные темы 6/7; возобновление обучения');
