// Instructions supplied by the project team, keyed by existing station IDs.
const stationInstructions = {
  'research-1': `
    <h3>Spielanleitung</h3>
    <p>In diesem Spiel begegnen euch verschiedene Alltagssituationen. Immer erleben zwei Personen genau dasselbe – und bewerten es trotzdem völlig unterschiedlich.</p>
    <ol>
      <li>Lest gemeinsam eine Situation und die Aussagen von Person A und Person B.</li>
      <li>Überlegt kurz: Warum nehmen die beiden dieselbe Situation so unterschiedlich wahr? Mit welcher Person könnt ihr euch eher identifizieren?</li>
      <li>Sprecht über eure Gedanken und geht anschließend zur nächsten Situation über.</li>
    </ol>
    <h4>Fragen zum Nachdenken</h4>
    <ul data-no-speech>
      <li>Wie oft beurteilst du Menschen, Beziehungen oder dein eigenes Leben auf dieselbe Weise?</li>
      <li>Gibt es in deinem Leben eine Situation, die du heute anders bewerten würdest als früher?</li>
      <li>Fällt es dir eher leicht oder schwer, in schwierigen Situationen auch Chancen zu erkennen?</li>
    </ul>
    <h4>Denkanstoß</h4>
    <p data-no-speech>Vielleicht verändert nicht das Leben deine Sicht auf die Welt – sondern deine Sicht auf die Welt dein Leben.</p>`,
  'research-2': `
    <h3>Mitmachanleitung</h3>
    <p>Hier darfst du malen, schreiben und gestalten – aber bitte beachte unsere Regeln!</p>
    <h4>Erlaubt ist alles, was</h4>
    <ul>
      <li>lustig, liebevoll oder verrückt ist,</li>
      <li>motiviert oder inspiriert,</li>
      <li>anderen ein gutes Gefühl gibt,</li>
      <li>einfach Spaß macht oder zum Schmunzeln bringt.</li>
    </ul>
    <h4>Bitte lass weg</h4>
    <ul>
      <li>Beleidigungen,</li>
      <li>politische oder religiöse Botschaften,</li>
      <li>Werbung oder Social-Media-Links,</li>
      <li>Namen und Pärchen-Kürzel,</li>
      <li>Fußballvereine,</li>
      <li>sexuelle oder sonstige Zeichnungen, die verletzen,</li>
      <li>alles, was andere provoziert.</li>
    </ul>
    <h4>So machst du mit</h4>
    <ol>
      <li>Suche dir eine freie Stelle an der Wand.</li>
      <li>Schreibe eine positive Nachricht, male etwas oder hinterlasse einen kreativen Gedanken.</li>
      <li>Achte darauf, die Beiträge anderer Besucher zu respektieren.</li>
    </ol>`,
  'research-3': `
    <h3>Vorgeschlagene Anleitung</h3>
    <p data-no-speech><strong>Spielablauf nicht auf dem Foto bestätigt.</strong></p>
    <h4>Ziel</h4>
    <p>Schätzt gemeinsam überraschende Zahlen und Fakten möglichst genau.</p>
    <ol>
      <li>Wählt eine Frage aus der Sammlung.</li>
      <li>Alle Mitspielenden geben ihre Schätzung ab.</li>
      <li>Vergleicht eure Antworten.</li>
      <li>Prüft die richtige Lösung anhand der vorhandenen Antwortkarten, sofern verfügbar.</li>
      <li>Wer am nächsten an der richtigen Antwort liegt, erhält einen Punkt.</li>
      <li>Danach folgt die nächste Frage.</li>
    </ol>
    <h4>Beispielfragen aus der Station</h4>
    <ul data-no-speech>
      <li>Wie viel wiegen eine Million Euro in 100-Euro-Scheinen?</li>
      <li>Wie viele Tennisbälle werden während Wimbledon verbraucht?</li>
      <li>Wie viele Stufen hat die längste Treppe der Welt in einem Gebäude?</li>
      <li>Wie viele McDonald's-Filialen gibt es in den USA?</li>
      <li>Wie viele Tasten hat ein Klavier?</li>
      <li>In welchem Jahr wurde das erste YouTube-Video hochgeladen?</li>
      <li>Wie viele Staffeln der Serie „Raumschiff Enterprise“ gibt es?</li>
    </ul>
    <h4>Gewonnen</h4>
    <p>Wer nach einer gemeinsam festgelegten Anzahl von Fragen die meisten Punkte hat, gewinnt.</p>`,
  twister: `
    <h3>Spielanleitung</h3>
    <h4>Ziel</h4>
    <p>Bleibe im Gleichgewicht und versuche, nicht umzufallen.</p>
    <ol>
      <li>Breitet die Twister-Matte auf dem Boden aus.</li>
      <li>Eine Person dreht den Zeiger auf der Drehscheibe.</li>
      <li>Der Zeiger bestimmt eine Körperseite und eine Farbe, zum Beispiel „rechte Hand auf Rot“.</li>
      <li>Die spielende Person setzt die entsprechende Hand oder den Fuß auf einen freien Kreis dieser Farbe.</li>
      <li>Dreht den Zeiger erneut und folgt den nächsten Anweisungen.</li>
      <li>Versucht, eure Position zu halten, ohne umzufallen.</li>
    </ol>
    <h4>Gewonnen</h4>
    <p>Wer am längsten das Gleichgewicht hält, gewinnt.</p>`,
  'research-5': `
    <h3>Spielanleitung</h3>
    <p>Eine Runde dauert eine Minute. Eine Person stellt die Begriffe dar, die anderen raten. Jeder richtige Begriff zählt einen Punkt.</p>
    <h4>Drei Kategorien</h4>
    <p><strong data-no-speech>Erklären.</strong> Erkläre den oberen Begriff. Der Begriff selbst, Teile davon und die Tabu-Wörter darunter sind verboten.</p>
    <p><strong data-no-speech>Zeichnen.</strong> Zeichne den Begriff. Sprechen, Wörter und Buchstaben sind verboten. Zahlen sind erlaubt, zum Beispiel 8, um auf den 1. oder 2. Teil eines Wortes hinzuweisen.</p>
    <p><strong data-no-speech>Pantomime mit Knut.</strong> Stelle den Begriff mit dem Plüschtier Knut pantomimisch dar. Sprechen und Geräusche sind verboten.</p>
    <h4>Punktewertung</h4>
    <ul>
      <li>Richtig: Karte behalten = 1 Punkt.</li>
      <li>Zu schwer: Karte weglegen und nächste ziehen = 0 Punkte.</li>
      <li>Regel gebrochen: Karte weglegen = 0 Punkte.</li>
    </ul>
    <h4>Ihr seid nur zu zweit oder zu dritt?</h4>
    <p>Dann macht jede Person jede Kategorie einmal. Am Ende zählt ihr eure Punkte zusammen und vergleicht euer Ergebnis in der Auswertung.</p>`,
  'research-6': `
    <h3>Vorgeschlagene Anleitung</h3>
    <p data-no-speech><strong>Auf dem Foto ist keine vollständige Spielanleitung sichtbar.</strong></p>
    <h4>Ziel</h4>
    <p>Schiebe die Kugeln möglichst geschickt über das Spielfeld und sammle Punkte.</p>
    <ol>
      <li>Stellt euch an das untere Ende des Spielbretts.</li>
      <li>Nehmt eine Kugel und schiebt sie vorsichtig über die Bahn.</li>
      <li>Versucht, die Kugel möglichst weit in einen der markierten Punktebereiche rollen zu lassen.</li>
      <li>Eine Kugel, die im Bereich 1 liegen bleibt, zählt einen Punkt; im Bereich 2 zwei Punkte und im Bereich 3 drei Punkte.</li>
      <li>Rollt die Kugel über das Spielfeld hinaus, gibt es dafür keine Punkte.</li>
      <li>Wechselt euch ab und zählt am Ende eure Punkte zusammen.</li>
    </ol>
    <h4>Gewonnen</h4>
    <p>Wer nach einer vereinbarten Anzahl von Runden die meisten Punkte hat, gewinnt.</p>
    <h4>Hinweis</h4>
    <p data-no-speech>Die genaue Spielweise und die Funktion der Kegel sind noch nicht bestätigt.</p>`,
  'research-7': `
    <h3>Spielanleitung</h3>
    <h4>Ziel</h4>
    <p>Sammle so viele Honigkugeln wie möglich!</p>
    <ol>
      <li>Jeder Spieler setzt einen Bienen-Stirnreif auf.</li>
      <li>Verteilt alle Kugeln auf der Spielfläche.</li>
      <li>Auf „Los!“ spielen beide Spieler gleichzeitig.</li>
      <li>Bewege deinen Kopf und versuche, mit der Biene eine Kugel zu fangen.</li>
      <li>Die Hände dürfen nicht benutzt werden!</li>
      <li>Hast du eine Kugel gefangen, bringe sie mit der Biene zu deiner Seite und lege sie dort ab.</li>
      <li>Spielt weiter, bis keine Kugeln mehr auf der Spielfläche liegen.</li>
      <li>Danach zählt jeder Spieler seine gesammelten Kugeln.</li>
    </ol>
    <h4>Gewonnen</h4>
    <p>Wer die meisten Kugeln gesammelt hat, gewinnt!</p>`,
  'research-8': `
    <h3>Bauanleitung</h3>
    <p>Durch trickreiches Zusammenlegen von Holzstäben entsteht eine Brücke, die ohne Klebstoff, ohne Schnur und ohne Schrauben hält. Man nennt dies eine selbsttragende Struktur.</p>
    <ol>
      <li>Beginne mit zwei Längsstäben.</li>
      <li>Lege in der Mitte einen Querstab auf diese beiden Längsstäbe.</li>
      <li>Lege einen weiteren Querstab am Ende unter die beiden Längsstäbe.</li>
      <li>Schiebe einen weiteren Längsstab in der Mitte zwischen den beiden Längsstäben unter den unterliegenden Querstab und über den obenliegenden Querstab.</li>
      <li>Hebe das freie Ende des mittleren Längsstabes hoch und beobachte, wie stabil die Konstruktion ist.</li>
      <li>Erweitere die Konstruktion schrittweise zu einer größeren Brücke.</li>
    </ol>
    <h4>Hintergrund</h4>
    <p data-no-speech>Die Leonardo-Brücke wurde 1483 von Leonardo da Vinci beschrieben. Schon Jahrhunderte vorher soll sie in China bekannt gewesen sein.</p>`,
  'research-9': `
    <h3>Spielanleitung</h3>
    <h4>Ziel</h4>
    <p>Ordne deine fünf Becher so schnell wie möglich in der richtigen Reihenfolge an.</p>
    <ol>
      <li>Jeder Spieler bekommt fünf Becher in verschiedenen Farben.</li>
      <li>Eine Aufgabenkarte wird aufgedeckt. Sie zeigt, wie die Farben angeordnet werden müssen.</li>
      <li>Alle spielen gleichzeitig und versuchen, ihre Becher genauso anzuordnen, wie auf der Aufgabenkarte abgebildet.</li>
      <li>Wer zuerst fertig ist, schlägt auf die Glocke.</li>
      <li>Ist die Reihenfolge richtig, bekommt der Spieler die Aufgabenkarte als Punkt. Ist sie falsch, können die anderen weiterspielen.</li>
    </ol>
    <h4>Gewonnen</h4>
    <p>Wer am Ende die meisten Karten gesammelt hat, gewinnt.</p>`,
  'research-10': `
    <h3>Spielanleitung</h3>
    <ol>
      <li>Zieht gemeinsam eine Challenge-Karte.</li>
      <li>Führt die auf der Karte stehende Challenge durch. Wer die Challenge erfolgreich schafft, bekommt einen Punkt.</li>
      <li>Zieht die nächste Karte.</li>
      <li>Entscheidet selbst, wie viele Challenges ihr machen wollt. Wer am Ende die meisten Punkte gesammelt beziehungsweise Challenges gewonnen hat, gewinnt!</li>
    </ol>
    <h4>Challenge-Arten</h4>
    <ul>
      <li><strong data-no-speech>Solo:</strong> Jede Person spielt einzeln nacheinander.</li>
      <li><strong data-no-speech>Duell:</strong> Zwei Spielende treten gegeneinander an.</li>
      <li><strong data-no-speech>Meisterschaft:</strong> Alle spielen gegeneinander.</li>
      <li><strong data-no-speech>Zweigespann:</strong> Zwei Spielende bilden ein Team.</li>
    </ul>`,
};
