<?php
/* ============================================================================
   CODE FINANCE, Formularversand
   Nimmt die Anfrage vom Kontaktformular entgegen und schickt sie als E-Mail
   an das Postfach. Laeuft nur auf dem echten Hoster, nicht auf der Vorschau.
   Empfaenger und Absender stehen unten als Konstanten.
   ========================================================================= */

const EMPFAENGER   = 'info@codefinance.de';
const ABSENDER     = 'website@codefinance.de';   // muss zur Domain gehoeren, sonst greift SPF
const DANKE_SEITE  = 'danke.html';
const FEHLER_SEITE = 'index.html#kontakt';

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
    abbruch(FEHLER_SEITE);
}

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

$vorname   = feld('vorname');
$nachname  = feld('nachname');
$email     = feld('email');
$telefon   = feld('telefon');
$thema     = feld('thema');
$nachricht = feld('nachricht');
$datenschutz = feld('datenschutz');

if ($vorname === '' || $nachname === '' || $thema === '' || $datenschutz === ''
    || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    abbruch(FEHLER_SEITE);
}

$betreff = 'Anfrage über die Website: ' . kopfzeilensicher($thema);

$text = "Neue Anfrage über codefinance.de\n\n"
      . "Name:     $vorname $nachname\n"
      . "E-Mail:   $email\n"
      . "Telefon:  " . ($telefon !== '' ? $telefon : 'nicht angegeben') . "\n"
      . "Thema:    $thema\n\n"
      . "Nachricht:\n" . ($nachricht !== '' ? $nachricht : 'keine Nachricht') . "\n\n"
      . "-----\n"
      . "Gesendet am " . date('d.m.Y \u\m H:i') . " Uhr\n"
      . "Der Datenschutzerklärung wurde zugestimmt.\n";

$kopf = [
    'From: CODE FINANCE Website <' . ABSENDER . '>',
    'Reply-To: ' . kopfzeilensicher($vorname . ' ' . $nachname) . ' <' . kopfzeilensicher($email) . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . phpversion(),
];

@mail(EMPFAENGER, '=?UTF-8?B?' . base64_encode($betreff) . '?=', $text, implode("\r\n", $kopf));

abbruch(DANKE_SEITE);
