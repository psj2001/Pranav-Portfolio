<?php

require __DIR__ . '/lib/bootstrap.php';
api_boot();
api_require_auth();

$method = $_SERVER['REQUEST_METHOD'];
$db = api_db();
api_ensure_screenshot_column();

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM projects')->fetchAll();
    $items = array_map('api_project_out', $rows);
    usort($items, function ($a, $b) {
        return strcmp($a['title'], $b['title']);
    });
    api_ok(['projects' => $items]);
}

if ($method !== 'POST') {
    api_fail(405, 'Use GET or POST.');
}

$body = api_body();
$action = (string) ($body['action'] ?? 'save');

if ($action === 'delete') {
    $id = api_slug((string) ($body['id'] ?? ''));
    $statement = $db->prepare('DELETE FROM projects WHERE id = ?');
    $statement->execute([$id]);
    api_prune_project_images($id, []);
    api_ok();
}

$item = $body['item'] ?? null;
if (!is_array($item)) {
    api_fail(400, 'Send the project to save.');
}

$id = api_slug((string) ($item['id'] ?? ''));
$status = api_one_of((string) ($item['status'] ?? 'public'), ['public', 'review'], 'Status');
$title = api_required_text($item['title'] ?? '', 'a title', 160);
$summary = api_required_text($item['summary'] ?? '', 'a summary', 2000);
$productType = api_one_of(
    (string) ($item['productType'] ?? ''),
    ['mobile-app', 'website', 'dashboard', 'marketing'],
    'Project type'
);
$engagement = api_optional_enum(
    $item['engagement'] ?? null,
    ['employment', 'freelance', 'personal'],
    'Engagement'
);
$contributionKind = api_optional_enum(
    $item['contributionKind'] ?? null,
    ['built', 'features', 'maintained'],
    'Contribution kind'
);
$contribution = api_optional_text($item['contribution'] ?? null, 2000);
$problem = api_optional_text($item['problem'] ?? null, 2000);
$completed = api_optional_text($item['completed'] ?? null, 2000);
$experienceId = api_optional_text($item['experienceId'] ?? null, 64);
if ($experienceId !== null) {
    $experienceId = api_slug($experienceId);
}
$featured = !empty($item['featured']) ? 1 : 0;

$links = [];
foreach (is_array($item['links'] ?? null) ? $item['links'] : [] as $link) {
    if (!is_array($link)) {
        continue;
    }
    $label = trim((string) ($link['label'] ?? ''));
    $href = trim((string) ($link['href'] ?? ''));
    if ($label !== '' && $href !== '') {
        $links[] = ['label' => mb_substr($label, 0, 120), 'href' => mb_substr($href, 0, 500)];
    }
}

$alsoTypes = array_values(array_filter(
    api_string_list($item['alsoTypes'] ?? []),
    fn($type) => in_array($type, ['mobile-app', 'website', 'dashboard', 'marketing'], true)
));
$audiences = array_values(array_filter(
    api_string_list($item['audiences'] ?? []),
    fn($audience) => in_array($audience, ['home', 'flutter', 'fullstack', 'marketing'], true)
));
$screenshot = api_screenshot_in($item['screenshot'] ?? null);
api_ensure_views_column();
$existing = $db->prepare('SELECT views FROM projects WHERE id = ?');
$existing->execute([$id]);
$previousViews = $existing->fetchColumn();
$views = array_key_exists('views', $item) ? api_views_in($item['views']) : api_views_out(is_string($previousViews) ? $previousViews : null);
$keepSrcs = [];
if ($screenshot) {
    $keepSrcs[] = $screenshot['src'];
}
foreach ($views as $view) {
    foreach ($view['shots'] as $shot) {
        $keepSrcs[] = $shot['src'];
    }
}

$statement = $db->prepare(
    'INSERT INTO projects
      (id, status, title, summary, product_type, engagement, contribution_kind, contribution, technologies, tasks, problem, completed, links, featured, experience_id, also_types, audiences, screenshot, views)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      status = VALUES(status),
      title = VALUES(title),
      summary = VALUES(summary),
      product_type = VALUES(product_type),
      engagement = VALUES(engagement),
      contribution_kind = VALUES(contribution_kind),
      contribution = VALUES(contribution),
      technologies = VALUES(technologies),
      tasks = VALUES(tasks),
      problem = VALUES(problem),
      completed = VALUES(completed),
      links = VALUES(links),
      featured = VALUES(featured),
      experience_id = VALUES(experience_id),
      also_types = VALUES(also_types),
      audiences = VALUES(audiences),
      screenshot = VALUES(screenshot),
      views = VALUES(views)'
);
$statement->execute([
    $id,
    $status,
    $title,
    $summary,
    $productType,
    $engagement,
    $contributionKind,
    $contribution,
    api_json_column($item['technologies'] ?? []),
    api_json_column($item['tasks'] ?? []),
    $problem,
    $completed,
    json_encode($links, JSON_UNESCAPED_UNICODE),
    $featured,
    $experienceId,
    json_encode($alsoTypes, JSON_UNESCAPED_UNICODE),
    json_encode($audiences, JSON_UNESCAPED_UNICODE),
    $screenshot === null ? null : json_encode($screenshot, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    json_encode($views, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
]);

api_prune_project_images($id, $keepSrcs);
api_ok(['id' => $id]);
