'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
for(let i=1;i<=6;i++)vm.runInNewContext(fs.readFileSync(path.join(root,'data','lesson'+String(i).padStart(2,'0')+'-content.js'),'utf8'),ctx);
vm.runInNewContext(fs.readFileSync(path.join(root,'data/beginner-path.js'),'utf8'),ctx);
const d=ctx.window.VinoVattData,g=ctx.window.WinoWattBeginner;
assert.deepEqual(Object.keys(g).length,6);
for(let i=0;i<6;i++){const unit=g[d.topics[i].id];assert(unit&&unit.number===i+1&&unit.total===6);assert(unit.bridge.length>90);assert.equal(unit.glossary.length,3);for(const word of unit.glossary){assert(word.term.length>=4&&word.simple.length>=65&&word.image.length>=15);}}
const app=fs.readFileSync(path.join(root,'js/app.js'),'utf8'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(html.includes('data/beginner-path.js'));assert(app.includes('function beginnerWords()'));assert(app.includes('main.append(mini)'));
console.log('PASS: 6 lesson bridges, 18 clear definitions, glossary integrated into theory');
