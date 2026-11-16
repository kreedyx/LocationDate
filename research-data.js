// Inventory numbers are research references, not museum signage.
// '?' flags provisional player counts; '-' means the count is unknown.
const categoryKeys = {
  love: 'Liebe & Beziehungen',
  exchange: 'Kommunikation & Austausch',
  creative: 'Kreativität',
  games: 'Spiele',
};
const interests = Object.values(categoryKeys);
const inventory = [
  ['Ansichtssache','2','exchange games','Zwei Personen vergleichen unterschiedliche Sichtweisen und tauschen sich darüber aus.'],
  ['The Happy Wall','123','creative','Eine kreative Mitmachwand.'],
  ['Schätz mal! Classic Edition','23?','games'],
  ['Twister','3','games'],
  ['Tabu XXL','23','exchange games'],
  ['Shuffleboard & Bowling','123','games'],
  ['Honigjagd','23','games'],
  ['Die Leonardo-Brücke','12','creative games','Eine Konstruktionsaufgabe mit Bauelementen.'],
  ['Speed Cups','2?','games'],
  ['Beat That!','123','games','Geschicklichkeits-Challenges mit Karten. Die Anleitung nennt Solo, Duell, Meisterschaft und Zweigespann.'],
  ['Billy Biber','23','games'],
  ['Chaos Skala','23','exchange games','Ein Spiel mit Gesprächs- und Einschätzungsaufgaben. Für zwei Personen gibt es besondere Regeln, daneben einen Gruppenmodus.'],
  ['Alles außer Stadt, Land, Fluss','23','creative games'],
  ['Darts Bingo','123','games'],
  ['Movie Shit Show','23','games'],
  ['Watch Vibes','2','exchange games'],
  ['Bouncing Ball','2','games'],
  ['Lügendetektor','2','exchange games'],
  ['Lost in Translation','2','games'],
  ['Die 2-teilige Pyramide','1','games','Eine Logik- und Geduldaufgabe.'],
  ['Sticky Darts','23','games'],
  ['Schlimmer geht immer','23?','creative games','Ein kreatives Spiel mit absurden Begriffen und Aussagen.'],
  ['Frösch-Balance','23?','games'],
  ['Tower Challenge','23','exchange games','Ein Geschicklichkeitsspiel mit Aufgaben, die auch Gespräche und persönliche Fragen beinhalten.'],
  ["It's Bananas!",'23','games'],
  ['Tantrix Discovery','1','games','Ein Logikspiel mit Spielsteinen.'],
  ['Pizza Pong','23','games'],
  ['Mathematische Karten – Name unbekannt','-','games'],
  ['Geo Quest','23?','games'],
  ['Summ das Lied','23','creative games'],
  ['Beat Saber (VR)','1','games','Ein VR-Spiel mit rhythmischen Bewegungen. Eine Person spielt pro Durchgang.'],
  ['Codebreaker','2','games'],
  ['10 von 10','23?','exchange'],
  ['Heißer Draht','1','games','Bewältige einen Metallparcours möglichst ohne Berührung. Eine Person spielt pro Versuch.'],
  ['Durchziehen oder Auspacken?','23?','exchange'],
  ['Stühle stapeln','23','games'],
  ['3D Pinball','1','games','Sammle möglichst viele Punkte in einem digitalen Flipperspiel.'],
  ['Präsentationsroulette','2','creative exchange','Zwei Personen improvisieren abwechselnd Präsentationen anhand unbekannter Folien.'],
  ['Mandela-Effekt','123','games','Überprüfe deine Erinnerungen und hinterfrage vermeintlich bekannte Darstellungen.'],
  ['Retro-Gaming / Zocken','123?','games','Klassische digitale Spiele. Laut Beschilderung beträgt die maximale Spielzeit zehn Minuten.'],
  ['Super Nintendo','12?','games'],
  ['Braille-Alphabet','123','games','Lerne die Brailleschrift kennen und erkenne Buchstaben durch Tasten.'],
  ['Zahlenduell','23','games','Wählt Zahlenkarten, deckt sie gleichzeitig auf und spielt um Karten.'],
  ['Schiffe versenken','2','games','Ein klassisches Strategiespiel für zwei Personen.'],
  ['Stäbchenfalle','23','games','Zieht farbige Stäbchen heraus und versucht, dabei möglichst wenige Kugeln fallen zu lassen.'],
  ['Shut the Box','123?','games','Schließt mit zwei Würfeln Zahlen und sammelt möglichst wenige Strafpunkte.'],
  ['Pinguin-Eisbrecher','23','games','Schlagt abwechselnd Eisblöcke heraus. Wer den Pinguin zum Fallen bringt, verliert.'],
  ['Fang das Ei!','23','games','Jede Person versucht in fünf Versuchen, ein unvorhersehbar springendes Ei zu fangen.'],
  ['Cornhole','23','games','Werft Säckchen auf eine Zielscheibe. Laut dokumentierter Anleitung gewinnt, wer zuerst genau zwölf Punkte erreicht.'],
  ['Memory-Schach','23','games','Merkt euch die verdeckten Farben der Figuren und sammelt passende Figuren.'],
  ['Kennzeichen-Detektiv','2','games','Eine Person liest Buchstaben von Kennzeichenkarten vor, die andere rät die Lösung. Nach fünf Karten vergleicht ihr eure Punkte.'],
  ['Wurfspiel / Zielscheibe – Name unbekannt','-','games'],
  ['Mikado','23','games','Zieht Stäbchen einzeln heraus, ohne die anderen zu bewegen.'],
  ['Stift statt Stimme','2','creative games','Eine Person zeichnet einen Songtitel ohne Wörter oder Zahlen, die andere errät das Lied.'],
  ['Holz-Kugelspiel – Name unbekannt','-','games'],
  ['Einhorn-Ringwurf','23','games','Eine Person trägt oder hält ein Einhorn-Horn. Die andere wirft Ringe darauf. Anschließend tauscht ihr die Rollen.'],
  ['12 Monate Liebe','23','love exchange','Zieht Karten mit persönlichen Fragen und kleinen Challenges. Sprecht darüber oder führt Aufgaben gemeinsam durch. Es gibt keine richtigen oder falschen Antworten.'],
];
const descriptionsEN = {
  1:'Two people compare and discuss different viewpoints.', 2:'A wall for creative participation.',
  8:'A construction challenge with building elements.', 10:'Dexterity challenges with cards. The instructions list solo, duel, championship and tandem modes.',
  12:'A game of conversation and judgement tasks, with special rules for two and a group mode.',
  20:'A logic and patience challenge.', 22:'A creative game with absurd terms and statements.',
  24:'A dexterity game with tasks that include conversations and personal questions.', 26:'A logic game with tiles.',
  31:'A rhythm-based VR game. One person plays per round.', 34:'Navigate a metal course without touching it. One person plays per attempt.',
  37:'A digital pinball game. Try to score as many points as possible.',
  38:'Two people take turns improvising presentations using unfamiliar slides.',
  39:'Check your memories and question seemingly familiar images.',
  40:'Classic digital games. The sign states a maximum play time of ten minutes.',
  42:'Get to know Braille and recognise letters by touch.',
  43:'Choose number cards, reveal them simultaneously and play for cards.',
  44:'A classic strategy game for two people.',
  45:'Pull out coloured sticks and try to drop as few balls as possible.',
  46:'Use two dice to close numbers and collect as few penalty points as possible.',
  47:'Take turns knocking out ice blocks. Whoever makes the penguin fall loses.',
  48:'Each person has five attempts to catch an egg that bounces unpredictably.',
  49:'Throw bags at a target. The documented instructions say the first to exactly twelve points wins.',
  50:'Remember the hidden colours of the pieces and collect matching pieces.',
  51:'One person reads letters from number plate cards and the other guesses. Compare points after five cards.',
  53:'Remove sticks one at a time without moving the others.',
  54:'One person draws a song title without words or numbers. The other guesses the song.',
  56:'One person wears or holds a unicorn horn and the other throws rings at it. Then swap roles.',
  57:'Draw cards with personal questions and small challenges. Talk or do the tasks together. There are no right or wrong answers.',
};
const legacyStationIds = {4:'twister',25:'its-bananas',32:'code-breaker',44:'battleships'};
// Only differing, legible entries from the new list need an override.
const handwrittenUpdates = {
  3:['23','games'], 9:['2','games'], 10:['2','games'], 14:['23','games'],
  16:['2','games exchange love'], 22:['23','games exchange'], 23:['23','games'],
  29:['23','games'], 30:['23','games'], 33:['23','exchange love'],
  35:['23','exchange love'], 38:['2','creative games'], 40:['12','games'],
  41:['12','games'], 46:['123','games'], 52:['23','games'], 54:['2','games'],
  55:['1','games'], 56:['2','games'], 57:['2','love'],
};
// Estimated bands based on the documented play format.
const estimatedDurationByNumber = {
  34:'under5', 48:'under5',
  43:'5to10', 45:'5to10', 46:'5to10', 47:'5to10', 51:'5to10',
  44:'10to20',
};
const activities = inventory.map(([name, sizes, tags, description], index) => {
  const number = index + 1;
  // The new list adds First Aid at 14 (excluded) and omits Mathematical Cards.
  const sketchNumber = number === 28 ? null : number === 23 ? 23 : number === 22 ? 24 :
    number >= 14 && number <= 27 ? number + 1 : number;
  const point = sketchPoints[sketchNumber];
  const floor = sketchNumber == null ? null : sketchNumber <= 13 ? 'og' : 'eg';
  [sizes, tags] = handwrittenUpdates[number] || [sizes, tags];
  return {
    id: legacyStationIds[number] || `research-${number}`, number, name, nameEN: name,
    description, descriptionEN: descriptionsEN[number],
    people: [...sizes.replace(/[?\-]/g,'')].map(Number),
    peopleStatus: sizes === '-' ? 'unknown' : sizes.endsWith('?') ? 'provisional' : 'research',
    categories: tags.split(' ').map(key => categoryKeys[key]),
    preferenceTags: tags.split(' '),
    experienceStyles: tags.includes('exchange') ? ['talk','quiet'] : ['active'],
    kind:'station', floor, point, sketchNumber,
    locationStatus: point ? 'sketch' : 'unknown',
    nameStatus: [28,52,55].includes(number) ? 'working' : number === 23 ? 'provisional' : 'research',
    possibleSharedZone: [40,41].includes(number),
    maxPlayMinutes: number === 40 ? 10 : null,
    durationCategory: estimatedDurationByNumber[number] || 'individual',
    participationUnit: number === 31 ? 'perRound' : number === 34 ? 'perAttempt' : null,
  };
});
activities.push(
  {id:'games-eg',name:'Spielbereich am Eingang',nameEN:'Entrance games area',floor:'eg',x:165,y:810,shape:'M48 735 H295 V932 H48 Z'},
  {id:'games-og',name:'Spielbereich im 1. OG',nameEN:'First-floor games area',floor:'og',x:210,y:110,shape:'M48 55 H432 V155 H180 V295 H48 Z'},
);
for (const zone of activities.filter(a => !a.number)) {
  Object.assign(zone,{container:true,kind:'zone',people:[2,3],categories:[categoryKeys.games]});
}
