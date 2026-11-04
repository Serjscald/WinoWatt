'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
for(let n=1;n<=6;n++)vm.runInNewContext(fs.readFileSync(path.join(root,'data','lesson'+String(n).padStart(2,'0')+'-content.js'),'utf8'),ctx);
const cases=ctx.window.VinoVattData.practices;
assert.equal(cases.length,19);
const ids=new Set();
for(const p of cases){
 assert(!ids.has(p.id),'Duplicate case '+p.id);ids.add(p.id);
 assert(typeof p.scenario==='string'&&p.scenario.length>35,'Scenario too short '+p.id);
 assert.equal(p.options.length,3);
 assert.equal(p.options.filter(x=>x.ok).length,1,'Only one best choice '+p.id);
 for(const o of p.options){assert(o.label.length>30,'Strategy too short '+p.id);assert(o.why.length>30,'Reasoning too short '+p.id);}
 const wrong=p.options.filter(x=>!x.ok);
 assert.equal(new Set(wrong.map(x=>x.label)).size,2,'Repeated alternatives '+p.id);
 assert(wrong.every(x=>!/(?:вы не поймёте|вам знать не нужно|отмахнуться|посоветовать наугад)/i.test(x.label)),'Trivial alternative '+p.id);
}
assert(cases.some(x=>x.scenario.includes('Неббиоло')));
console.log('PASS: all 19 practice cases, 38 distinct plausible alternatives and explanations');
