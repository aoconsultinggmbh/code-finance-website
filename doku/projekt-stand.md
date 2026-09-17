# Code Finance — Projektstand

**Kunde:** Code Finance, Karlsruhe
**Entwurf und Inhalte:** Ovidiu Rieger
**Übernahme nach GitHub:** 17.09.2026

## Was übernommen wurde

Der Ordner `Projekt-Code-Finance/website` aus OneDrive, unverändert. Fünf Seiten:
Startseite, Servicepakete, PKV oder GKV, Impressum, Datenschutz. Dazu Schriften
(Montserrat, lokal), 45 Bilder, die Bausteine für Barrierefreiheit und
Einwilligung.

Nicht übernommen: `entwuerfe/`, `vorschau/`, `_ALT-KANN-WEG/`, `99_archiv/`,
`00_projekt/` und die Originaldateien für Bilder und Video. Die bleiben in
OneDrive, das GitHub-Projekt enthält nur die Seite selbst und diese Unterlagen.
`website/LIESMICH.md` wurde nach `doku/LIESMICH-entwurf-ovi.md` verschoben,
damit sie nicht mit veröffentlicht wird.

## Geprüft beim Übernehmen

- **Fremde Server:** Nur Wistia für die Filme, und die laden erst nach
  Zustimmung. Schriften liegen lokal. Keine Zählprogramme, keine Karten.
- **Alle verlinkten Dateien vorhanden**, keine kaputten Pfade.
- **Formulare:** drei Stück, alle mit `action=""` — verschicken noch nichts.
- **`website/video/` ist leer**, die Startseite enthält aber ein
  `<video>`-Element.
- **Robots:** `index, follow` in den Seiten und `Allow: /` in der robots.txt.
  Für die Vorschau setzt der Ablauf `noindex` automatisch ein; für den Livegang
  ist es bereits richtig.

## Offen

Siehe Liste in der `README.md`.
