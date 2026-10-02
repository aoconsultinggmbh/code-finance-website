/* ---------------------------------------------------------------------------
   Besucherzaehlung mit Matomo - cookiefrei.

   Es wird nichts auf dem Geraet des Besuchers gespeichert oder ausgelesen:
   keine Cookies, kein Browser-Speicher. Die IP-Adresse wird gekuerzt, bevor
   sie gespeichert wird, und "Do Not Track" wird respektiert. Ausgewertet wird
   auf einem eigenen Server in Deutschland (All-Inkl), es gehen keine Daten an
   Google, Meta oder in die USA. Deshalb kein Einwilligungsfenster noetig.

   Gezaehlt wird NUR auf der echten Domain, nicht auf der Vorschau.
   Auswertung: AO Consulting GmbH, statistik.ao-consult.de
   --------------------------------------------------------------------------- */
(function () {
  'use strict';

  var host = location.hostname.replace(/^www\./, '');
  if (host !== 'codefinance.de') return;

  var adresse = 'https://statistik.ao-consult.de/';
  var seite   = '3';     // Kennung dieser Webseite in Matomo

  var _paq = (window._paq = window._paq || []);
  _paq.push(['disableCookies']);
  _paq.push(['setDoNotTrack', true]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  _paq.push(['setTrackerUrl', adresse + 'matomo.php']);
  _paq.push(['setSiteId', seite]);

  var d = document,
      neu = d.createElement('script'),
      erstes = d.getElementsByTagName('script')[0];
  neu.async = true;
  neu.src = adresse + 'matomo.js';
  erstes.parentNode.insertBefore(neu, erstes);
})();
