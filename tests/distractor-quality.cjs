'use strict';
// Проверка целостности вопросников после редакторской доработки дистракторов.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
for(let i=1;i<=6;i++)vm.runInNewContext(fs.readFileSync(path.join(root,'data',`lesson${String(i).padStart(2,'0')}-content.js`),'utf8'),ctx);
vm.runInNewContext(fs.readFileSync(path.join(root,'data/reverse-questions.js'),'utf8'),ctx);
const d=ctx.window.VinoVattData,r=ctx.window.WinoWattReverse;
const q=d.questions,c=d.cards;
assert.equal(q.length,73);assert.equal(c.length,73);
const trivial=/^(?:цвет|форма) (?:этикетки|бутылки)$|^только цвет этикетки$|^только форма бутылки$/i;
for(const item of q){
 assert.equal(item.options.length,3,item.id+' has malformed options');
 assert.equal(new Set(item.options).size,3,item.id+' contains duplicate answers');
 assert(item.options.every(x=>typeof x==='string'&&x.trim().length>5),item.id+' too short or empty');
 assert(!item.options.some(x=>trivial.test(x.trim())),item.id+' has an obviously irrelevant distractor');
 const reverse=r.question(item.id);
 assert(reverse&&reverse.options.length===3,item.id+' has no reverse');
 assert.equal(reverse.options[0],reverse.answer,item.id+' reverse correct answer is not first in data');
 assert.equal(new Set(reverse.options).size,3,item.id+' has duplicate reverse options');
 assert(!reverse.options.some(x=>trivial.test(x.trim())),item.id+' has trivial reverse option');
 assert(reverse.options.every(x=>typeof x==='string'&&x.trim().length>3));
}
for(const card of c){
 const x=r.card(card.id);assert(x&&x.options?.length===3);
 assert.equal(x.options[0],x.answer);
 assert.equal(new Set(x.options).size,3);
}
console.log('PASS: 73 direct, 73 reverse control and 73 reverse learning entries; three distinct alternatives');
