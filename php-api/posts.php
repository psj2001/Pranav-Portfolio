<?php

require __DIR__ . '/lib/bootstrap.php';
api_boot();
api_require_auth();
api_ensure_posts();

$method = $_SERVER['REQUEST_METHOD'];
$db = api_db();

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM posts')->fetchAll();
    $items = array_map('api_post_out', $rows);
    usort($items, function ($a, $b) {
        return strcmp($b['date'], $a['date']);
    });
    api_ok(['posts' => $items]);
}

if ($method !== 'POST') {
    api_fail(405, 'Use GET or POST.');
}

$body = api_body();
$action = (string) ($body['action'] ?? 'save');

if ($action === 'delete') {
    $track = api_one_of((string) ($body['track'] ?? ''), ['software', 'marketing'], 'Track');
    $slug = api_post_slug((string) ($body['slug'] ?? ''));
    $statement = $db->prepare('DELETE FROM posts WHERE track = ? AND slug = ?');
    $statement->execute([$track, $slug]);
    api_prune_post_images($track, $slug, []);
    api_ok();
}

$item = $body['item'] ?? null;
if (!is_array($item)) {
    api_fail(400, 'Send the post to save.');
}

$track = api_one_of((string) ($item['track'] ?? ''), ['software', 'marketing'], 'Track');
$slug = api_post_slug((string) ($item['slug'] ?? ''));
$status = api_one_of((string) ($item['status'] ?? 'public'), ['public', 'review'], 'Status');
$title = api_required_text($item['title'] ?? '', 'a title', 180);
$excerpt = api_required_text($item['excerpt'] ?? '', 'an excerpt', 2000);
$date = api_post_date($item['date'] ?? '');
$tags = api_post_tags($item['tags'] ?? []);
$blocks = api_post_blocks($item['body'] ?? null);

$statement = $db->prepare(
    'INSERT INTO posts (track, slug, status, title, excerpt, published_on, tags, body)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      status = VALUES(status),
      title = VALUES(title),
      excerpt = VALUES(excerpt),
      published_on = VALUES(published_on),
      tags = VALUES(tags),
      body = VALUES(body)'
);
$statement->execute([
    $track,
    $slug,
    $status,
    $title,
    $excerpt,
    $date,
    json_encode($tags, JSON_UNESCAPED_UNICODE),
    json_encode($blocks, JSON_UNESCAPED_UNICODE),
]);

$keep = [];
foreach ($blocks as $block) {
    if (($block['type'] ?? '') === 'image') {
        $keep[] = $block['src'];
    }
}
api_prune_post_images($track, $slug, $keep);

$previous = $body['previous'] ?? null;
if (is_array($previous)) {
    $previousTrack = api_one_of((string) ($previous['track'] ?? ''), ['software', 'marketing'], 'Track');
    $previousSlug = api_post_slug((string) ($previous['slug'] ?? ''));
    if ($previousTrack !== $track || $previousSlug !== $slug) {
        $remove = $db->prepare('DELETE FROM posts WHERE track = ? AND slug = ?');
        $remove->execute([$previousTrack, $previousSlug]);
        api_prune_post_images($previousTrack, $previousSlug, $keep);
    }
}

api_ok(['track' => $track, 'slug' => $slug]);
