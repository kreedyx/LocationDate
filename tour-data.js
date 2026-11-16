const durationBounds = {
  under5: [0, 5],
  '5to10': [5, 10],
  '10to20': [10, 20],
  individual: null,
};

function activityTime(activity) {
  return t('duration-' + (activity.durationCategory || 'individual'));
}

function tourDurationLabel(ids) {
  if (!ids.length) return '';
  const bounds = ids.map(id => durationBounds[activities.find(a => a.id === id)?.durationCategory]);
  if (bounds.some(range => !range)) return t('unknownTotal');
  const minutes = bounds.reduce(([min, max], [low, high]) => [min + low, max + high], [0, 0]);
  return t('estimatedTotal') + ' ' + minutes.join('–') + ' ' + t('minutes');
}

function matchesPreferences(a, profile) {
  return (!profile.accessible || a.floor === 'eg')
    && (!profile.people || a.people.includes(profile.people))
    && (!profile.interest || a.categories.includes(profile.interest))
    && (!profile.interests?.length || profile.interests.some(key => a.preferenceTags.includes(key)));
}

function orderTour(ids) {
  return [...new Set(ids)].filter(id => activities.some(a => a.id === id));
}

function recommendTour(profile) {
  const candidates = activities.filter(a => !a.container && matchesPreferences(a, profile));
  const score = a => (a.peopleStatus === 'research' ? 4 : 0)
    + (a.experienceStyles.includes(profile.style) ? 2 : 0)
    + (profile.interests || []).filter(key => a.preferenceTags.includes(key)).length;

  candidates.sort((a,b) => score(b) - score(a) || a.number - b.number);
  const stops = [];
  for (const activity of candidates) {
    if (activity.possibleSharedZone && stops.some(a => a.possibleSharedZone)) continue;
    stops.push(activity);
    if (stops.length === 3) break;
  }
  return stops.map(a => a.id);
}
