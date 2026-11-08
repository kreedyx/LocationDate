// Run with `node verify.mjs`. Uses only Node's standard library.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const context=vm.createContext({console});
for(const file of ['data.js','i18n.js','station-notes.js','tour-data.js'])vm.runInContext(fs.readFileSync(new URL(file,import.meta.url),'utf8'),context);
const result=vm.runInContext(`(()=>{
 let cases=0;
 for(const people of [null,1,2,3])for(const accessible of [false,true])for(const budget of [30,60,90,120,null])for(const interests of [[],['games'],['digital'],['creative'],['reading'],['everything']]){
  const p={people,accessible,budget,interests,interest:'',duration:'',style:'mix',visit:people===3?'family':null};
  const ids=recommendTour(p);const stops=ids.map(id=>activities.find(a=>a.id===id));
  if(stops.some(a=>a.container))throw Error('Zone container must not duplicate its games in recommendations');
  if(new Set(ids).size!==ids.length)throw Error('Duplicate activity');
  if(stops.some(a=>people&&!a.people.includes(people)))throw Error('Incompatible group');
  if(accessible&&stops.some(a=>a.floor!=='eg'))throw Error('Wrong floor');
  if(budget&&tourMinutes(ids)>budget)throw Error('Budget exceeded');
  if(people===1&&stops.some(a=>!['vr','computer','drawing'].includes(a.id)))throw Error('Unexpected solo activity');
  const possible=activities.some(a=>(!people||a.people.includes(people))&&(!accessible||a.floor==='eg')&&(!interests.length||interests.includes('everything')||interests.some(k=>a.preferenceTags.includes(k))));
  if(possible&&!ids.length)throw Error('Expected a recommendation');
  if(interests.length&&!interests.includes('everything')&&stops.some(a=>!interests.some(k=>a.preferenceTags.includes(k))))throw Error('Interest mismatch');
  cases++;
 }
 const solo=recommendTour({people:1,accessible:true,budget:30,interests:['digital'],interest:'',duration:'',style:'active'});
 const mixed=recommendTour({people:2,accessible:false,budget:60,interests:['everything'],interest:'',duration:'',style:'mix'});
 return {count:activities.filter(a=>!a.container).length,missing:activities.filter(a=>!a.familiarity||!a.source).length,children:activities.filter(a=>a.parentZone).length,cases,solo,mixed,soloMinutes:tourMinutes(solo),allUnknown:activities.every(a=>a.duration===null),translations:activities.every(a=>a.nameEN&&a.descriptionEN),tags:new Set(mixed.flatMap(id=>activities.find(a=>a.id===id).preferenceTags)).size};
})()`,context);
assert.equal(result.missing,0);
assert.equal(result.children,16);
assert.equal(result.allUnknown,true);
assert.equal(result.translations,true);
assert.equal(result.solo.length,2);
assert.equal(result.soloMinutes,20);
assert.ok(result.tags>=3,'Mixed experience should include varied categories');
console.log(`Passed ${result.cases} recommendation scenarios; solo, diversity, duration and translation checks passed.`);
