/* ============================================================================
   KENNWERTE PKV ODER GKV
   Die einzige Stelle, an der die jährlichen Rechengrößen gepflegt werden.

   SO WIRD AKTUALISIERT
   1. Unten im Block KENNWERTE einen neuen Jahresblock anlegen (den letzten
      kopieren) und die Zahlen eintragen. Nur Zahlen, Komma als Punkt:
      14,6 Prozent wird 14.6, 77.400 Euro wird 77400.
   2. Speichern und hochladen. Fertig. Texte, Tabelle, Kacheln, Diagramm
      und Orientierungs-Check auf der Seite ziehen die Werte von selbst.

   WANN WELCHES JAHR GILT
   Die Seite zeigt automatisch den neuesten Jahresblock, dessen Jahr schon
   begonnen hat UND in dem alle Werte ausgefüllt sind. Ein Block für 2027
   wird also erst ab dem 01.01.2027 angezeigt, und nur, wenn kein Feld mehr
   auf null steht. Bis dahin bleibt sichtbar, was gerade gilt.

   VORSCHAU EINES JAHRES
   An die Adresse ?kennwerte=2027 anhängen, dann wird dieser Block sofort
   angezeigt (fehlende Werte erscheinen als "offen"). Nur zum Prüfen.

   Die Zahlen, die im HTML stehen, sind der Stand 2026 und dienen als
   Rückfall, falls JavaScript ausgeschaltet ist.
   ============================================================================ */

var KENNWERTE = [
  {
    jahr: 2026,
    versicherungspflichtgrenze: 77400,      // Euro pro Jahr, § 6 Abs. 6 SGB V (Jahresarbeitsentgeltgrenze)
    beitragsbemessungsgrenze: 69750,        // Euro pro Jahr, Kranken- und Pflegeversicherung
    allgemeinerBeitragssatz: 14.6,          // Prozent, § 241 SGB V
    durchschnittlicherZusatzbeitrag: 2.9,   // Prozent, Bekanntmachung des BMG
    quelleRechengroessen: "Sozialversicherungsrechengrößen-Verordnung 2026"
  },
  {
    jahr: 2027,
    versicherungspflichtgrenze: 84150,      // Referentenentwurf BMAS, Sept. 2026. Nach Bundesrat prüfen.
    beitragsbemessungsgrenze: 76500,        // Referentenentwurf BMAS, Sept. 2026. Nach Bundesrat prüfen.
    allgemeinerBeitragssatz: 14.6,
    durchschnittlicherZusatzbeitrag: null,  // OFFEN: gibt das BMG bis 01.11.2026 bekannt, dann eintragen
    quelleRechengroessen: "Sozialversicherungsrechengrößen-Verordnung 2027"
  }
];

/* ===== Ab hier nichts ändern ============================================= */
(function () {
  var PFLICHT = ['versicherungspflichtgrenze', 'beitragsbemessungsgrenze', 'allgemeinerBeitragssatz', 'durchschnittlicherZusatzbeitrag'];
  var vollstaendig = function (k) { return PFLICHT.every(function (f) { return typeof k[f] === 'number'; }); };

  var heute = new Date();
  var wunsch = (location.search.match(/[?&]kennwerte=(\d{4})/) || [])[1];
  var k = null;
  if (wunsch) {
    k = KENNWERTE.filter(function (x) { return x.jahr === +wunsch; })[0] || null;
  }
  if (!k) {
    KENNWERTE.forEach(function (x) {
      if (x.jahr <= heute.getFullYear() && vollstaendig(x) && (!k || x.jahr > k.jahr)) k = x;
    });
  }
  if (!k) return;

  var hat = function (f) { return typeof k[f] === 'number'; };
  var zahl = function (n, nachkomma) {
    return n.toLocaleString('de-DE', { minimumFractionDigits: nachkomma, maximumFractionDigits: nachkomma });
  };
  var euro = function (n) { return zahl(n, n % 1 ? 2 : 0) + ' €'; };
  var prozent = function (n) { return zahl(n, 1) + ' %'; };

  var gesamt = hat('durchschnittlicherZusatzbeitrag') ? k.allgemeinerBeitragssatz + k.durchschnittlicherZusatzbeitrag : null;
  var bbgMonat = k.beitragsbemessungsgrenze / 12;
  var anHoechst = gesamt !== null ? Math.round(bbgMonat * gesamt / 200) : null;

  var W = {
    jahr: String(k.jahr),
    jaeg: euro(k.versicherungspflichtgrenze),
    jaegMonat: euro(k.versicherungspflichtgrenze / 12),
    bbg: euro(k.beitragsbemessungsgrenze),
    bbgMonat: euro(bbgMonat),
    satz: prozent(k.allgemeinerBeitragssatz),
    zusatz: hat('durchschnittlicherZusatzbeitrag') ? prozent(k.durchschnittlicherZusatzbeitrag) : 'offen',
    gesamt: gesamt !== null ? prozent(gesamt) : 'offen',
    anHoechst: anHoechst !== null ? euro(anHoechst) : 'offen',
    quelle: k.quelleRechengroessen
  };

  /* Für den Orientierungs-Check */
  window.KW = {
    jahr: k.jahr, jaeg: k.versicherungspflichtgrenze, bbgMonat: bbgMonat,
    satz: gesamt !== null ? gesamt / 100 : null, text: W
  };

  /* Texte */
  document.querySelectorAll('[data-kw]').forEach(function (el) {
    var w = W[el.getAttribute('data-kw')];
    if (w !== undefined) el.textContent = w;
  });
  document.title = document.title.replace(/\b20\d\d\b/, W.jahr);

  /* Diagramm: GKV-Arbeitnehmeranteil nach Einkommen */
  var svg = document.querySelector('svg[data-kw-diagramm]');
  if (!svg || gesamt === null) return;
  var X0 = 30000, X1 = 110000, xL = 60, xR = 870, yB = 330, yT = 40;
  var x = function (v) { return xL + (v - X0) * (xR - xL) / (X1 - X0); };
  var obenEuro = Math.max(600, Math.ceil((anHoechst + 80) / 100) * 100);
  var y = function (e) { return yB - e * (yB - yT) / obenEuro; };
  var r = function (n) { return Math.round(n * 10) / 10; };
  var anteil = function (jahresbrutto) { return Math.min(jahresbrutto / 12, bbgMonat) * gesamt / 200; };
  var xB = r(x(k.beitragsbemessungsgrenze)), xJ = r(x(k.versicherungspflichtgrenze)), yD = r(y(anteil(k.beitragsbemessungsgrenze)));
  var tausender = function (n) { return zahl(n, 0) + ' €'; };

  var gitter = '', achse = '';
  for (var e = 100; e < obenEuro; e += 100) {
    gitter += '<line x1="60" y1="' + r(y(e)) + '" x2="870" y2="' + r(y(e)) + '"/>';
    achse += '<text x="52" y="' + r(y(e) + 4) + '" text-anchor="end">' + e + ' €</text>';
  }
  svg.setAttribute('aria-label', 'Diagramm: GKV-Arbeitnehmeranteil steigt mit dem Bruttojahreseinkommen bis zur Beitragsbemessungsgrenze von ' +
    tausender(k.beitragsbemessungsgrenze).replace(' €', ' Euro') + ' und ist dort bei rund ' + anHoechst + ' Euro pro Monat gedeckelt. Ab ' +
    tausender(k.versicherungspflichtgrenze).replace(' €', ' Euro') + ' Jahreseinkommen ist der Wechsel in die PKV möglich.');
  svg.innerHTML =
    '<rect x="' + xJ + '" y="40" width="' + r(870 - xJ) + '" height="290" fill="#F7F1DF"/>' +
    '<text x="' + r((xJ + 870) / 2) + '" y="314" text-anchor="middle" font-size="13" font-weight="700" fill="#A8871F">PKV-Wechsel möglich</text>' +
    '<g stroke="#E8E4DA" stroke-width="1">' + gitter + '</g>' +
    '<g font-size="12" fill="#4F4C55">' + achse + '</g>' +
    '<line x1="60" y1="330" x2="880" y2="330" stroke="#27252A" stroke-width="1.5"/>' +
    '<line x1="60" y1="40" x2="60" y2="330" stroke="#27252A" stroke-width="1.5"/>' +
    '<line x1="' + xB + '" y1="' + r(yD - 2) + '" x2="' + xB + '" y2="330" stroke="#27252A" stroke-width="1.5" stroke-dasharray="5 5"/>' +
    '<line x1="' + xJ + '" y1="40" x2="' + xJ + '" y2="330" stroke="#BF9B30" stroke-width="1.5" stroke-dasharray="5 5"/>' +
    '<path d="M60,' + r(y(anteil(X0))) + ' L' + xB + ',' + yD + ' H870" fill="none" stroke="#BF9B30" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>' +
    '<circle cx="' + xB + '" cy="' + yD + '" r="6" fill="#BF9B30"/>' +
    '<text x="' + r(xB - 22) + '" y="' + r(yD + 85) + '" text-anchor="end" font-size="13" font-weight="700" fill="#27252A">Deckel: ≈ ' + anHoechst + ' €/Monat</text>' +
    '<text x="' + r(xB - 22) + '" y="' + r(yD + 102) + '" text-anchor="end" font-size="12" fill="#4F4C55">Beitragsbemessungsgrenze ' + tausender(k.beitragsbemessungsgrenze) + '</text>' +
    '<text x="' + r(xJ + 8) + '" y="352" font-size="12" font-weight="700" fill="#A8871F">JAEG ' + tausender(k.versicherungspflichtgrenze) + '</text>' +
    '<g font-size="12" fill="#4F4C55">' +
      '<text x="60" y="352" text-anchor="middle">30.000 €</text>' +
      '<text x="' + r(x(50000)) + '" y="352" text-anchor="middle">50.000 €</text>' +
      '<text x="870" y="352" text-anchor="end">110.000 €</text>' +
      '<text x="465" y="382" text-anchor="middle">Bruttojahreseinkommen</text>' +
      '<text x="20" y="30" font-size="12" fill="#4F4C55">GKV-Arbeitnehmeranteil / Monat</text>' +
    '</g>';
})();
