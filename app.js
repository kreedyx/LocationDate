let state={floor:'eg',people:null,interest:'',interests:[],accessible:false,selected:null,tour:[],completed:[],preferences:{visit:null,count:null,style:null,accessibleAnswer:null}};
const $=s=>document.querySelector(s);
interests.forEach(text=>$('#interest').add(new Option(text,text)));
function matches(a) {
  if (a.container) return mapMembers(a).some(matches);
  return matchesPreferences(a, state);
}

function locationText(a) {
  if (!a.floor) return t('locationUnknown');
  return floorName(a.floor) + ' · ' + t(a.point?'locationApprox':'pointUnknown');
}

function participantText(a) {
  if (!a.people.length) return t('participantsUnknown');
  if (a.participationUnit) return t(a.participationUnit);
  const label = a.people.map(personText).join(' · ');
  return a.peopleStatus === 'provisional' ? label + ' · ' + t('provisionalCount') : label;
}

function catalogMetadata(a) {
  return [locationText(a), participantText(a), a.nameStatus !== 'research' ? t('nameCheck') : '']
    .filter(Boolean).join(' · ');
}

$('#catalog-toggle').addEventListener('click', event => {
  const button = event.currentTarget;
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!expanded));
  $('#catalog-panel').inert = expanded;
});

function renderCatalog() {
  const stations = activities.filter(a => !a.container && matches(a));
  const shared = stations.filter(a => a.possibleSharedZone);
  const card = a => `<article class="zone-game"><h3>${activityName(a)}</h3>
    <p>${catalogMetadata(a)}</p><p>${a.categories.map(categoryName).join(' / ')}</p>
    <div class="tour-tools"><button data-open-station="${a.id}">${t('detailsAction')}</button>
    <button data-toggle="${a.id}">${t(state.tour.includes(a.id)?'remove':'add')}</button></div></article>`;
  $('#catalog-label').textContent = t('catalog');
  $('#catalog-content').innerHTML = `<p role="status">${fitText(stations.length, activities.filter(a => !a.container).length)}</p>
    <p class="quiet-note">${t('catalogHint')}</p>
    ${shared.length ? `<h3>${t('sharedZoneTitle')}</h3><p>${t('sharedZoneNote')}</p><div class="catalog-grid">${shared.map(card).join('')}</div>` : ''}
    <div class="catalog-grid">${stations.filter(a => !a.possibleSharedZone).map(card).join('')}</div>
    ${stations.length ? '' : `<p>${t('noResults')}</p>`}`;
  $('#museum-info').innerHTML = `<h3>${t('museumInfoTitle')}</h3><p>${t('museumInfo')}</p><p>${t('museumThemes')}</p>`;
}
function icon(a){return a.people.includes(1)?'●':a.people.includes(3)?'♣':'Ⅱ';}
function mapMembers(a){return a.container?activities.filter(child=>child.parentZone===a.id):[a];}
function isMapSelected(a){return state.selected===a.id||mapMembers(a).some(child=>child.id===state.selected);}
function familiaritySymbol(a){return {new:'★',close:'♡',both:'★♡',open:''}[a.familiarity]||'';}
function familiarityText(a){return t({new:'familiarNew',close:'familiarClose',both:'familiarBoth',open:'familiarOpen'}[a.familiarity]||'familiarOpen');}
const mapLayers = {stations:true, stories:false, questions:false};
let mapZoom = 1;

function renderStationMarkers(stations, image) {
  return stations.filter(a => a.point && !a.container).map(a => `
    <g class="activity station-dot" data-id="${a.id}" role="button" tabindex="0"
      transform="translate(${(image ? floorImagePoints[a.sketchNumber] : a.point).join(' ')}) scale(${image ? 1.6 : 1})">
      <circle class="dot-hit" r="15"/>
      <circle class="dot-ring" r="8"/>
      <circle class="dot-center" r="2"/>
      <path class="dot-tick" d="M-3 0 l2 2 l4 -4"/>
    </g>`).join('');
}

function discoveryEntries() {
  const demoStories = (demoStoryPoints[state.floor] || []).map(([x, y], index) => ({
    id: `demo-story-${state.floor}-${index}`,
    layer: 'stories',
    demo: true,
    floor: state.floor,
    x, y,
  }));
  return [...mapDiscoveries.filter(item => item.layer === 'stories'), ...demoStories];
}

function renderDiscoveryMarkers() {
  const storyScale = floorGeometry[state.floor].image ? 1.55 : 1;
  const stars = discoveryEntries().filter(item => item.floor === state.floor &&
    Number.isFinite(item.x) && Number.isFinite(item.y)).map(item => `
    <g class="discovery-marker story-star" tabindex="0" role="button" data-discovery="${item.id}"
      aria-label="${item.demo ? t('demoStoryTitle') : language === 'de' ? item.title : item.titleEN}"
      transform="translate(${item.x} ${item.y}) scale(${storyScale})">
      <circle class="dot-hit" r="14"/>
      <text text-anchor="middle" y="6" aria-hidden="true">★</text>
    </g>`).join('');
  const walls = (demoQuestionWalls[state.floor] || []).map(segment =>
    `<path d="${segment}" vector-effect="non-scaling-stroke"/>`).join('');
  return `<g class="question-walls" aria-hidden="true">${walls}</g>
    <g class="story-markers">${stars}</g>`;
}

function renderMapTools() {
  const label = t('mapLayers');
  $('#visit-map-layers').innerHTML = `<fieldset class="map-layers"><legend>${label}</legend>
    ${Object.keys(mapLayers).map(key => `<label><input type="checkbox" data-map-layer="${key}" ${mapLayers[key]?'checked':''}> ${t('layer-'+key)}</label>`).join('')}
  </fieldset>`;
  $('#map-tools').innerHTML = `<div class="map-zoom" role="group" aria-label="Zoom">
    <button type="button" data-zoom="-1" aria-label="${t('zoomOut')}">−</button>
    <button type="button" data-zoom="1" aria-label="${t('zoomIn')}">+</button>
  </div>`;
}

function updateMapLayers() {
  $('#map .station-icons')?.toggleAttribute('hidden', !mapLayers.stations);
  $('#map .zones')?.toggleAttribute('hidden', !mapLayers.stations);
  $('#map .story-markers')?.toggleAttribute('hidden', !mapLayers.stories);
  $('#map .question-walls')?.toggleAttribute('hidden', !mapLayers.questions);
  $('#map-discoveries').innerHTML = mapDiscoveries.filter(item => !item.floor && item.layer === 'stories' && mapLayers.stories)
    .map(item => `<button class="discovery-link" type="button" data-discovery="${item.id}">
      ★ ${language === 'de' ? item.title : item.titleEN}
      <small>${t('locationUnknown')}</small></button>`).join('');
  const map = $('#map');
  map.classList.toggle('zoomed', mapZoom > 1);
  map.style.setProperty('--map-zoom', mapZoom);
  $('#map-tools [data-zoom="-1"]').disabled = mapZoom === 1;
  $('#map-tools [data-zoom="1"]').disabled = mapZoom === 3;
}

function openDiscovery(id, trigger) {
  const item = discoveryEntries().find(entry => entry.id === id);
  if (!item || !mapLayers[item.layer]) return;
  stopAudio();
  const dialog = $('#map-discovery-dialog');
  const title = item.demo ? t('demoStoryTitle') : language === 'de' ? item.title : item.titleEN;
  const object = language === 'de' ? item.object : item.objectEN;
  const story = language === 'de' ? item.story : item.storyEN;
  dialog.innerHTML = `<button class="text-button discovery-close" autofocus>${t('close')} ×</button>
    <h2 id="map-discovery-title">${title}</h2>
    ${object ? `<p><strong>${t('discoveryObject')}</strong> ${object}</p><p>${story || t('storyPending')}</p>` : ''}
    <p class="quiet-note">${t(item.demo?'demoStoryNote':item.floor?'locationApprox':'locationUnknown')}</p>`;
  dialog.querySelector('button').onclick = () => dialog.close();
  dialog.onclose = () => trigger.focus();
  dialog.showModal();
}

document.addEventListener('change', event => {
  const layer = event.target.dataset.mapLayer;
  if (!layer) return;
  mapLayers[layer] = event.target.checked;
  updateMapLayers();
});

document.addEventListener('click', event => {
  const control = event.target.closest('[data-zoom],[data-discovery]');
  if (!control) return;
  if (control.dataset.discovery) {
    openDiscovery(control.dataset.discovery, control);
    return;
  }
  mapZoom = Math.min(3, Math.max(1, mapZoom + Number(control.dataset.zoom) * .5));
  updateMapLayers();
});

document.addEventListener('keydown', event => {
  if (!event.target.matches('svg [data-discovery]') || !['Enter',' '].includes(event.key)) return;
  event.preventDefault();
  openDiscovery(event.target.dataset.discovery, event.target);
});

function color(a){return a.people.includes(1)?'blue':a.people.includes(3)?'orange':'pink';}
function renderSketchBackground(f, current) {
  const stair = f.stair;
  const steps = Array.from({length:9}, (_, index) =>
    `<path d="M${stair.x + index * stair.w / 9} ${stair.y} v${stair.h}"/>`
  ).join('');
  return `<defs><pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#672335" stroke-opacity=".045"/></pattern></defs><path d="${f.shell}" fill="#fffdf5" stroke="none"/><path d="${f.shell}" fill="url(#grid)"/><g class="zones">${current.filter(a=>a.kind==='zone').map(a=>`<g class="activity zone ${color(a)} ${matches(a)?'match':'dim'} ${state.selected===a.id?'selected':''}" data-id="${a.id}" role="button" tabindex="0" aria-label="${activityName(a)} · ${t(matches(a)?'fit':'notFit')}" aria-pressed="${state.selected===a.id}"><path d="${a.shape}"/></g>`).join('')}</g><g class="walls"><path d="${f.shell}"/>${f.walls.map(d=>`<path d="${d}"/>`).join('')}</g><g class="stair"><rect x="${stair.x}" y="${stair.y}" width="${stair.w}" height="${stair.h}"/>${steps}<rect class="stair-label" x="${stair.x+25}" y="${stair.y+18}" width="${stair.w-50}" height="26"/><text x="${stair.x+stair.w/2}" y="${stair.y+36}">▤ ${language==='de'?'TREPPE':'STAIRS'}</text></g>${f.labels.map(l=>`<text class="room-label" x="${l.x}" y="${l.y}">${language==='de'?l.text:({'Getränke':'Drinks','♧ Garderobe':'♧ Cloakroom','↑ EINGANG':'↑ ENTRANCE','Keine Aktivitäten':'No activities','dokumentiert':'documented'}[l.text]||l.text)}</text>`).join('')}`;
}

function renderMap(){const f=floorGeometry[state.floor];const current=activities.filter(a=>a.floor===state.floor);$('#floor-title').innerHTML=`${floorName(state.floor)} <small>/ ${f.number}</small>`;const shown = current.filter(a=>a.point);$('#count').textContent=fitText(shown.filter(matches).length,shown.length);$('#map-location-note').innerHTML=`${t('mapLocationNote')} <a href="#station-catalog">${t('stationCatalogLink')} ↘</a>`;
document.querySelectorAll('.floors [data-floor]').forEach(b=>{b.disabled=state.accessible&&b.dataset.floor!=='eg';b.classList.toggle('active',b.dataset.floor===state.floor);b.setAttribute('aria-pressed',b.dataset.floor===state.floor);});
if($('#map').dataset.floor===state.floor){document.querySelectorAll('#map [data-id]').forEach(el=>{const a=activities.find(a=>a.id===el.dataset.id);el.classList.toggle('match',matches(a));el.classList.toggle('dim',!matches(a));el.classList.toggle('selected',isMapSelected(a));el.setAttribute('aria-pressed',isMapSelected(a));el.setAttribute('aria-label',[activityName(a), a.container ? '' : participantText(a), a.categories.map(categoryName).join(' / '), t(matches(a)?'fit':'notFit')].filter(Boolean).join(' · '));el.classList.toggle('in-tour',mapMembers(a).some(child=>state.tour.includes(child.id)));el.classList.toggle('completed',mapMembers(a).some(child=>state.tour.includes(child.id))&&mapMembers(a).filter(child=>state.tour.includes(child.id)).every(child=>state.completed.includes(child.id)));});updateMapLayers();return;}
$('#map').dataset.floor=state.floor;
renderMapTools();
const image = f.image;
const viewBox = image ? `0 0 ${image.width} ${image.height}` : f.viewBox;
const background = image
  ? `<image href="${image.src}" width="${image.width}" height="${image.height}" aria-hidden="true"/>`
  : renderSketchBackground(f, current);
$('#map').innerHTML=`<svg viewBox="${viewBox}" role="group" aria-label="${floorName(state.floor)}, ${language==='de'?'interaktiver Konzeptgrundriss':'interactive concept floor plan'}">${background}
  ${renderDiscoveryMarkers()}
  <g class="station-icons">${renderStationMarkers(current, image)}</g></svg>`;
renderMap();
document.querySelectorAll('#map [data-id]').forEach(el=>{const select=()=>{if(typeof stopAudio==='function')stopAudio();state.selected=el.dataset.id;renderMap();renderDetails();if(matchMedia("(max-width:1100px)").matches)$("#details").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"instant":"smooth",block:"start"});};el.addEventListener('click',select);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}});});
document.querySelectorAll('.floors [data-floor]').forEach(b=>{b.disabled=state.accessible&&b.dataset.floor!=='eg';b.classList.toggle('active',b.dataset.floor===state.floor);b.setAttribute('aria-pressed',b.dataset.floor===state.floor);});}
function detailFloor(activity) {
  const labels = language === 'de' ? {eg:'EG', og:'1. OG'} : {eg:'GF', og:'1st floor'};
  return labels[activity.floor] || t('detailFloorUnknown');
}

function detailAccess(activity) {
  const labels = {eg:'detailAccessGround', og:'detailAccessStairs'};
  return t(labels[activity.floor] || 'detailAccessUnknown');
}

function renderDetails() {
  const activity = activities.find(item => item.id === state.selected);
  const details = $('#details');
  if (!activity) {
    details.innerHTML = `<span class="section-label">${t('detailLabel')}</span>
      <div class="empty-art">♡<span>↗</span></div><h2>${t('emptyTitle')}</h2><p>${t('emptyDetails')}</p>`;
    return;
  }

  const instructions = stationInstructions[activity.id];
  const description = activityDescription(activity);
  const tourAction = state.tour.includes(activity.id) ? 'remove' : 'add';
  details.innerHTML = `<article class="station-details">
    <div class="station-detail-heading">
      <h2>${activityName(activity)}</h2>
      <button id="close-detail" type="button" aria-label="${t('close')}">×</button>
    </div>
    <p class="station-floor">${detailFloor(activity)}</p>
    ${description ? `<p id="station-description">${description}</p>` : ''}
    <dl class="station-facts">
      <div><dt>${t('participants')}</dt><dd>${activity.container ? t('individualTimes') : participantText(activity)}</dd></div>
      <div><dt>${t('access')}</dt><dd>${detailAccess(activity)}</dd></div>
    </dl>
    ${activity.container ? renderZoneGames(activity) :
      `<button class="primary tour-toggle" data-toggle="${activity.id}">${t(tourAction)}</button>`}
    ${activity.parentZone ? `<button class="text-button" data-open-station="${activity.parentZone}">← ${t('backToZone')}</button>` : ''}
    <div id="audio-guide"></div>
    ${instructions ? `<section class="station-instructions" lang="de">${instructions}</section>` : ''}
  </article>`;
  $('#close-detail').onclick = () => {
    if (typeof stopAudio === 'function') stopAudio();
    state.selected = null;
    renderMap();
    renderDetails();
  };
  if (typeof renderAudio === 'function') renderAudio();
}
function renderZoneGames(zone){return `<div class="zone-games"><h3>${t('gamesInZone')}</h3>${activities.filter(a=>a.parentZone===zone.id).map(a=>`<article class="zone-game ${matches(a)?'':'not-matching'}"><button class="zone-game-name" data-open-station="${a.id}">${familiaritySymbol(a)} ${activityName(a)} ↗</button><p>${familiarityText(a)}</p>${matches(a)?'':`<p>${t('notFit')}</p>`}<button class="zone-add" data-toggle="${a.id}">${t(state.tour.includes(a.id)?'remove':'add')}</button></article>`).join('')}</div>`;}
function update(){renderMap();renderDetails();renderCatalog();if(typeof guideRender==='function')guideRender();}
function bindFilters(){
document.querySelectorAll('#people button').forEach(b=>b.onclick=()=>{state.people=state.people===+b.dataset.value?null:+b.dataset.value;state.preferences.count=state.people;state.preferences.visit=null;syncControls();update();persistIfSaved();});
$('#interest').onchange=e=>{state.interest=e.target.value;state.interests=[];update();persistIfSaved();};
$('#accessible').onchange=e=>{if(typeof stopAudio==='function')stopAudio();state.accessible=e.target.checked;state.preferences.accessibleAnswer=state.accessible?'yes':'no';if(state.accessible){state.floor='eg';state.selected=null;}update();persistIfSaved();};
document.querySelectorAll('.floors [data-floor]').forEach(b=>b.onclick=()=>{if(b.disabled)return;if(typeof stopAudio==='function')stopAudio();state.floor=b.dataset.floor;state.selected=null;update();});
$('#reset').onclick=()=>{togetherChoice=null;Object.assign(state,{floor:'eg',people:null,interest:'',interests:[],accessible:false,selected:null});state.preferences={visit:null,count:null,style:null,accessibleAnswer:null};syncControls();update();persistIfSaved();};}
function syncControls(){$('#interest').value=state.interest;$('#accessible').checked=state.accessible;document.querySelectorAll('#people button').forEach(b=>b.setAttribute('aria-pressed',state.people===+b.dataset.value));}
// Guide installs event handlers after the original map has mounted.
update();
