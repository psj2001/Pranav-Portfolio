<?php

require __DIR__ . '/lib/bootstrap.php';
api_boot();
api_require_auth();

$method = $_SERVER['REQUEST_METHOD'];
$db = api_db();

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM experiences')->fetchAll();
    $items = array_map('api_experience_out', $rows);
    usort($items, function ($a, $b) {
        $aStart = $a['start']['year'] * 12 + $a['start']['month'];
        $bStart = $b['start']['year'] * 12 + $b['start']['month'];
        return $bStart <=> $aStart;
    });
    api_ok(['experiences' => $items]);
}

if ($method !== 'POST') {
    api_fail(405, 'Use GET or POST.');
}

$body = api_body();
$action = (string) ($body['action'] ?? 'save');

if ($action === 'delete') {
    $id = api_slug((string) ($body['id'] ?? ''));
    $statement = $db->prepare('DELETE FROM experiences WHERE id = ?');
    $statement->execute([$id]);
    api_ok();
}

$item = $body['item'] ?? null;
if (!is_array($item)) {
    api_fail(400, 'Send the job to save.');
}

$id = api_slug((string) ($item['id'] ?? ''));
$role = api_required_text($item['role'] ?? '', 'a role', 160);
$company = api_required_text($item['company'] ?? '', 'a company', 160);
$location = api_required_text($item['location'] ?? '', 'a location', 160);
$start = is_array($item['start'] ?? null) ? $item['start'] : [];
$startYear = api_year($start['year'] ?? 0);
$startMonth = api_month($start['month'] ?? 0);
$endYear = null;
$endMonth = null;
if (is_array($item['end'] ?? null) && ($item['end']['year'] ?? '') !== '' && ($item['end']['month'] ?? '') !== '') {
    $endYear = api_year($item['end']['year']);
    $endMonth = api_month($item['end']['month']);
}

$statement = $db->prepare(
    'INSERT INTO experiences
      (id, role, company, location, start_year, start_month, end_year, end_month, bullets, related, technologies, project_ids)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      role = VALUES(role),
      company = VALUES(company),
      location = VALUES(location),
      start_year = VALUES(start_year),
      start_month = VALUES(start_month),
      end_year = VALUES(end_year),
      end_month = VALUES(end_month),
      bullets = VALUES(bullets),
      related = VALUES(related),
      technologies = VALUES(technologies),
      project_ids = VALUES(project_ids)'
);
$statement->execute([
    $id,
    $role,
    $company,
    $location,
    $startYear,
    $startMonth,
    $endYear,
    $endMonth,
    api_json_column($item['bullets'] ?? []),
    api_json_column($item['related'] ?? []),
    api_json_column($item['technologies'] ?? []),
    api_json_column($item['projectIds'] ?? []),
]);

api_ok(['id' => $id]);
