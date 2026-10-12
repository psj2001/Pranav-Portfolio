<?php

require __DIR__ . '/lib/bootstrap.php';
api_boot();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    api_fail(405, 'Use POST.');
}

$body = api_body();
$password = (string) ($body['password'] ?? '');
$config = api_config();
$hash = (string) ($config['admin_password_hash'] ?? '');
if ($hash === '' || !password_verify($password, $hash)) {
    api_fail(401, 'That password is not correct.');
}

$token = bin2hex(random_bytes(32));
try {
    $db = api_db();
    $db->exec('DELETE FROM sessions WHERE expires_at <= NOW()');
    $statement = $db->prepare('INSERT INTO sessions (token, expires_at) VALUES (?, DATE_ADD(NOW(), INTERVAL 30 DAY))');
    $statement->execute([$token]);
} catch (Throwable $error) {
    api_fail(500, 'The content database is not ready.');
}

api_ok(['token' => $token]);
