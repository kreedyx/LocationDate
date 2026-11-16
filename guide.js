// Shared tour state extends the existing map. No accounts, APIs or uploads.
const STORAGE_KEY='kisd-museum-tour-v1';
let savedEnabled=false, questionStep=0, draft=null, lastFocus=null, audioStatus='speechReady', speechUtterance=null;
let lastNotice='';
const interestKeys=Object.keys(categoryKeys);
function notice(key){lastNotice=key;$('#notice').textContent=t(key);}
function scrollToArea(id){document.getElementById(id).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});}
function currentPreferences(){return {...state.preferences,people:state.people,interest:state.interest,interests:[...state.interests],accessible:state.accessible};}
function serializeTour(){return {version:1,language,preferences:currentPreferences(),ids:state.tour,completed:state.completed};}
function persistIfSaved(){if(!savedEnabled)return;try{localStorage.setItem(STORAGE_KEY,JSON.stringify(serializeTour()));}catch{savedEnabled=false;notice('storageError');}}
function sanitizePreferences(p={}){return {visit:({solo:'solo',duo:'duo',partner:'duo',friend:'duo',family:'group',group:'group'})[p.visit]||null,count:Number.isInteger(p.count)&&p.count>=1&&p.count<=99?p.count:null,style:['active','quiet','talk','mix'].includes(p.style)?p.style:null,accessibleAnswer:['yes','no'].includes(p.accessibleAnswer)?p.accessibleAnswer:null,people:[1,2,3].includes(p.people)?p.people:null,interest:interests.includes(p.interest)?p.interest:'',interests:Array.isArray(p.interests)?p.interests.filter(x=>interestKeys.includes(x)):[],accessible:p.accessible===true};}
function applyPreferences(p){p=sanitizePreferences(p);state.preferences={visit:p.visit,count:p.count,style:p.style,accessibleAnswer:p.accessibleAnswer};state.people=p.people;state.interest=p.interest;state.interests=p.interests;state.accessible=p.accessible;if(state.accessible)state.floor='eg';}
function restore(){try{const raw=localStorage.getItem(STORAGE_KEY);if(raw){const data=JSON.parse(raw);if(data?.version===1&&Array.isArray(data.ids)){state.tour=orderTour(data.ids);state.completed=Array.isArray(data.completed)?data.completed.filter(id=>state.tour.includes(id)):[];applyPreferences(data.preferences);language=data.language==='en'?'en':'de';savedEnabled=true;notice(state.tour.length<data.ids.length?'restoredPartial':'restored');}}}catch{notice('storageError');}
try{const params=new URLSearchParams(location.hash.slice(1));if(params.has('tour')){const ids=params.get('tour').slice(0,2000).split(',');const imported=orderTour(ids);if(!savedEnabled||JSON.stringify(imported)!==JSON.stringify(state.tour)){state.tour=imported;state.completed=[];savedEnabled=false;notice('sharedLoaded');}}}catch{/* Invalid links leave local state intact. */}}
function guideRender(){renderEntry();renderTour();renderTogether();renderPreferenceChips();syncControls();}
function renderPreferenceChips(){let root=$('#preference-chips');if(!root){root=document.createElement('div');root.id='preference-chips';$('.filters').insertBefore(root,$('.filters label[for=interest]'));}root.innerHTML=state.interests.map(k=>`<button data-clear-interest="${k}" aria-label="${t('remove')}: ${t(k)}">${t(k)} ×</button>`).join('');}
function wayDoodle(type){return type==='guided'?`<svg viewBox="0 0 90 90" aria-hidden="true"><path d="M44 27C32 5 7 20 17 39c6 11 17 20 28 28 12-9 26-21 28-35 3-22-23-24-29-5Z"/><path d="m32 34-1 7m23-8-1 7m-17 11q9 8 17-2M32 60l-6 18-10 1m37-17 8 16 10-2M15 41 5 49m67-8 11 5"/></svg>`:`<svg viewBox="0 0 90 90" aria-hidden="true"><path d="M7 38c15-25 51-29 75 2-23 28-54 24-75-2Z"/><path d="M46 22c-19 1-23 34-3 35s27-32 3-35Z"/><path d="m42 32-1 12m-18 16-4 16-11 2m54-18 7 16 12-1M16 14l-5-7m33 5V3m27 14 7-7"/></svg>`;}
function renderEntry(){
$('#guide-nav').innerHTML=`<a href="#explorer">${t('manual')}</a><a href="#station-catalog">${t('stationCatalogLink')}</a><a href="#tour-overview">${t('tourNav')} (${state.tour.length})</a><div class="language-switch" role="group" aria-label="Deutsch / English"><button data-language="de" aria-pressed="${language==='de'}">DE</button><button data-language="en" aria-pressed="${language==='en'}">EN</button></div>`;
$('#choose-way').innerHTML=`<div class="section-label">${t('welcome')}</div><div class="way-options"><button class="way-card" data-action="questionnaire"><span class="way-icon">${wayDoodle('guided')}</span><span><strong>${t('guided')}</strong><small>${t('guidedHint')}</small></span><b>↗</b></button><button class="way-card manual-way" data-action="manual"><span class="way-icon">${wayDoodle('manual')}</span><span><strong>${t('manual')}</strong><small>${t('manualHint')}</small></span><b>↘</b></button></div><p class="quiet-note">${t('optional')}</p>`;
}
function renderTour(){const completed=state.tour.filter(id=>state.completed.includes(id)).length;const bad=state.tour.some(id=>{const a=activities.find(a=>a.id===id);return !matches(a)||(state.accessible&&a.floor!=='eg');});
$('#tour-overview').innerHTML=`<div class="tour-heading"><div><span class="section-label">04 / ${t('tourNav').toUpperCase()}</span><h2>${t('tour')}</h2></div><div class="tour-total"><strong>${state.tour.length}</strong> ${language==='de'?(state.tour.length===1?'Stopp':'Stopps'):(state.tour.length===1?'stop':'stops')}</div></div><div class="tour-tools"><button data-action="questionnaire">✳ ${t('questionnaire')}</button><button data-action="surprise">✦ ${t('surprise')}</button><button data-action="save">↓ ${t('save')}</button><button data-action="share" ${state.tour.length?'':'disabled'}>↗ ${t('share')}</button></div><div class="tour-progress"><span>${visitedText(completed,state.tour.length)}</span><progress value="${completed}" max="${state.tour.length||1}" aria-label="${visitedText(completed,state.tour.length)}"></progress><button data-action="reset-progress" ${completed?'':'disabled'}>${t('resetProgress')}</button></div><div class="preference-summary">${preferencesSummary()}</div>${bad?`<p class="mismatch">${t('restrictedTour')}</p>`:''}<ol class="tour-list">${state.tour.map((id,i)=>{const a=activities.find(a=>a.id===id),done=state.completed.includes(id);return `<li class="${done?'visited':''}"><span class="stop-number">${done?'✓':i+1}</span><div class="stop-info"><h3>${activityName(a)}</h3><p>${locationText(a)}</p><p>${participantText(a)}</p>${state.accessible&&a.floor!=='eg'?`<p>${t('hiddenFloor')}</p>`:''}</div><div class="stop-actions"><button data-show="${id}" ${state.accessible&&a.floor!=='eg'?'disabled':''}>${t(a.floor?'show':'detailsAction')}</button><button data-complete="${id}" aria-pressed="${done}">${t(done?'undoComplete':'complete')}</button><button data-toggle="${id}" aria-label="${t('remove')}: ${activityName(a)}">× <span>${t('remove')}</span></button></div></li>`;}).join('')}</ol>${!state.tour.length?`<p class="tour-empty">♡ ${t('emptyTour')}</p>`:''}<div class="tour-foot"><div><p>${t('shareNote')}</p>${savedEnabled?`<p class="saved-indicator">● ${t('saved')}</p>`:''}</div><div><button data-action="clear-tour" ${state.tour.length?'':'disabled'}>${t('clearTour')}</button><button data-action="delete-save">${t('deleteSaved')}</button></div></div><div id="share-output"></div>`;
}
function preferencesSummary(p=currentPreferences()){return `<span>${t('visit')}: <b>${p.people?personText(p.people):t('unspecified')}</b></span><span>${t('preferences')}: <b>${p.interests?.length?p.interests.map(t).join(', '):p.interest?categoryName(p.interest):t('unspecified')}</b></span><span>${t('style')}: <b>${p.style?t(p.style):t('unspecified')}</b></span><span>${t('access')}: <b>${p.accessible?t('yes'):p.accessibleAnswer==='no'?t('no'):t('unspecified')}</b></span>`;}
function toggleStation(id){if(!activities.some(a=>a.id===id))return;state.tour=state.tour.includes(id)?state.tour.filter(x=>x!==id):orderTour([...state.tour,id]);state.completed=state.completed.filter(x=>state.tour.includes(x));update();persistIfSaved();}
function showStation(id){const a=activities.find(a=>a.id===id);if(!a||state.accessible&&a.floor!=='eg')return;stopAudio();if(a.floor)state.floor=a.floor;state.selected=id;update();scrollToArea('details');}
function generateTour(){applyPreferences(draft);state.selected=null;
const ids=recommendTour(currentPreferences());
state.tour=ids;state.completed=state.completed.filter(id=>ids.includes(id));state.floor=ids.length?(activities.find(a=>a.id===ids[0]).floor||'eg'):'eg';$('#questionnaire-dialog').close();update();persistIfSaved();notice(ids.length?'generated':'noResults');scrollToArea('tour-overview');}
function surprise(){let pool=activities.filter(a=>!a.container&&matches(a)&&(!state.accessible||a.floor==='eg'));const unvisited=pool.filter(a=>!state.completed.includes(a.id));if(unvisited.length)pool=unvisited;if(!pool.length){notice('noResults');return;}const a=pool[Math.floor(Math.random()*pool.length)];showStation(a.id);}

let togetherChoice = null;

function togetherCard(people, source) {
  if (people !== 1) return '';
  const title = 'together-title-' + source;
  const age = 'together-age-' + source;
  const option = (choice, label, hint) => '<button type="button" class="together-option" data-action="together-'
    + choice + '" aria-pressed="' + (togetherChoice === choice) + '"><strong>' + t(label)
    + '</strong><small>' + t(hint) + '</small></button>';
  return '<section class="together together-inline" data-together-source="' + source + '" aria-labelledby="' + title + '">'
    + '<h3 id="' + title + '">' + t('togetherTitle') + '</h3>'
    + (togetherChoice === 'solo'
      ? '<p>' + t('togetherSolo') + '</p><button type="button" data-action="together-change">' + t('togetherChange') + '</button>'
      : '<p>' + t('togetherIntro') + '</p><div class="together-options">'
        + option('solo', 'togetherSolo', 'togetherSoloHint')
        + option('meet', 'togetherMeet', 'togetherMeetHint') + '</div>')
    + (togetherChoice === 'meet'
      ? '<div class="together-next"><h4>' + t('togetherWelcome') + '</h4><p>' + t('togetherWelcomeHint') + '</p>'
        + '<label for="' + age + '">' + t('togetherAge') + '</label><select id="' + age + '">'
        + '<option value="">' + t('togetherAgeNone') + '</option>'
        + ['under18', '18–24', '25–34', '35–49', '50+'].map(group =>
          '<option>' + (group === 'under18' ? t('togetherUnder18') : group) + '</option>').join('')
        + '</select><p class="quiet-note">' + t('togetherAgeNote') + '</p>'
        + '<button type="button" data-action="together-demo">' + t('togetherTry') + '</button></div>' : '')
    + '</section>';
}

function renderTogether() {
  $('#together').innerHTML = togetherCard(state.people, 'explore');
}

function chooseTogether(choice, source) {
  togetherChoice = choice;
  renderTogether();
  if (source === 'question') {
    if (choice === 'solo') {
      nextQuestion();
      return;
    }
    renderQuestion();
  }
  const card = $('[data-together-source="' + source + '"]');
  const target = choice === 'meet' ? 'select' : choice === 'solo' ? '[data-action="together-change"]' : '.together-option';
  card?.querySelector(target)?.focus();
}

function openTogetherDemo(button, source) {
  const dialog = $('#together-dialog');
  dialog.dataset.source = source;
  // The demo does not use or retain the optional age selection.
  button.closest('[data-together-source]').querySelector('select').value = '';
  dialog.innerHTML = '<h2 id="together-demo-title">' + t('togetherDemoTitle') + '</h2><p>'
    + t('togetherDemoBody') + '</p><div class="tour-tools">'
    + '<button type="button" data-action="together-return">' + t('togetherReturn') + '</button>'
    + '<button type="button" data-action="together-continue">' + t('togetherContinue') + '</button></div>';
  dialog.showModal();
}

function openQuestionnaire(){stopAudio();lastFocus=document.activeElement;draft=structuredClone(currentPreferences());questionStep=0;renderQuestion();$('#questionnaire-dialog').showModal();focusQuestion();}
function focusQuestion(){$('#question-title').focus();}
function optionCard(value,label,icon,selected,multiple=false){return `<button class="answer-card" data-answer="${value}" aria-pressed="${selected}" type="button"><span>${icon}</span><strong>${label}</strong><i>${selected?'✓':multiple?'+':'○'}</i></button>`;}
const questionCount = 4;
function renderQuestion(){const titles=['q1','q3','q4','q5','summary'];const summary=questionStep===questionCount;let cards='';
if(questionStep===0){cards=[1,2,3].map((size,i)=>optionCard(['solo','duo','group'][i],personText(size),['♙','♡','♧'][i],draft.people===size)).join('');}
if(questionStep===1)cards=interestKeys.map((k,i)=>optionCard(k,t(k),['♡','↔','✎','♣'][i],draft.interests.includes(k),true)).join('');
if(questionStep===2)cards=['active','quiet','talk','mix'].map((k,i)=>optionCard(k,t(k),['⚑','▤','☏','✳'][i],draft.style===k)).join('');
if(questionStep===3)cards=['yes','no'].map(k=>optionCard(k,t(k),k==='yes'?'↔':'○',draft.accessibleAnswer===k||(draft.accessibleAnswer===undefined&&draft.accessible&&k==='yes'))).join('');
$('#questionnaire').innerHTML=`<div class="question-top"><span class="section-label">${language==='de'?'EURE TOUR, EUER TEMPO':'YOUR TOUR, YOUR PACE'} · ${Math.min(questionStep+1,questionCount)} / ${questionCount}</span><div class="question-language"><button data-language="de" aria-pressed="${language==='de'}">DE</button><button data-language="en" aria-pressed="${language==='en'}">EN</button><button data-action="close-question" aria-label="${t('close')}">×</button></div></div><progress class="question-progress" value="${questionStep}" max="${questionCount}" aria-label="${t('questionnaire')}"></progress><h2 id="question-title" tabindex="-1">${t(titles[questionStep])}</h2><p class="quiet-note">${summary?t('results'):questionStep===1?t('multi'):t('optional')}</p>${summary?`<div class="question-summary">${preferencesSummary(draft)}</div><p>${t('replaceNote')}</p>`:`<div class="answer-grid">${cards}</div>${questionStep===0?togetherCard(draft.people,'question'):''}`}${questionStep===3?`<p class="access-explanation">${t('accessNote')}</p>`:''}<div class="question-actions"><button data-action="question-back" ${questionStep===0?'disabled':''}>${t('back')}</button>${!summary?`<button data-action="question-skip">${t('skip')}</button>`:''}<button class="primary" data-action="${summary?'generate':'question-next'}">${t(summary?'generate':'next')}</button></div><button class="text-button" data-action="skip-all">${t('skipAll')}</button>`;
}
function setAnswer(value){if(questionStep===0){draft.visit=value;draft.count=value==='solo'?1:value==='duo'?2:3;draft.people=Math.min(draft.count,3);}if(questionStep===1){draft.interest='';draft.interests=value==='everything'?(draft.interests.includes(value)?[]:[value]):draft.interests.includes(value)?draft.interests.filter(k=>k!==value):[...draft.interests.filter(k=>k!=='everything'),value];}if(questionStep===2)draft.style=value;if(questionStep===3){draft.accessible=value==='yes';draft.accessibleAnswer=value;}renderQuestion();const selected=$(`[data-answer="${value}"]`);selected?.focus();}
function nextQuestion(skip=false){if(skip){if(questionStep===0){draft.visit=null;draft.count=null;draft.people=null;}if(questionStep===1){draft.interests=[];draft.interest='';}if(questionStep===2)draft.style=null;if(questionStep===3){draft.accessible=false;draft.accessibleAnswer=null;}}questionStep=Math.min(questionStep+1,questionCount);renderQuestion();focusQuestion();}
function instructionSpeechParts() {
  const instructions = $('#details .station-instructions');
  if (!instructions || instructions.lang !== language) return [];
  return Array.from(instructions.querySelectorAll('p, li'))
    .filter(block => !block.closest('[data-no-speech]'))
    .map(block => {
      const copy = block.cloneNode(true);
      copy.querySelectorAll('[data-no-speech]').forEach(node => node.remove());
      const text = copy.textContent.trim().replace(/\s+/g, ' ');
      if (text && block.parentElement.tagName === 'OL') {
        const step = Array.from(block.parentElement.children).indexOf(block) + 1;
        return (language === 'de' ? 'Schritt ' : 'Step ') + step + '. ' + text;
      }
      return text;
    })
    .filter(Boolean);
}

function stopAudio() {
  speechUtterance = null;
  audioStatus = 'speechReady';
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

function renderAudio() {
  const root = $('#audio-guide');
  if (!root) return;
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    root.innerHTML = '<p class="quiet-note">' + t('speechUnavailable') + '</p>';
    return;
  }
  const available = instructionSpeechParts().length > 0;
  const active = Boolean(speechUtterance);
  root.innerHTML = '<div class="audio-controls">'
    + '<button data-action="audio-play"' + (available ? '' : ' disabled') + '>▷ ' + t('read') + '</button>'
    + '<button data-action="audio-pause"' + (active ? '' : ' disabled') + '>' + t(audioStatus === 'paused' ? 'resume' : 'pause') + '</button>'
    + '<button data-action="audio-stop"' + (active ? '' : ' disabled') + '>□ ' + t('stop') + '</button>'
    + '</div><p class="quiet-note" role="status">' + t(available ? audioStatus : 'speechNoInstructions') + '</p>';
}

function playAudio() {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return;
  const parts = instructionSpeechParts();
  if (!parts.length) return;
  stopAudio();
  const locale = language === 'de' ? 'de-DE' : 'en-GB';
  const voice = speechSynthesis.getVoices().find(item => item.lang.toLowerCase().startsWith(language));

  function speakPart(index) {
    const utterance = new SpeechSynthesisUtterance(parts[index]);
    utterance.lang = locale;
    if (voice) utterance.voice = voice;
    speechUtterance = utterance;
    utterance.onend = () => {
      if (speechUtterance !== utterance) return;
      if (index + 1 < parts.length) {
        speakPart(index + 1);
      } else {
        speechUtterance = null;
        audioStatus = 'finished';
        renderAudio();
      }
    };
    utterance.onerror = event => {
      if (speechUtterance !== utterance) return;
      speechUtterance = null;
      audioStatus = ['canceled', 'interrupted'].includes(event.error) ? 'speechReady' : 'speechError';
      renderAudio();
    };
    speechSynthesis.speak(utterance);
  }

  audioStatus = 'speaking';
  speakPart(0);
  renderAudio();
}
function changeLanguage(next){if(!['de','en'].includes(next)||language===next)return;stopAudio();language=next;translateStatic();if(lastNotice)notice(lastNotice);$('#map').dataset.floor='';bindFilters();update();if($('#questionnaire-dialog').open)renderQuestion();persistIfSaved();}
async function shareTour(){const url=new URL(location.href);url.hash=new URLSearchParams({tour:state.tour.join(',')}).toString();try{await navigator.clipboard.writeText(url.href);notice('shareCopied');}catch{$('#share-output').innerHTML=`<label for="tour-link">${t('copyManual')}</label><input id="tour-link" readonly>`;$('#tour-link').value=url.href;$('#tour-link').select();}}
document.addEventListener('click',event=>{const b=event.target.closest('button');if(!b||b.disabled)return;if(b.dataset.language){changeLanguage(b.dataset.language);return;}if(b.dataset.answer){setAnswer(b.dataset.answer);return;}if(b.dataset.clearInterest){state.interests=state.interests.filter(k=>k!==b.dataset.clearInterest);update();persistIfSaved();return;}if(b.dataset.toggle){const id=b.dataset.toggle;const inDetails=!!b.closest('#details');const inCatalog=b.closest('#station-catalog');toggleStation(id);document.querySelector(`${inDetails?'#details':inCatalog?'#station-catalog':'#tour-overview'} [data-toggle="${id}"]`)?.focus();return;}if(b.dataset.openStation){showStation(b.dataset.openStation);return;}if(b.dataset.show){showStation(b.dataset.show);return;}if(b.dataset.complete){const id=b.dataset.complete;state.completed=state.completed.includes(id)?state.completed.filter(x=>x!==id):[...state.completed,id];update();savedEnabled=true;persistIfSaved();renderTour();document.querySelector(`[data-complete="${id}"]`)?.focus();return;}
switch(b.dataset.action){case'questionnaire':openQuestionnaire();break;case'manual':scrollToArea('explorer');break;case'question-next':nextQuestion();break;case'question-skip':nextQuestion(true);break;case'question-back':questionStep=Math.max(0,questionStep-1);renderQuestion();focusQuestion();break;case'close-question':$('#questionnaire-dialog').close();break;case'skip-all':$('#questionnaire-dialog').close();scrollToArea('explorer');break;case'generate':generateTour();break;case'surprise':surprise();break;case'save':savedEnabled=true;persistIfSaved();if(savedEnabled)notice('saved');renderTour();break;case'delete-save':try{localStorage.removeItem(STORAGE_KEY);savedEnabled=false;notice('deleted');renderTour();}catch{notice('storageError');}break;case'clear-tour':state.tour=[];state.completed=[];update();persistIfSaved();break;case'reset-progress':state.completed=[];update();persistIfSaved();break;case'together-solo':case'together-meet':case'together-change':{
  const source=b.closest('[data-together-source]').dataset.togetherSource;
  chooseTogether({ 'together-solo':'solo', 'together-meet':'meet', 'together-change':null }[b.dataset.action],source);
  break;
}
case'together-demo':openTogetherDemo(b,b.closest('[data-together-source]').dataset.togetherSource);break;
case'together-return':$('#together-dialog').close();break;
case'together-continue':{
  const dialog=$('#together-dialog'),source=dialog.dataset.source;
  dialog.close();
  chooseTogether('solo',source);
  break;
}
case'audio-play':playAudio();break;case'audio-pause':if(audioStatus==='paused'){speechSynthesis.resume();audioStatus='speaking';}else{speechSynthesis.pause();audioStatus='paused';}renderAudio();break;case'audio-stop':stopAudio();renderAudio();break;case'share':shareTour();break;}
});
$('#questionnaire-dialog').addEventListener('close',()=>{lastFocus?.focus();});
window.addEventListener('pagehide',stopAudio);
restore();translateStatic();bindFilters();syncControls();$('#map').dataset.floor='';update();
