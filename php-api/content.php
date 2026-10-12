<?php

require __DIR__ . '/lib/bootstrap.php';
api_boot();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    api_fail(405, 'Use GET.');
}

try {
    $db = api_db();
    $jobs = $db->query('SELECT * FROM experiences')->fetchAll();
    $work = $db->query("SELECT * FROM projects WHERE status = 'public'")->fetchAll();
} catch (Throwable $error) {
    api_fail(500, 'The content database is not ready.');
}

$experiences = array_map('api_experience_out', $jobs);
usort($experiences, function ($a, $b) {
    $aStart = $a['start']['year'] * 12 + $a['start']['month'];
    $bStart = $b['start']['year'] * 12 + $b['start']['month'];
    return $bStart <=> $aStart;
});

$projects = array_map('api_project_out', $work);
usort($projects, function ($a, $b) {
    return ((int) $b['featured']) <=> ((int) $a['featured']);
});

$payload = [
    'experiences' => $experiences,
    'projects' => $projects,
];

try {
    api_ensure_posts();
    $notes = $db->query("SELECT * FROM posts WHERE status = 'public'")->fetchAll();
    $posts = array_map('api_post_out', $notes);
    usort($posts, function ($a, $b) {
        return strcmp($b['date'], $a['date']);
    });
    $payload['posts'] = $posts;
} catch (Throwable $error) {
    // Jobs and projects still publish when the posts table is not ready.
}

api_ok($payload);
