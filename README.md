# code-finance-website

Kundenwebseite der **Code Finance** (Karlsruhe). Betreut von AO Consulting GmbH.
Entwurf und Inhalte: Ovidiu Rieger.

## Aufbau

| Ordner | Inhalt |
|---|---|
| `website/` | **Die Seite. Nur was hier liegt, geht online.** |
| `doku/` | Unterlagen zum Projekt, geht nicht online |
| `.github/workflows/` | Die zwei Abläufe: Vorschau und Livegang |

## Die zwei Zustände

- **Zweig `main`** → Vorschau unter <https://code-finance.vorschau.ao-consult.de>.
  Suchmaschinen sind dort ausgesperrt (`noindex` wird beim Bauen eingesetzt).
  Jede Änderung ist nach ein bis zwei Minuten zu sehen.
- **Zweig `live`** → die echte Seite beim Hoster. Dorthin kommt nur, was jemand
  bewusst freigibt. **Nichts geht ohne Freigabe live.**

## Regeln

- Keine Schriften, Skripte oder Karten von fremden Servern ohne Freigabe.
  Die Schriftart Montserrat liegt im Paket (`website/fonts/`).
- Die Filme laufen über **Wistia** und werden erst nach Zustimmung im
  Einwilligungsfenster geladen. Das ist Absicht und muss so bleiben.
- Impressum und Datenschutz nur nach Rücksprache mit dem Kunden ändern.
- Zugangsdaten nur in den Passwort-Manager und in GitHub-Secrets.

## Vor dem Livegang zu erledigen

- [ ] **Kontaktformular scharf schalten.** Die drei Formulare haben noch
      `action=""`, verschicken also nichts. Empfängeradresse mit dem Kunden
      abstimmen, PHP-Versand und Honeypot einbauen, danach gemeinsam testen.
- [ ] **Videodatei.** `website/video/` ist leer. Das `<video>`-Element auf der
      Startseite braucht entweder eine Datei oder muss raus.
- [ ] **Logo.** `img/codefinance-logo-platzhalter.svg` ist ein Platzhalter.
      Vom Kunden das Original anfordern.
- [ ] **Impressum und Datenschutz** vom Kunden freigeben lassen. Bei einem
      Versicherungsmakler gehören Registernummer, Aufsicht, Statusbezeichnung
      und Schlichtungsstellen geprüft.
- [ ] **Wistia-Eintrag** im Data Privacy Framework gegenprüfen
      (Hinweis steht in `website/datenschutz.html`).
- [ ] **Domain** `codefinance.de` überall eintragen (canonical, robots.txt,
      sitemap.xml sind schon darauf ausgelegt), Hoster-Zugang klären.
- [ ] **Messung**, falls gewünscht: Google Analytics und Search Console nach
      demselben Muster wie bei den anderen Projekten (`ao-konfiguration.js`).
