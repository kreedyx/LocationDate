# Recherchebestand

Die 57 Einträge stehen in `research-data.js`. Die Nummern sind Referenzen der Fotoauswertung. Die Website verwendet diese Daten für Übersicht, Karte und Tour. Die vier Filterkategorien sind Liebe & Beziehungen, Kommunikation & Austausch, Kreativität und Spiele.

- **Karte:** Die bestehende Skizze zeigt EG und 1. OG als Ausstellungsebenen sowie das UG mit WC. Das stimmt in der Struktur mit der Recherche überein. Die geometrische Genauigkeit und die Einordnung des WC ins UG lassen sich aus der Angabe „unten“ allein nicht bestätigen.
- **Zuordnung:** Twister und Schiffe versenken stehen im vorhandenen Spielbereich im 1. OG. It's Bananas! und Codebreaker stehen im vorhandenen Spielbereich am Eingang. Die vier Zuordnungen beruhen auf übereinstimmenden Einträgen der bisherigen Planskizze und bleiben auf Bereichsebene. Bei 53 Einträgen fehlt eine bestätigte Position. Die Foto-Reihenfolge ist als interner Hinweis hinterlegt.
- **Teilnehmerzahlen:** Vorläufige Werte sind als solche markiert. Mathematische Karten, Wurfspiel/Zielscheibe und Holz-Kugelspiel haben unbekannte Teilnehmerzahlen und Arbeitsbezeichnungen. Frösch-Balance hat einen zu prüfenden Namen. Die übrigen Teilnehmerangaben entsprechen dem Recherchebestand.
- **Spielbereich:** Retro-Gaming und Super Nintendo sind separat auffindbare Einträge in einer möglichen gemeinsamen Spielzone. Empfehlungen schlagen höchstens einen davon pro Tour vor. Die zehn Minuten für Retro-Gaming sind die maximale Spielzeit laut Schild. Eine Gesamtdauer wird nicht berechnet.
- **Offene Bestätigungen:** Positionen und Spielanleitungen, die im Inventar fehlen, die gemeinsame Retro-Spielzone, tatsächliche Dauern, stufenfreier Zugang und stationsbezogene Hinweise auf sensible Themen. Erste Hilfe ist nicht im Spielbestand enthalten.
- **Gespeicherte Touren:** Vier identische Aktivitäten behalten ihre bisherigen IDs. Alte Prototyp-Stopps ohne Entsprechung im neuen Bestand werden beim Laden übersprungen und mit einem Hinweis gemeldet.
- **Prüfung:** `node verify.mjs` prüft die eindeutigen Einträge und Kombinationen aus Personengruppe, Kategorie und stufenfreiem Zugang.

## Karte nach der neuen Skizze

Der Abschnitt zur bisherigen Zuordnung beschreibt den früheren Stand. Die neue Skizze liefert 54 auf den vorhandenen Plan übertragene Positionen (13 im OG, 41 im EG). Die Nummern in `map-points.js` stammen aus der neuen Liste und bleiben von gespeicherten Tour-IDs getrennt. „Mathematische Karten“ fehlt in der neuen Liste. Für „Pinguin-Eisbrecher“ und „Fang das Ei!“ fehlt ein eindeutiger Kartenpunkt. Alle drei bleiben in der Übersicht. „Erste Hilfe“ hat keinen bestätigten Eintrag als Tourstation.

Die beiden Entdeckungsebenen starten ausgeschaltet. Die Strumpfhose und die gekennzeichnete Demo-Wandfrage bleiben neben der Karte, bis Koordinaten vorliegen. Für die Strumpfhose fehlt außerdem das Foto der Geschichte. In `map-points.js` können echte Fundorte und der Ausstellungstext ergänzt werden.
