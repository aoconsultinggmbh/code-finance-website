---
titel: LIESMICH.md — Website CODE FINANCE
kategorie: Übergabe
kurzbeschreibung: Aufbau, Entscheidungen und offene Punkte des statischen Website-Entwurfs für CODE FINANCE. Vor jeder Änderung und vor dem Livegang lesen.
schlagworte: [CODE FINANCE, Website, Entwurf, Übergabe, Offene Punkte]
stand: 2026-09-16
version: 1.1
---

# CODE FINANCE, Website-Entwurf

Statische Website, vier Seiten, ohne CMS. Sie lädt nichts von fremden Servern:
Schriften und Bilder liegen lokal, es gibt keine Karte, kein eingebettetes Video,
keine Analyse und keine Werbepixel.

**Entwurf, keine Rechtsberatung.** Impressum und Datenschutzerklärung sind Gerüste
mit gelb markierten Lücken.

## Aufbau

```
website/
├── index.html              Startseite, One-Pager mit Ankernavigation
├── servicepakete.html      Unterseite: Servicepakete Basis, Plus und Premium
├── pkv-oder-gkv.html       Unterseite: PKV oder GKV, der ehrliche Vergleich 2026
├── impressum.html          Impressum und Erstinformation nach § 15 VersVermV
├── datenschutz.html        Datenschutzerklärung, passend zu genau dieser Seite
├── assets/
│   ├── schrift.css         Montserrat, lokal eingebunden
│   ├── stil.css            Hauptstilblatt, CI, Kopf, Fuß, alle Bausteine
│   ├── unterseiten.css     Bausteine beider Unterseiten (hieß bis zum
│                           16.09.2026 pkv-oder-gkv.css)
│   ├── skript.js           Burger-Menü, aktiver Menüpunkt, Formularprüfung
│   ├── barrierefreiheit.css/.js   Barrierefreiheits-Widget
│   ├── einwilligung.css/.js       Einwilligungsverwaltung
│   └── ci-bausteine.css    Faerbt die beiden Bausteine oben in die CI von
│                           CODE FINANCE. Wird zuletzt eingebunden, sonst
│                           gewinnen die Hausfarben Marine und Koralle.
├── fonts/                  Montserrat 400 bis 800, latin und latin-ext, plus Lizenz
├── img/                    Bilder, Favicon, Logo
├── robots.txt
└── sitemap.xml
```

## CI

Aus der bestehenden Seite ausgelesen und unverändert übernommen.

| Element | Wert |
|---|---|
| Schrift | Montserrat, Überschriften 600, Fließtext 400 |
| Gold | `#BF9B30`, dunkel `#A8871F`, Tönung `#F7F1DF` |
| Anthrazit | `#27252A` |
| Ivory | `#F7F3EA`, Blauton `#EEF1F6` |
| Buttons | 5 px Radius, Schriftgewicht 800 |

## Offene Punkte

Nach Dringlichkeit sortiert. Punkt 3 und 4 blockieren den Livegang.

### 1. Bilder sind eingesetzt, Bildnachweis fehlt

Die Originalfotos aus dem Bestand von CODE FINANCE liegen in `img/`, jeweils als WebP
und als JPG, zugeschnitten und mit sprechenden Dateinamen. Die Porträts wurden per
Gesichtserkennung mittig auf den Kopf zugeschnitten.

| Datei in `img/` | Quelle aus der Lieferung | Verwendung |
|---|---|---|
| `codefinance-karlsruhe-finanzberatung-beratungsgespraech` | Shooting97 | Hero |
| `codefinance-karlsruhe-analyse-bestandsaufnahme` | Shooting110 | Schritt 1 |
| `codefinance-karlsruhe-konzept-strategie` | Shooting114 | Schritt 2 |
| `codefinance-karlsruhe-begleitung-betreuung` | Shooting85 | Schritt 3 |
| `codefinance-karlsruhe-buero-team-hintergrund` | Shooting33 | Hintergrund Vorteile |
| `codefinance-karlsruhe-beratung-hintergrund` | Shooting92 | Hintergrund Vorgehen |
| `frederik-demski-…` | Shooting1 | Team |
| `daniel-michelberger-…` | Shooting14 | Team |
| `jesus-aramendiz-…` | Shooting7 | Team |
| `joshua-frank-…` | Mitarbeiter-2 | Team |
| `jann-herm-…` | Mitarbeiter-4 | Team |
| `codefinance-karlsruhe-kontakt-beratung-im-buero` | Standbild aus dem Imagefilm, Sekunde 17,5 | Kontakt |

Die Zuordnung der Porträts stammt aus der bestehenden Seite codefinance.de. **Bitte
einmal prüfen**, ob jede Person beim richtigen Namen steht.

Das Bild im Kontaktabschnitt ist kein Foto aus der Lieferung, sondern ein Standbild aus
dem eigenen Imagefilm, bei Sekunde 17,5 entnommen und auf 1200 mal 600 zugeschnitten.
Die eingebrannten Untertitel liegen unterhalb des Ausschnitts, im Bild ist also keine
Schrift zu sehen. Wenn ein richtiges Bürofoto nachgeliefert wird, einfach unter demselben
Dateinamen austauschen, dann bleibt der Code unverändert.

**Offen:** Bildnachweis, also Fotograf oder Agentur, für das Impressum. Für das Standbild
genügt der Hinweis auf die Filmproduktion.

### 2. Logo: Querformat selbst gesetzt

Geliefert wurde das Logo im Hochformat, Zeichen über Wortmarke. Für die Kopfleiste
braucht es eine querformatige Fassung. Die liegt als `img/codefinance-logo-quer.png`
und besteht aus denselben Bestandteilen, nur nebeneinander gesetzt: Zeichen links,
Wortmarke rechts. Das Original im Hochformat liegt unverändert als
`img/codefinance-logo.png` daneben.

**Vor dem Livegang von CODE FINANCE freigeben lassen** oder die offizielle
Querformat-Fassung anfordern und austauschen. Favicon und Apple-Touch-Icon stammen
aus der gelieferten Favicon-Datei.

**Aufräumen:** `img/codefinance-logo-platzhalter.svg` und `img/favicon.svg` werden
nicht mehr gebraucht und können gelöscht werden.

**Favicon, Stand 17.09.2026:** `favicon-32.png` und `favicon-192.png` sind aus
`codefinance-logo.png` erzeugt, Zeichen ohne Wortmarke, Hintergrund freigestellt.
Vorher lag das Zeichen auf einem weissen Kasten, der in dunklen Browserleisten als
heller Block auffiel. Beim 32er sind die halbdurchsichtigen Kantenpixel etwas
verdichtet (Alpha hoch 0,6), sonst wirken die duennen Linien bei dieser Groesse blass.
`apple-touch-icon.png` bleibt bewusst deckend auf Tinte `#1B1A1E` mit 18 Prozent
Rand, weil iOS transparente Symbole schwarz hinterlegt und die Ecken rundet.

### 2b. Videos sind eingebaut

Im Ordner `video/` liegen die Webfassungen der gelieferten Filme, erzeugt mit ffmpeg
aus dem Originalmaterial (H.264, faststart, Ton AAC):

| Datei | Verwendung | Größe |
|---|---|---|
| `codefinance-karlsruhe-imagefilm-quer-1080p.mp4` | Hero, Desktop | 16 MB |
| `codefinance-karlsruhe-imagefilm-quer-720p.mp4` | Reserve, schmale Leitung | 8,5 MB |
| `codefinance-karlsruhe-imagefilm-hoch-720p.mp4` | Hero, Handy | 11 MB |
| `codefinance-karlsruhe-kundenstimme-01-quer-720p.mp4` | Kundenstimme 1 | 7,2 MB |
| `codefinance-karlsruhe-kundenstimme-01-hoch-720p.mp4` | Kundenstimme 1, Handy | 8,7 MB |
| `codefinance-karlsruhe-kundenstimme-02-quer-720p.mp4` | Kundenstimme 2 | 7,6 MB |
| `codefinance-karlsruhe-kundenstimme-02-hoch-720p.mp4` | Kundenstimme 2, Handy | 8,3 MB |

**Nichts davon lädt beim Seitenaufruf.** Sichtbar ist nur ein Standbild aus dem Film,
`preload="none"`, und erst der Klick setzt die Quelle. Der Lichtkasten schließt mit
Escape oder Klick daneben. Auf Bildschirmen unter 620 px nimmt das Skript automatisch
die Hochformat-Fassung.

Seit dem 16.09.2026 laufen **alle drei Filme über Wistia**, siehe Abschnitt 2g.
Die lokalen MP4-Dateien in `video/` bleiben als Rückfall liegen, eingebunden sind sie
nicht mehr. Wer Wistia später nicht mehr will, tauscht am Abspielknopf `data-wistia`
gegen `data-quer` und `data-hoch` zurück und streicht die Kategorie „Videos".

**Offen:** Die Untertitel sind fest ins Bild gerendert. Für Barrierefreiheit und SEO
wären zusätzliche VTT-Untertitel (`<track kind="captions">`) besser. Text dafür liegt
nicht vor, er müsste aus dem Schnittprogramm exportiert werden.

**Offen:** In den Videos stellen sich zwei Kunden mit Namen vor. Auf der Seite stehen
bisher neutrale Überschriften. Wenn die beiden mit Namensnennung einverstanden sind,
können Name und Beruf in die Bildunterschrift.

### 2c. Vertrauensleiste mit Google-Bewertung

Ganz oben auf allen vier Seiten läuft eine schmale dunkle Leiste mit Sternen und der
Google-Bewertung. Eingetragen sind 5,0 von 5,0 bei 14 Rezensionen, abgelesen am
16.09.2026 aus dem Google-Unternehmensprofil. Die Werte stehen als Kommentar mit Datum
im HTML. **Vor dem Livegang noch einmal nachsehen**, Rezensionen kommen dazu.

Bewusst **kein** `aggregateRating` in den strukturierten Daten: Google-Rezensionen als
eigene Bewertungen auszuzeichnen kann eine manuelle Maßnahme von Google auslösen.
Die Zahlen stehen deshalb nur sichtbar auf der Seite, verlinkt auf das Profil.

### 2d. Google-Logo im Bewertungs-Baustein

In der Plakette liegt `img/google-logo.webp` mit PNG-Rückfall, geliefert von AO
Consulting am 16.09.2026. Die Datei wurde nur freigestellt und skaliert, Farben und
Form sind unverändert.

**Vor dem Livegang prüfen:** Google gibt die Nutzung des Zeichens nur unter eigenen
Bedingungen frei. Sauber ist die Datei aus dem Marketing-Kit des
Google-Unternehmensprofils oder aus dem Brand Resource Center. Das Zeichen darf nicht
eingefärbt, verzerrt oder mit anderen Elementen verschmolzen werden, und es braucht
Schutzraum ringsum. Der Kreis in der Plakette hält diesen Abstand ein.

Herkunft der aktuellen Datei bitte gegenprüfen. Wenn sie nicht aus einer der beiden
offiziellen Quellen stammt, gegen die offizielle austauschen. Dateiname bleibt gleich,
dann muss am Code nichts geändert werden.

### 2e. Beitragsentwicklung: Zahlen sind jetzt belegt

Auf der Unterseite „PKV oder GKV" zeigt das Liniendiagramm die durchschnittliche
Belastung je Versicherten, Index 2005 = 100, bis 2025.

**Quelle:** Wissenschaftliches Institut der PKV (WIP), „Entwicklung der Prämien- und
Beitragseinnahmen in PKV und GKV, Aktualisierung 2024/2025", Abbildung 2. Das
Faktenpapier von CODE FINANCE dazu liegt unter `00_projekt/quellen/`.

**Belegt sind nur die Endpunkte:** 2005 = 100 für beide, 2025 = 216,7 für die GKV und
183,8 für die PKV. Die Jahre dazwischen stehen nicht in der Quelle. Sie sind im
Datenblock als gleichmäßige jährliche Steigerung gerechnet, 3,94 % und 3,09 %, was den
ausgewiesenen 4,0 % und 3,1 % entspricht. Unter dem Diagramm steht das ausdrücklich.
Wer echte Zwischenjahre bekommt, trägt sie im Datenblock `BEITRAGSENTWICKLUNG` am Ende
von `pkv-oder-gkv.html` ein und streicht den Satz in `quelle`.

**Wichtig für die Formulierung:** Es sind Durchschnittswerte über zwei Systeme, keine
Aussage über einen einzelnen Vertrag. Sätze wie „PKV-Beiträge steigen nur um 3,1 % im
Jahr" wären eine unzulässige Verallgemeinerung. Der Hinweiskasten unter dem Diagramm
sagt das auch den Besuchern.

### 2e2. Abschnitt zur Zukunftsfestigkeit der GKV

Neu am 17.09.2026, ebenfalls auf der PKV-Seite, direkt vor dem Orientierungs-Check.
Vier Kennzahlen mit Quellenangabe je Kachel: Ausgaben plus 64 % gegen Einnahmen plus
31 % (2005 bis 2025, preisbereinigt), Beitragssatz von 14,2 auf 17,1 %, Projektion
19,8 % für 2040, Finanzierungslücke rund 40 Mrd. € bis 2030.

Quellen sind verlinkt: Sachverständigenrat Wirtschaft (Frühjahrsgutachten 2026) und
zwei Seiten des Bundesgesundheitsministeriums. Der Text trennt bewusst zwischen
beobachteten Daten und Projektionen und enthält den Satz „Das heißt nicht, dass die GKV
zusammenbricht". Formulierungen wie „Die GKV wird zusammenbrechen" oder „19,8 % sind
sicher" sind laut Faktenpapier zu vermeiden und stehen deshalb nirgends auf der Seite.

Die Zahlen haben einen Stand: September 2026. **Bei neuen Gutachten aktualisieren.**

### 2f. Wegweiser auf der Startseite

Zwischen Leistungen und Vorgehen liegt ein dunkler Abschnitt, der auf die Unterseite
„PKV oder GKV" führt, mit drei Eckdaten und einem Knopf. Damit geht die Unterseite auf
der Startseite nicht unter. Der Menüpunkt oben führt weiterhin direkt dorthin.

### 2g. Imagefilm läuft über Wistia

Der Imagefilm im Hero kommt seit dem 16.09.2026 von Wistia, Media-ID `2afxdzjr6q`.
Verkabelt ist er über zwei Attribute am Abspielknopf in `index.html`:
`data-wistia` und `data-aspect`. Die Logik steht in `assets/skript.js`, Abschnitt 5.

**Ablauf:** Sichtbar ist zuerst nur unser eigenes Standbild aus `img/`. Der Klick
zeigt eine Frage über dem Bild, die Wistia mit Anbieter und Datenübermittlung nennt.
Erst der zweite Klick setzt die Einwilligung und lädt Skript und Player nach.
Automatisiert geprüft: vor der Zustimmung geht **keine einzige Anfrage** an
fast.wistia.com, danach genau diese.

Damit gibt es jetzt eine einwilligungspflichtige Kategorie. Das Einwilligungsfenster
erscheint deshalb beim ersten Besuch von selbst, vorher tat es das nicht. „Alles
erlauben" und „Nur notwendige" sind gleich groß und stehen nebeneinander, geprüft:
beide 282 mal 50 Pixel auf derselben Höhe.

**Am 16.09.2026 im echten Browser gegen den echten Wistia-Player gemessen:** Der
Player wird sauber geladen, das Custom Element `wistia-player` wird definiert, das
Video steckt danach im Shadow DOM, Seitenverhältnis 16:9. Dabei werden diese Hosts
angesprochen: `fast.wistia.com`, `fast.wistia.net`, `embed-cloudfront.wistia.com`
(Auslieferung), `distillery.wistia.com` und `pipedream.wistia.com`
(Reichweitenmessung) sowie `browser.sentry-cdn.com` (Fehlerprotokoll, Functional
Software Inc., USA). **Cookies setzt Wistia nicht**, wohl aber zwei Einträge im
lokalen Speicher: `wistia` und `wistia-video-progress-2afxdzjr6q`.

All das steht jetzt in Abschnitt 8 der Datenschutzerklärung und im Einwilligungs-
fenster unter „1 Dienst anzeigen". **Dort fehlt noch** die Grundlage der Übermittlung
in die USA und der Link auf die Datenschutzerklärung von Wistia, gelb markiert.

**Empfehlung an CODE FINANCE:** Die Reichweitenmessung von Wistia ist standardmäßig
an. Sie lässt sich im Wistia-Konto pro Video abschalten. Wird sie abgeschaltet,
fallen `distillery` und `pipedream` weg, und die Datenschutzerklärung wird um genau
diesen Punkt kürzer. Für einen reinen Imagefilm ohne Auswertung ist das der sauberere
Weg.

**Laufzeit:** Die Fassung bei Wistia ist 1:08 lang, unsere lokale Fassung 1:07. Auf
der Seite steht jetzt 1:08, weil abgespielt wird, was bei Wistia liegt.

**Auch die beiden Kundenstimmen laufen seit dem 16.09.2026 über Wistia:**

| Film | Media-ID | Laufzeit |
|---|---|---|
| Imagefilm | `2afxdzjr6q` | 1:08 |
| Marc Müller | `1db6hu97jd` | 1:24 |
| Pascal Solinger | `671qizccs2` | 1:08 |

Jede der drei Videoflächen hat ihre eigene Einwilligungsfrage. Wer einmal zustimmt,
bekommt sie bei den anderen beiden nicht noch einmal, der Player lädt dann sofort.
Das Basisskript `player.js` wird nur ein einziges Mal nachgeladen, je Film kommt
`embed/<Media-ID>.js` dazu.

Die lokalen MP4-Dateien bleiben als Rückfall liegen. Wer Wistia später nicht mehr
will, tauscht die Attribute zurück und streicht die Kategorie „Videos".

### 2h. Unterseite Servicepakete

Neu am 16.09.2026. Grundlage sind die beiden PDFs von CODE FINANCE, abgelegt unter
`00_projekt/quellen/`: „Servicepakete im Überblick" und die Leistungsbeschreibung,
Anlage 1 zum Dienstleistungsvertrag. Die Seite gibt deren Inhalt wieder, in Sprache
für Endverbraucher, ohne Zahlen zu verändern.

**Aufbau, Stand 17.09.2026 nach dem Umbau:** Hero, Kurzantwort in 30 Sekunden,
**Vergütung** (Bestandscourtage gegen Servicepauschale), **drei Alltagsszenen**,
drei Preiskarten, die **eingeklappte** Leistungstabelle mit 20 Zeilen, Einordnung für
drei Zielgruppen, Grenzen der Pakete, zehn Fragen, Kontaktabschluss.

Warum diese Reihenfolge: Der erste Gedanke eines Besuchers ist nicht „welches Paket
nehme ich", sondern „wieso soll ich zahlen, ich dachte das läuft über die Provision".
Deshalb steht die Vergütung vor den Preisen. Die drei Alltagsszenen (Zahnarztrechnung,
Wasserschaden, Jahreswechsel) machen den Unterschied zwischen den Stufen greifbar,
bevor Zahlen fallen. Die Tabelle mit 20 Servicebereichen ist ein Nachschlagewerk und
liegt deshalb eingeklappt unter „Alle 20 Servicebereiche im Detail ansehen".

Die Bilder der drei Szenen sind Standbilder aus dem Imagefilm, Sekunde 24,5, 36,5 und
48,5, jeweils oberhalb der eingebrannten Untertitel geschnitten, 900 mal 600, WebP und
JPG. Wenn echte Fotos nachkommen, unter denselben Dateinamen austauschen.

Der Weiterempfehlungsbonus steht nicht mehr in der Tabelle, er ist keine
Betreuungsleistung. Er steht als Satz darunter, weiterhin gelb markiert.

**SEO und GEO:** Alle Zwischenüberschriften sind Fragen, und unter jeder steht eine
Kurzantwort in einem Satz, die auch ohne Kontext zitierbar ist. Strukturierte Daten:
`Service` mit `OfferCatalog` und drei `Offer` (0 €, 180 €, 600 €), dazu `FAQPage`,
`BreadcrumbList` und `WebPage`. Sichtbare Brotkrumen über dem Titel. Die Seite ist in
Hauptmenü, Fußzeile, `sitemap.xml` und als eigener Block auf der Startseite verlinkt.

**Preise auf der Seite:** Basis kostenfrei, Plus 180 € im Jahr (Haushaltstarif 250 €),
Premium 600 € im Jahr, alle inklusive Mehrwertsteuer. Premium ist laut PDF auf 50
Mandate begrenzt, das steht so auch auf der Seite. **Wenn die Zahl erreicht ist oder
sich ändert, muss sie auf der Seite mitgeführt werden**, sonst ist es eine unzutreffende
Verknappung.

**Gelb markiert und vor dem Livegang zu klären:** der Weiterempfehlungsbonus von 50,
150 und 300 €. Eine Geldzahlung an Versicherungsnehmer kann als Sondervergütung im
Sinne von § 48b VAG gewertet werden. Das PDF nennt den Bonus, deshalb steht er auf der
Seite, aber er gehört anwaltlich geprüft, bevor die Seite live geht. Falls er nicht
öffentlich stehen soll, ist es eine Tabellenzeile und ein Satz darunter, beide gelb
markiert und leicht zu entfernen.

**Nicht übernommen:** nichts. Beide PDFs sind Kundenunterlagen und enthalten keine
internen Konditionen oder Provisionssätze.

### 3. Formular verschickt nichts

Alle Formulare prüfen die Pflichtfelder und zeigen dann die Danke-Ansicht. Es geht
keine Nachricht raus. Anzubinden sind zwei Stellen:

- Startseite: `form.anfrage`, Logik in `assets/skript.js`, Abschnitt 3
- PKV-Seite: `form.lead-form`, Logik im Skript am Ende von `pkv-oder-gkv.html`

Sobald der Endpunkt steht (Formulardienst, CRM-Webhook oder WordPress-Plugin), gehört
der Anbieter mit Zweck und Speicherdauer in die Datenschutzerklärung, Abschnitt 4.

### 4. Rechtsseiten: gelbe Lücken schließen

Gelb markiert sind: Registernummer der GmbH im Vermittlerregister, zuständige
Erlaubnisbehörde, Angabe zu Beteiligungen über 10 Prozent, Bereitschaft zur
Verbraucherschlichtung, Bildnachweis, Datenschutzbeauftragter, Hoster mit Anschrift
und die Speicherdauer der Server-Logfiles.

### 5. Kundenstimmen

Die zwei Zitate auf der Startseite sind als Platzhalter markiert. Der Wortlaut liegt
im bestehenden WordPress und wird von dort übernommen, sobald CODE FINANCE bestätigt,
dass die Kunden mit der Nennung einverstanden sind.

### 6. Erklärvideo

Die alte PKV-Datei enthielt einen Knopf für ein Erklärvideo, die Videodatei lag aber
nicht bei. Der Knopf wurde entfernt. Sobald `pkv-erklaervideo.mp4` und ein Vorschaubild
vorliegen, lässt er sich wieder einbauen. Video lokal ausliefern, nicht über YouTube,
sonst braucht die Seite ein Einwilligungsbanner.

### 7. Zahlen mit Stand 2026

Die PKV-Seite nennt Rechengrößen für 2026: Versicherungspflichtgrenze 77.400 € im Jahr,
Beitragsbemessungsgrenze 5.812,50 € im Monat, Beitragssatz 14,6 % plus 2,9 %
durchschnittlicher Zusatzbeitrag. Diese Werte ändern sich jährlich. Sie stehen im HTML
und zusätzlich im Skript des Orientierungs-Checks. Bei Bekanntgabe der Rechengrößen für
2027 beide Stellen anpassen und den Stand im Text mitziehen.

### 8. Domain und Adressen

`canonical`, `og:url` und `sitemap.xml` zeigen auf `https://codefinance.de/`. Für eine
Vorschau unter `codefinance.vorschau.ao-consult.de` müssen die Adressen angepasst und
die Vorschau auf `noindex` gestellt werden.

## Entscheidungen und warum

**Einwilligungsbanner nur wegen des Videos.** Seit der Imagefilm über Wistia läuft,
gibt es neben der Pflichtkategorie die Kategorie „Videos“, und das Fenster öffnet sich
beim ersten Aufruf. Vorher war es aus, weil kein einwilligungspflichtiger Dienst
eingebunden war. Eine leere Kategorie „Marketing“ aufzuführen, obwohl nichts eingesetzt
wird, wäre irreführend, deshalb steht dort weiterhin nur, was tatsächlich lädt. Weitere
Dienste kommen in `window.AO_EINWILLIGUNG` als eigene Kategorie dazu.

**Die beiden Knöpfe sind gleich groß und gleich gut erreichbar.** „Alles erlauben“ und
„Nur notwendige“ stehen nebeneinander, jeweils 50 Pixel hoch, gleiche Breite, gleiche
Höhe im Fenster. Hervorgehoben ist die Empfehlung nur farblich. Ein kleiner oder grauer
Ablehnen-Knopf wäre ein Dark Pattern und nach DSGVO angreifbar.

**Banner und Barrierefreiheits-Hilfe tragen die CI von CODE FINANCE.** Beide Bausteine
kommen aus dem Hausstandard von AO Consulting und bringen dessen Farben mit, Marine und
Koralle. Sie blieben unverändert, damit spätere Korrekturen am Hausstandard weiter
übernommen werden können. Umgefärbt wird in `assets/ci-bausteine.css`, die als letzte
Datei eingebunden wird: Marine wird zu Tinte `#27252A`, Koralle zu Gold `#BF9B30`, die
Knöpfe bekommen 5 Pixel Radius und den Goldverlauf der übrigen Buttons.

**Schriften lokal.** Montserrat kommt aus `fonts/`, nicht von Google. Damit deckt die
Technik die Zusage der Datenschutzerklärung, und es wird keine IP-Adresse an Google
übertragen.

**Keine Pixelgrößen an `body` und Buttons.** Sonst greift die Schriftskalierung des
Barrierefreiheits-Widgets nicht durch.

**PKV-Seite als Unterseite.** Sie nutzt jetzt denselben Kopf, dieselbe Fußzeile und
dieselben Grundstile wie die Startseite. Ihre Sonderbausteine (Vergleichstabelle,
Irrtümer, Orientierungs-Check, Entscheidungsbaum, Diagramme) liegen in
`assets/pkv-oder-gkv.css`.

**Keine erfundenen Zahlen.** Kundenzahlen, Erfahrungsjahre und Bewertungen stehen
weder im Text noch in den strukturierten Daten, weil dafür kein Beleg vorliegt.
`aggregateRating` ist bewusst nicht ausgezeichnet.

## Geprüft am 15.09.2026

Automatisiert über HTTP mit Chromium, alle vier Seiten:

- genau eine `h1` je Seite, lückenlose Überschriftenstruktur
- keine Konsolenfehler, keine JavaScript-Fehler
- **keine einzige Anfrage an einen fremden Host**
- keine defekten Bilder, kein fehlender Alt-Text, kein toter Link
- JSON-LD parst, FAQ-Text und FAQ-Markup sind deckungsgleich
- kein waagerechtes Scrollen bei 1920, 1512, 1440, 1280, 1024, 768 und 390 px
- Burger-Menü, Formularprüfung, FAQ, Irrtümer-Kacheln und Orientierungs-Check
  funktionieren, Einwilligungsfenster öffnet über die Fußzeile

Offen und vor dem Livegang nachzuholen: Screenreader-Test, Kontrastmessung und ein
Blick auf alle Hover-Zustände im echten Browser.

## Hinweis zum Öffnen per Doppelklick

Beim Öffnen über `file://` meldet der Browser einen CORS-Fehler für die vorgeladenen
Schriften. Das ist eine Eigenart des Protokolls. Über HTTP tritt er nicht auf. Zum
Ansehen im Projektordner genügt `python3 -m http.server`.
