// Editable DEMONSTRATION metadata. These minutes and experience styles are NOT verified museum facts.
// Official activity.duration stays null. Replace demoMinutes with verified minutes when available.
const preferenceCategories={games:['Spiel & Spaß'],creative:['Kreativität'],reading:[],deep:['Vertrauen & Verbindung'],love:['Liebe & Beziehungen'],emotions:['Emotionen'],digital:['Digitale Erlebnisse']};
activities.forEach(a=>{
 a.demoMinutes=a.kind==='zone'?15:a.people.includes(1)?8:a.people.includes(3)?7:5;
 a.experienceStyles=a.categories.includes('Digitale Erlebnisse')||a.categories.includes('Spiel & Spaß')||a.categories.includes('Kreativität')?['active']:['quiet','talk'];
 a.preferenceTags=Object.keys(preferenceCategories).filter(k=>preferenceCategories[k].some(c=>a.categories.includes(c)));
 a.nameEN??=a.name;
 a.descriptionEN??=a.description;

});
function estimatedMinutes(a){return a.duration?.minutes??a.demoMinutes;}
function activityTime(a){return `${estimatedMinutes(a)} ${t('minutes')} · ${a.duration?.minutes?t('duration'):t('demo')}`;}
// Conceptual ordering around the existing circulation areas, not a navigable architectural route.
function routePosition(a){if(a.floor==='og')return 2000+(a.x<450?1000-a.y:a.y+1000);if(a.floor==='ug')return 4000+a.y;if(a.x>=320)return 1000-a.y;return 1000+a.y;}
function orderTour(ids){return [...new Set(ids)].filter(id=>activities.some(a=>a.id===id)).sort((x,y)=>routePosition(activities.find(a=>a.id===x))-routePosition(activities.find(a=>a.id===y)));}
function tourMinutes(ids){const stops=ids.map(id=>activities.find(a=>a.id===id)).filter(Boolean);return stops.reduce((sum,a,i)=>sum+estimatedMinutes(a)+2+(i&&a.floor!==stops[i-1].floor?3:0),0);}

function demoDurationCategory(a){const n=estimatedMinutes(a);return n<5?'short':n<=10?'medium':'long';}
function recommendTour(profile){
const candidates=activities.filter(a=>!a.container&&(!profile.people||a.people.includes(profile.people))&&(!profile.accessible||a.floor==='eg')&&(!profile.duration||demoDurationCategory(a)===profile.duration)&&(!profile.interest||a.categories.includes(profile.interest))&&(!profile.interests.length||profile.interests.includes('everything')||profile.interests.some(k=>a.preferenceTags.includes(k))));
const score=a=>{let n=0;for(const k of profile.interests){if(a.preferenceTags.includes(k))n+=5;}if(profile.interest&&a.categories.includes(profile.interest))n+=5;if(profile.style&&a.experienceStyles.includes(profile.style))n+=3;if(['family','group'].includes(profile.visit)&&a.people.includes(3))n+=1;return n;};
let remaining=[...candidates],ids=[];
const varied=!profile.interests.length||profile.interests.includes('everything')||profile.style==='mix';
while(remaining.length){const tags=new Set(ids.flatMap(id=>activities.find(a=>a.id===id).preferenceTags));remaining.sort((a,b)=>{const value=x=>score(x)+(varied?x.preferenceTags.filter(k=>!tags.has(k)).length*4:0);return value(b)-value(a)||routePosition(a)-routePosition(b);});const a=remaining.shift();const proposed=orderTour([...ids,a.id]);if(profile.budget&&tourMinutes(proposed)>profile.budget)continue;if(!profile.budget&&ids.length>=6)break;ids=proposed;}

return ids;
}
