/* ============================================================================
   CODE FINANCE, Hauptskript
   Jeder Block prueft zuerst, ob sein Element existiert. So wirft eine
   Unterseite ohne Navigation oder ohne Formular keinen Fehler.

   Inhalt: 1 Burger-Menue . 2 Aktiver Menuepunkt . 3 Formular . 5 Videos . 6 Jahreszahl
   ============================================================================ */
(function () {
  'use strict';

  /* ===== 1 Burger-Menue ================================================= */
  var burger = document.querySelector('.burger');
  var navi = document.getElementById('hauptnavigation');

  function naviSchliessen() {
    if (!navi || !burger) return;
    navi.setAttribute('data-offen', 'false');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && navi) {
    burger.addEventListener('click', function () {
      var offen = burger.getAttribute('aria-expanded') === 'true';
      navi.setAttribute('data-offen', offen ? 'false' : 'true');
      burger.setAttribute('aria-expanded', offen ? 'false' : 'true');
    });

    navi.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', naviSchliessen);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        naviSchliessen();
        burger.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024) naviSchliessen();
    });
  }

  /* ===== 2 Aktiver Menuepunkt beim Scrollen ============================= */
  var abschnitte = document.querySelectorAll('main section[id]');
  var menuelinks = navi ? navi.querySelectorAll('a[href^="#"]') : [];

  if (abschnitte.length && menuelinks.length && 'IntersectionObserver' in window) {
    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (eintrag) {
        if (!eintrag.isIntersecting) return;
        menuelinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + eintrag.target.id) {
            a.setAttribute('aria-current', 'true');
          } else {
            a.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    abschnitte.forEach(function (s) { beobachter.observe(s); });
  }

  /* ===== 3 Formular ====================================================
     Der Entwurf verschickt nichts. Pflichtfelder werden geprueft, danach
     erscheint die Danke-Ansicht. Beim Einbau wird unten der echte Endpunkt
     gesetzt, siehe LIESMICH.md, Abschnitt "Formular anbinden".
     ==================================================================== */
  var formular = document.querySelector('form.anfrage');

  if (formular) {
    var danke = document.querySelector('.danke');

    formular.addEventListener('submit', function (e) {
      e.preventDefault();
      var fehlerhaft = null;

      formular.querySelectorAll('[required]').forEach(function (feld) {
        var gruppe = feld.closest('.feld') || feld.closest('.einwilligung-feld');
        var leer = feld.type === 'checkbox' ? !feld.checked : !feld.value.trim();
        var email = feld.type === 'email' && feld.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(feld.value.trim());

        if (gruppe) gruppe.classList.toggle('ungueltig', leer || email);
        if ((leer || email) && !fehlerhaft) fehlerhaft = feld;
      });

      if (fehlerhaft) {
        fehlerhaft.focus();
        return;
      }

      if (danke) {
        formular.setAttribute('hidden', 'hidden');
        danke.classList.add('sichtbar');
        danke.setAttribute('tabindex', '-1');
        danke.focus();
      }
    });

    formular.querySelectorAll('input,select,textarea').forEach(function (feld) {
      feld.addEventListener('input', function () {
        var gruppe = feld.closest('.feld') || feld.closest('.einwilligung-feld');
        if (gruppe) gruppe.classList.remove('ungueltig');
      });
    });
  }


  /* ===== 5 Videos =======================================================
     Erst der Klick laedt das Video. Vorher steht nur ein Vorschaubild auf
     der Seite, es geht keine Anfrage an den Server. Auf schmalen Schirmen
     wird die Hochformat-Fassung genommen, sofern vorhanden. */
  var kasten = document.querySelector('.videokasten');

  if (kasten) {
    var spieler = kasten.querySelector('video');
    var zuKnopf = kasten.querySelector('.zu');
    var vorher = null;

    function videoZu() {
      kasten.setAttribute('data-offen', 'false');
      kasten.classList.remove('hoch');
      spieler.pause();
      spieler.removeAttribute('src');
      spieler.load();
      document.body.style.overflow = '';
      if (vorher) vorher.focus();
    }

    /* Wistia laedt erst nach Einwilligung. Vorher steht nur unser eigenes
       Standbild auf der Seite, es geht keine Anfrage an fast.wistia.com. */
    function wistiaLaden(flaeche, kennung, seitenverhaeltnis) {
      if (flaeche.dataset.geladen) return;
      flaeche.dataset.geladen = '1';
      if (!document.querySelector('script[data-wistia-basis]')) {
        var basis = document.createElement('script');
        basis.src = 'https://fast.wistia.com/player.js';
        basis.async = true;
        basis.setAttribute('data-wistia-basis', '1');
        document.head.appendChild(basis);
      }
      var medium = document.createElement('script');
      medium.src = 'https://fast.wistia.com/embed/' + kennung + '.js';
      medium.async = true;
      medium.type = 'module';
      document.head.appendChild(medium);

      var spieler = document.createElement('wistia-player');
      spieler.setAttribute('media-id', kennung);
      spieler.setAttribute('aspect', seitenverhaeltnis || '1.7777777777777777');
      flaeche.innerHTML = '';
      flaeche.appendChild(spieler);
      flaeche.classList.add('wistia-aktiv');
    }

    function wistiaKlick(knopf) {
      var flaeche = knopf.closest('.videoflaeche');
      var kennung = knopf.getAttribute('data-wistia');
      var verhaeltnis = knopf.getAttribute('data-aspect');
      var api = window.aoEinwilligung;

      if (api && api.erlaubt('videos')) {
        wistiaLaden(flaeche, kennung, verhaeltnis);
        return;
      }
      var frage = flaeche.querySelector('.videoeinwilligung');
      if (frage) { frage.hidden = false; frage.querySelector('button').focus(); return; }
      if (api) api.oeffnen();
    }

    document.querySelectorAll('.videoeinwilligung button').forEach(function (b) {
      b.addEventListener('click', function () {
        var flaeche = b.closest('.videoflaeche');
        var knopf = flaeche.querySelector('.abspielen');
        if (window.aoEinwilligung) window.aoEinwilligung.setze('videos', true);
        wistiaLaden(flaeche, knopf.getAttribute('data-wistia'), knopf.getAttribute('data-aspect'));
      });
    });

    function videoAuf(knopf) {
      if (knopf.getAttribute('data-wistia')) { wistiaKlick(knopf); return; }
      if (!knopf.getAttribute('data-quer')) return;   // z. B. in der Einzeldatei-Vorschau
      var schmal = window.matchMedia('(max-width: 620px)').matches;
      var hoch = knopf.getAttribute('data-hoch');
      var quelle = (schmal && hoch) ? hoch : knopf.getAttribute('data-quer');
      vorher = knopf;
      spieler.setAttribute('src', quelle);
      kasten.classList.toggle('hoch', schmal && !!hoch);
      kasten.setAttribute('data-offen', 'true');
      document.body.style.overflow = 'hidden';
      spieler.play().catch(function () {});
      zuKnopf.focus();
    }

    document.querySelectorAll('.abspielen').forEach(function (k) {
      k.addEventListener('click', function () { videoAuf(k); });
    });
    zuKnopf.addEventListener('click', videoZu);
    kasten.addEventListener('click', function (e) { if (e.target === kasten) videoZu(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && kasten.getAttribute('data-offen') === 'true') videoZu();
      if (e.key === 'Tab' && kasten.getAttribute('data-offen') === 'true') {
        e.preventDefault(); zuKnopf.focus();
      }
    });
  }

  /* ===== 6 Jahreszahl im Fuss =========================================== */
  var jahr = document.querySelector('[data-jahr]');
  if (jahr) jahr.textContent = String(new Date().getFullYear());
})();
