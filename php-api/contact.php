<?php

require __DIR__ . '/lib/bootstrap.php';
api_boot();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    api_fail(405, 'Use POST.');
}

$body = api_body();
if (contact_field($body['bot-field'] ?? '', 200) !== '') {
    api_ok();
}

contact_limit($_SERVER['REMOTE_ADDR'] ?? 'unknown');

$fullName = contact_field($body['fullName'] ?? '', 100);
$email = contact_field($body['email'] ?? '', 200);
$interest = contact_field($body['interest'] ?? '', 80);
$message = contact_field($body['message'] ?? '', 4000);
$emailOk = (bool) preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email);

if ($fullName === '' || !$emailOk || $interest === '' || $message === '') {
    api_fail(400, 'Enter your name, a valid email, and a message.');
}

$to = 'pranavputhoor91@gmail.com';
$from = 'contact@pranavps.com';
$subject = 'Portfolio message from ' . $fullName;
$text = "Name: {$fullName}\nEmail: {$email}\nAbout: {$interest}\n\n{$message}";
$headers = implode("\r\n", [
    'From: Pranav P S <' . $from . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
]);

if (!mail($to, $subject, $text, $headers, '-f' . $from)) {
    api_fail(502, 'Message was not sent.');
}

api_ok();

function contact_field($value, int $max): string
{
    $text = trim((string) $value);
    $text = str_replace(["\r", "\n"], ' ', $text);
    if (strlen($text) > $max) {
        $text = substr($text, 0, $max);
    }
    return $text;
}

function contact_limit(string $ip): void
{
    $path = sys_get_temp_dir() . '/pranavps-contact-' . hash('sha256', $ip) . '.json';
    $now = time();
    $recent = [];
    if (is_file($path)) {
        $decoded = json_decode((string) file_get_contents($path), true);
        if (is_array($decoded)) {
            foreach ($decoded as $time) {
                if (is_int($time) && $now - $time < 15 * 60) {
                    $recent[] = $time;
                }
            }
        }
    }
    if (count($recent) >= 5) {
        api_fail(429, 'Too many messages. Try again later.');
    }
    $recent[] = $now;
    file_put_contents($path, json_encode($recent), LOCK_EX);
}
