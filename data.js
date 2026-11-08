// Projektkategorien und vorläufige Stationszuordnungen, keine offiziellen Angaben.
const interests=['Liebe & Beziehungen','Kreativität','Spiel & Spaß','Vertrauen & Verbindung','Emotionen','Digitale Erlebnisse'];
const activities=[];
function station(id,floor,x,y,people,categories,name,description,kind='station',shape=null){activities.push({id,floor,x,y,people,categories,name,description,kind,shape,duration:null,accessibility:null});}
const pairDescription='Interaktive Station für zwei Personen aus der Besuchsskizze. Offizieller Name und genauer Ablauf sind noch zu ergänzen.';
[[65,85],[505,80],[610,75],[610,165],[165,230],[65,385],[365,310],[585,335],[580,425],[65,565],[365,550],[260,670]].forEach(([x,y],i)=>station('eg-p'+i,'eg',x,y,[2],[i%2?'Vertrauen & Verbindung':'Liebe & Beziehungen','Emotionen'],'Begegnung '+String(i+1).padStart(2,'0')+' · Arbeitstitel',pairDescription));
station('vr','eg',300,95,[1,2],['Digitale Erlebnisse'],'VR-Erlebnis','Solo-freundliches Erlebnis mit VR-Headset. Zuordnung zu diesem blauen Marker ist vorläufig; Inhalt und Teilnahme zu zweit sind noch zu bestätigen.');
station('computer','eg',260,405,[1,2],['Digitale Erlebnisse','Spiel & Spaß'],'Computerspiel','Solo-freundliches Computerspiel. Die Position an diesem blauen Marker und die Nutzung zu zweit sind vorläufige Projektzuordnungen.');
[[90,220],[370,90],[580,530],[250,550]].forEach(([x,y],i)=>station('eg-g'+i,'eg',x,y,[2,3],['Spiel & Spaß'],'Spielstation '+(i+1)+' · Arbeitstitel','Marker für eine gemeinsame Aktivität. Das konkrete Spiel und die Teilnehmerzahl sind noch zu prüfen.'));
station('games-eg','eg',165,810,[2,3],['Spiel & Spaß'],'Gemeinsam ins Spiel','Größerer Spielbereich nahe dem Eingang, unter anderem mit Darts und weiteren, noch nicht dokumentierten Spielen. Angaben gelten für den Bereich; einzelne Spiele können abweichen.','zone','M48 735 H295 V932 H48 Z');
station('games-og','og',210,110,[2,3],['Spiel & Spaß','Vertrauen & Verbindung'],'Platz fürs Miteinander','Großer Spielbereich entlang der linken Seite und oberhalb des Treppenkerns. Für Gruppen; manche Spiele sind auch zu zweit nutzbar. Einzelne Spiele sind noch zu ergänzen.','zone','M48 55 H432 V155 H180 V295 H48 Z');
station('drawing','og',550,150,[1,2,3],['Kreativität','Emotionen'],'Eure Spuren an der Wand','Kreativer Bereich zum Zeichnen an einer Wand, allein oder gemeinsam. Die Zuordnung zum blauen Bereich rechts in der Skizze ist vorläufig.','zone','M470 57 H640 V225 H470 Z');
station('og-p1','og',200,90,[2],['Liebe & Beziehungen'],'Begegnung 13 · Arbeitstitel',pairDescription);
station('og-p2','og',620,90,[2],['Emotionen','Vertrauen & Verbindung'],'Begegnung 14 · Arbeitstitel',pairDescription);
station('og-g','og',535,270,[2,3],['Spiel & Spaß'],'Spielstation 5 · Arbeitstitel','Gemeinsame Spielstation rechts neben der Treppe. Name und Spielregeln sind noch zu ergänzen.');
