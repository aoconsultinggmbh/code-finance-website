<?php
/* ============================================================================
   CODE FINANCE, Formularversand
   Nimmt die Anfragen aller drei Formulare entgegen (Startseite, PKV oder GKV,
   Servicepakete) und schickt sie als E-Mail an das Postfach. Speichert nichts.
   Laeuft nur auf dem echten Hoster, nicht auf der Vorschau.
   Empfaenger und Absender stehen unten als Konstanten.
   ========================================================================= */

const EMPFAENGER   = 'tofik@ao-consult.de';   // TEST 02.10.2026, danach zurueck auf info@codefinance.de
const ABSENDER     = 'info@codefinance.de';   // echte Adresse auf derselben Domain, sonst Spam
const DANKE_SEITE  = 'danke.html';

/* Welche Formulare es gibt, wohin bei einem Fehler zurueck, welche Felder Pflicht sind. */
const FORMULARE = [
    'kontakt'      => ['titel' => 'Kontaktformular Startseite', 'zurueck' => 'index.html#kontakt',
                       'pflicht' => ['vorname', 'nachname', 'thema']],
    'pkv-vergleich'=> ['titel' => 'PKV oder GKV, kostenlose Analyse', 'zurueck' => 'pkv-oder-gkv.html#kontakt',
                       'pflicht' => ['name', 'telefon', 'situation']],
    'servicepaket' => ['titel' => 'Servicepakete, Anfrage', 'zurueck' => 'servicepakete.html#kontakt',
                       'pflicht' => ['name', 'telefon', 'paket']],
];

function feld($name) {
    $wert = isset($_POST[$name]) ? (string) $_POST[$name] : '';
    $wert = trim($wert);
    return mb_substr($wert, 0, 5000);
}

function kopfzeilensicher($wert) {
    return str_replace(["\r", "\n", "%0a", "%0d"], ' ', $wert);
}

function abbruch($ziel) {
    header('Location: ' . $ziel, true, 303);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Dieses Skript nimmt nur Formular-Anfragen an.');
}

$art = feld('formular');
if (!isset(FORMULARE[$art])) {
    $art = 'kontakt';   // aeltere Fassung des Startseiten-Formulars ohne Kennung
}
$form = FORMULARE[$art];

/* Honigtopf: ein Feld, das kein Mensch sieht. Ist es gefuellt, war es ein Bot.
   Wir antworten trotzdem freundlich, damit der Bot nichts lernt. */
if (feld('webseite') !== '') {
    abbruch(DANKE_SEITE);
}

/* Zeitfalle: wer das Formular in unter drei Sekunden ausfuellt, tippt nicht. */
$start = (int) feld('gestartet');
if ($start > 0 && (time() - $start) < 3) {
    abbruch(DANKE_SEITE);
}

/* Pflichtfelder pruefen (zum dritten Mal, nach Browser und Skript). */
$email = feld('email');
if (feld('datenschutz') === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    abbruch($form['zurueck']);
}
foreach ($form['pflicht'] as $p) {
    if (feld($p) === '') {
        abbruch($form['zurueck']);
    }
}

$name      = $art === 'kontakt' ? trim(feld('vorname') . ' ' . feld('nachname')) : feld('name');
$telefon   = feld('telefon');
$nachricht = feld('nachricht');

$zeilen = [
    'Formular:  ' . $form['titel'],
    'Name:      ' . $name,
    'E-Mail:    ' . $email,
    'Telefon:   ' . ($telefon !== '' ? $telefon : 'nicht angegeben'),
];
if ($art === 'kontakt')       { $zeilen[] = 'Thema:     ' . feld('thema');     $stichwort = feld('thema'); }
if ($art === 'pkv-vergleich') { $zeilen[] = 'Situation: ' . feld('situation'); $stichwort = 'PKV oder GKV'; }
if ($art === 'servicepaket')  { $zeilen[] = 'Paket:     ' . feld('paket');     $stichwort = 'Servicepaket ' . feld('paket'); }

$betreff = 'Anfrage über die Website: ' . kopfzeilensicher($stichwort);

$text = "Neue Anfrage über codefinance.de\n\n"
      . implode("\n", $zeilen) . "\n\n"
      . "Nachricht:\n" . ($nachricht !== '' ? $nachricht : 'keine Nachricht') . "\n\n"
      . "-----\n"
      . "Gesendet am " . date('d.m.Y \u\m H:i') . " Uhr\n"
      . "Der Datenschutzerklärung wurde zugestimmt.\n";

$kopf = [
    'From: CODE FINANCE Website <' . ABSENDER . '>',
    'Reply-To: ' . kopfzeilensicher($name) . ' <' . kopfzeilensicher($email) . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$ok = @mail(EMPFAENGER, '=?UTF-8?B?' . base64_encode($betreff) . '?=', $text,
            implode("\r\n", $kopf), '-f' . ABSENDER);

if ($ok) {
    abbruch(DANKE_SEITE);
}

/* Rueckfallweg: Versand hat nicht geklappt. Die Anfrage darf nicht verloren
   gehen, also das Mailprogramm mit dem fertigen Text anbieten. */
$mailto = 'mailto:' . EMPFAENGER . '?subject=' . rawurlencode($betreff) . '&body=' . rawurlencode($text);
header('Content-Type: text/html; charset=UTF-8');
?><!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Anfrage nicht verschickt | CODE FINANCE GmbH</title>
<style>body{font-family:system-ui,sans-serif;max-width:560px;margin:60px auto;padding:0 16px;line-height:1.5}a.knopf{display:inline-block;background:#1F63B5;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none}</style>
</head><body>
<h1>Ihre Anfrage konnte leider nicht verschickt werden</h1>
<p>Das lag an uns, nicht an Ihnen. Mit einem Klick öffnet sich Ihr E-Mail-Programm mit Ihrer fertigen Nachricht, Sie müssen sie nur noch absenden.</p>
<p><a class="knopf" href="<?= htmlspecialchars($mailto, ENT_QUOTES) ?>">E-Mail-Programm öffnen</a></p>
<p>Oder rufen Sie uns an: <a href="tel:+4972195279527">+49 721 95279527</a></p>
<p><a href="<?= htmlspecialchars($form['zurueck'], ENT_QUOTES) ?>">Zurück zur Seite</a></p>
</body></html>
