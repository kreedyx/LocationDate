# Gefühlssache — Personalized Museum Experience Guide

Independent, unofficial KISD / TH Köln student prototype. Built on the existing interactive map; `geometry.js` is unchanged. No installation, API, account, deployment or uploads.

## Open locally
Open `index.html` with VS Code Live Server. The optional Google Fonts request falls back to Georgia/Arial offline. localStorage is specific to the browser **and the exact origin/port**: use the same Live Server address to restore a tour.

## Two connected entry points
- **Meine Tour erstellen / Create my tour** opens a five-step, optional questionnaire. Cards support keyboard and touch; questions can be skipped. Answers remain a draft until Generate is pressed. Regenerating replaces the current tour selection.
- **Selbst entdecken / Explore on my own** goes directly to the original interactive SVG. Open any station/zone and add or remove it. The same tour list supports generated and manually added stops, completion and removal.
- The map's group, interest, duration and step-free filters stay functional. Questionnaire interests appear as removable chips beside the existing interest selector. Choosing an interest in the selector replaces questionnaire-interest filters. Reset clears filters/preferences, keeping the tour.
- Nonmatching activities fade to 17%. Tour stops show an outline and order number; completed stops use a checkmark and a different fill. Even faded stations remain selectable. The ordered overview can navigate between floors and open details.

## Recommendations and time
`recommendTour(profile)` in `tour-data.js` enforces group compatibility, selected interests, per-activity duration filters and step-free access. It ranks suitable candidates by provisional experience style and group type; family/group slightly favours group-friendly activities, while partner/friend never implies romantic interests. “A bit of everything” favours varied experience categories. Recommendations fit the chosen budget including demo transition times; without a budget the initial recommendation contains up to six stops.

Station order is a conceptual sequence around the existing circulation areas, with EG before OG. It is **not verified pedestrian navigation**, and no unverified path is drawn through walls. Manual additions may exceed the budget or conflict with filters; the overview flags this and preserves the visitor's selection.

**All current time estimates are demonstration data:** pair activity 5 min, individual-friendly digital activity 8 min, group marker 7 min, zone 15 min. The total additionally uses 2 min per stop and 3 min per floor change. Official `duration` fields in `data.js` remain `null`. To supply confirmed timing, set `duration: {minutes: 8}`; the guide then uses those minutes for that activity. Until transition estimates are validated, total duration remains marked as a demo estimate.

“Read & discover” is available as a preference, but no reading activities have been documented. That preference alone produces no recommendations and an explicit explanation. Unknown names, activity descriptions, participant compatibility and assignments retain their provisional labels.

## Save, share and progress
**Save my tour** stores the current station IDs, questionnaire/filter preferences, language and visited IDs under localStorage key `kisd-museum-tour-v1`. Once saved, later edits are saved automatically. Marking a stop as visited also saves the tour locally so progress survives a refresh. Reset progress clears visited IDs while retaining stops. Delete saved tour removes only this app's storage key and disables autosave; the in-memory tour stays until refresh or Clear tour. Unavailable storage produces a visible message without breaking planning.

Copy tour link writes a URL fragment containing **only station IDs**, no questionnaire answers or progress. Clipboard failure offers a selectable text field. It works for people with access to the same website address; a localhost link is not a public website. Opening a different shared tour leaves existing local storage untouched until the visitor saves it. Reloading a saved shared tour retains its progress.

## Audio and partner concept
The detail panel uses browser `speechSynthesis` for German/English speech, pause/resume and stop. Text stays visible. Missing support and speech errors have text fallbacks. Voice availability and audio output depend on the browser/device; no recorded audio or AI service is used.

The optional solo-only **Discover together** concept shows fictional examples. The age dropdown selects a **fictional age range**, never requests a real age, and is not stored, shared or used for real matching. No names, gender, photos, contact data or messaging.

## Editable files
- `index.html`: existing structure plus entry choices, tour section and questionnaire dialog.
- `style.css`: original identity plus responsive guide styles.
- `geometry.js`: original floor geometry, walls, stairs, orientation labels — unchanged.
- `data.js`: original stations/zones — unchanged.
- `tour-data.js`: separate editable demo minutes, style/tags, provisional English station text, recommendation and ordering functions.
- `i18n.js`: structured DE/EN UI translations and translations of provisional project content, not official museum translations.
- `app.js`: original SVG/filter system extended with tour/completed states and localized details.
- `guide.js`: questionnaire, shared tour management, persistence, audio, sharing and fictional partner UI.
- `verify.mjs`: dependency-free recommendation checks; run `node verify.mjs`.

## Validation
240 recommendation scenarios cover group compatibility, access, budgets and interests; additional checks cover solo station limits, mixed-category variety, demo totals and station translations. Browser checks cover questionnaire generation, optional skips, manual edits, saved-state restoration, completion, translation, copied-link restoration, fictional partner entries, speech-control state and mobile overflow. Responsive checks use a 390 px mobile viewport and desktop width. Native iPhone hardware/audio output is not independently verified.

## Reference-inspired visual identity
`design.css` is the visual layer over the original styles: peony `#FAD2E1`, burgundy `#770523`, pistachio `#D0D996`, fuchsia `#D81A67`, and blood orange `#DD4E28`. Solo-friendly map markers now use pistachio while preserving their circle symbol and legend. Original editable illustrations live in `assets/together-doodle.svg` and `assets/heart-doodle.svg`; the two entry icons are inline SVG in `wayDoodle()` in `guide.js`. These are newly drawn project assets, not copies of the reference illustrations. The optional display font is Bricolage Grotesque with local sans-serif fallbacks. The existing floor geometry, station data and tour logic are unchanged by the restyle.

## Annotated activity collection
`station-notes.js` now applies the team's annotated screenshot to the existing station IDs and adds the games inside the two existing games regions. There are 40 individual experiences: 34 from the notes and six marked prototype ideas at unlabelled positions. The full transcription is in `STATIONEN.md`. Short descriptions and sample questions are prototype additions; times and participant compatibility remain editable demo metadata.

`familiarity` is separate from `people`: `new` (★, getting acquainted), `close` (♡, already familiar), `both` (★♡), or `open` (no mark recorded). It appears on markers, detail panels and tour entries in DE/EN. The participant symbol for two people is now Ⅱ to distinguish it from the familiarity heart.

Games inside a zone have `parentZone` and `mapHidden`. Clicking the zone lists each game; games open their own details and can be added independently. The parent shows its children's tour state. `container` regions are excluded from automatic tour recommendations so stops and time are not counted twice. `geometry.js` and the Bordeaux/pink/pistachio visual identity remain unchanged.
