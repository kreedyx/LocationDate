import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const context = vm.createContext({ assert });
for (const file of ['geometry.js', 'map-points.js', 'research-data.js', 'i18n.js', 'tour-data.js']) {
  vm.runInContext(fs.readFileSync(new URL(file, import.meta.url), 'utf8'), context);
}
vm.runInContext(`
  const stations = activities.filter(a => !a.container);
  assert.equal(stations.length, 57);
  assert.equal(new Set(activities.map(a => a.id)).size, activities.length);
  assert.equal(new Set(stations.map(a => a.name)).size, 57);
  assert.equal(interests.length, 4);
  assert.equal(stations.filter(a => a.floor === 'og' && a.point).length, 13);
  assert.equal(stations.filter(a => a.floor === 'eg' && a.point).length, 41);
  assert.equal(new Set(stations.filter(a => a.point).map(a => a.sketchNumber)).size, 54);
  for (const floor of ['eg', 'og']) {
    const {width, height} = floorGeometry[floor].image;
    const points = stations.filter(a => a.floor === floor && a.point)
      .map(a => floorImagePoints[a.sketchNumber]);
    for (const [index, [x, y]] of points.entries()) {
      assert.ok(x > 24 && x < width - 24 && y > 24 && y < height - 24);
      for (const [otherX, otherY] of points.slice(index + 1)) {
        assert.ok(Math.hypot(x - otherX, y - otherY) >= 48, 'Overlapping marker hit areas');
      }
    }
  }
  assert.equal(stations.find(a => a.id === 'battleships').floor, 'eg');
  assert.equal(stations.find(a => a.id === 'its-bananas').sketchNumber, 26);
  assert.equal(stations.find(a => a.name === 'Darts Bingo').sketchNumber, 15);
  assert.equal(stations.find(a => a.name === 'Frösch-Balance').sketchNumber, 23);
  assert.equal(stations.find(a => a.name === 'Schlimmer geht immer').sketchNumber, 24);
  assert.equal(stations.filter(a => a.possibleSharedZone).length, 2);
  assert.equal(stations.filter(a => a.maxPlayMinutes === 10).length, 1);
  assert.ok(stations.every(a => Object.hasOwn(durationBounds, a.durationCategory)));
  assert.ok(stations.every(a => a.categories.every(c => interests.includes(c))));
  for (const people of [1, 2, 3]) {
    for (const key of Object.keys(categoryKeys)) {
      for (const accessible of [false, true]) {
        const profile = {people, interests:[key], accessible};
        const expected = stations.filter(a => a.people.includes(people)
          && a.categories.includes(categoryKeys[key]) && (!accessible || a.floor === 'eg'));
        assert.equal(stations.filter(a => matchesPreferences(a, profile)).length, expected.length);
        const ids = recommendTour(profile);
        assert.equal(ids.length > 0, expected.length > 0);
        assert.ok(ids.length <= 3 && ids.every(id => expected.some(a => a.id === id)));
      }
    }
  }
  assert.equal(recommendTour({people:1, interests:['creative']})[0], 'research-2');
  assert.ok(matchesPreferences(stations[56], {people:2, interests:['love']}));
  assert.equal(activityTime(stations[39]), t('duration-individual'));
  assert.equal(tourDurationLabel([stations[39].id]), t('unknownTotal'));
  assert.deepEqual(recommendTour({budget:30, durationCategory:'individual'}), recommendTour({}));
  assert.deepEqual(recommendTour({people:2, interests:['love'], budget:30}), recommendTour({people:2, interests:['love']}));
  assert.equal(orderTour(['twister','missing-old-stop','twister']).join(','), 'twister');
`, context);
console.log('57 unique stations. All 24 combinations of group size, category and step-free access passed.');
