<?php

function api_config(): array
{
    $candidates = [
        dirname(__DIR__, 3) . '/portfolio-config.php',
        dirname(__DIR__) . '/config.php',
    ];
    foreach ($candidates as $path) {
        if (is_file($path)) {
            $config = require $path;
            if (is_array($config)) {
                return $config;
            }
        }
    }
    api_fail(500, 'Missing config.php. Copy config.example.php and add the database details.');
}

function api_db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    $config = api_config();
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=utf8mb4',
        $config['db_host'] ?? 'localhost',
        $config['db_name'] ?? ''
    );
    $pdo = new PDO($dsn, (string) ($config['db_user'] ?? ''), (string) ($config['db_pass'] ?? ''), [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    return $pdo;
}

function api_boot(): void
{
    header('Content-Type: application/json; charset=utf-8');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function api_fail(int $status, string $message): void
{
    http_response_code($status);
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function api_ok(array $payload = []): void
{
    echo json_encode($payload === [] ? ['ok' => true] : $payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function api_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        api_fail(400, 'Send a JSON body.');
    }
    return $data;
}

function api_string_list($value): array
{
    if (!is_array($value)) {
        return [];
    }
    $items = [];
    foreach ($value as $item) {
        if (!is_string($item)) {
            continue;
        }
        $text = trim($item);
        if ($text !== '') {
            $items[] = $text;
        }
    }
    return array_values($items);
}

function api_slug(string $value): string
{
    $id = strtolower(trim($value));
    if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $id)) {
        api_fail(400, 'Use an id made of lowercase letters, numbers, and hyphens.');
    }
    return $id;
}

function api_month($value): int
{
    $month = (int) $value;
    if ($month < 1 || $month > 12) {
        api_fail(400, 'Month must be from 1 to 12.');
    }
    return $month;
}

function api_year($value): int
{
    $year = (int) $value;
    if ($year < 1990 || $year > 2100) {
        api_fail(400, 'Enter a valid year.');
    }
    return $year;
}

function api_bearer(): string
{
    $custom = $_SERVER['HTTP_X_PORTFOLIO_TOKEN'] ?? '';
    if (preg_match('/^[a-f0-9]{64}$/', $custom)) {
        return $custom;
    }
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(\S+)/i', $header, $match)) {
        return $match[1];
    }
    return '';
}

function api_require_auth(): void
{
    $token = api_bearer();
    if (!preg_match('/^[a-f0-9]{64}$/', $token)) {
        api_fail(401, 'Sign in again.');
    }
    $statement = api_db()->prepare('SELECT token FROM sessions WHERE token = ? AND expires_at > NOW()');
    $statement->execute([$token]);
    if (!$statement->fetch()) {
        api_fail(401, 'Sign in again.');
    }
}

function api_json_column($value): string
{
    return json_encode(api_string_list($value), JSON_UNESCAPED_UNICODE);
}

function api_decode_list($value): array
{
    if (!is_string($value) || $value === '') {
        return [];
    }
    $decoded = json_decode($value, true);
    return api_string_list($decoded);
}

function api_experience_out(array $row): array
{
    $item = [
        'id' => $row['id'],
        'role' => $row['role'],
        'company' => $row['company'],
        'location' => $row['location'],
        'start' => ['year' => (int) $row['start_year'], 'month' => (int) $row['start_month']],
        'bullets' => api_decode_list($row['bullets']),
        'related' => api_decode_list($row['related']),
        'technologies' => api_decode_list($row['technologies']),
        'projectIds' => api_decode_list($row['project_ids']),
    ];
    if ($row['end_year'] !== null && $row['end_month'] !== null) {
        $item['end'] = ['year' => (int) $row['end_year'], 'month' => (int) $row['end_month']];
    }
    return $item;
}

function api_links_out($value): array
{
    if (!is_string($value) || $value === '') {
        return [];
    }
    $decoded = json_decode($value, true);
    if (!is_array($decoded)) {
        return [];
    }
    $links = [];
    foreach ($decoded as $link) {
        if (!is_array($link)) {
            continue;
        }
        $label = trim((string) ($link['label'] ?? ''));
        $href = trim((string) ($link['href'] ?? ''));
        if ($label !== '' && $href !== '') {
            $links[] = ['label' => $label, 'href' => $href];
        }
    }
    return $links;
}

function api_project_out(array $row): array
{
    $item = [
        'id' => $row['id'],
        'status' => $row['status'],
        'title' => $row['title'],
        'summary' => $row['summary'],
        'productType' => $row['product_type'],
        'technologies' => api_decode_list($row['technologies']),
        'tasks' => api_decode_list($row['tasks']),
        'links' => api_links_out($row['links']),
        'featured' => (bool) $row['featured'],
    ];
    if ($row['engagement']) {
        $item['engagement'] = $row['engagement'];
    }
    if ($row['contribution_kind']) {
        $item['contributionKind'] = $row['contribution_kind'];
    }
    if ($row['contribution']) {
        $item['contribution'] = $row['contribution'];
    }
    if ($row['problem']) {
        $item['problem'] = $row['problem'];
    }
    if ($row['completed']) {
        $item['completed'] = $row['completed'];
    }
    if ($row['experience_id']) {
        $item['experienceId'] = $row['experience_id'];
    }
    $screenshot = api_screenshot_out($row['screenshot'] ?? null);
    if ($screenshot) {
        $item['screenshot'] = $screenshot;
    }
    api_ensure_views_column();
    $views = api_views_out($row['views'] ?? null);
    if ($views) {
        $item['views'] = $views;
    }
    $also = api_decode_list($row['also_types']);
    if ($also) {
        $item['alsoTypes'] = $also;
    }
    $audiences = api_decode_list($row['audiences']);
    if ($audiences) {
        $item['audiences'] = $audiences;
    }
    return $item;
}

function api_one_of(string $value, array $allowed, string $label): string
{
    if (!in_array($value, $allowed, true)) {
        api_fail(400, $label . ' is not valid.');
    }
    return $value;
}

function api_optional_enum($value, array $allowed, string $label): ?string
{
    if ($value === null || $value === '') {
        return null;
    }
    if (!is_string($value)) {
        api_fail(400, $label . ' is not valid.');
    }
    return api_one_of($value, $allowed, $label);
}

function api_required_text($value, string $label, int $max): string
{
    if (!is_string($value) || trim($value) === '') {
        api_fail(400, 'Enter ' . $label . '.');
    }
    return mb_substr(trim($value), 0, $max);
}

function api_optional_text($value, int $max): ?string
{
    if (!is_string($value) || trim($value) === '') {
        return null;
    }
    return mb_substr(trim($value), 0, $max);
}

function api_ensure_views_column(): void
{
    static $ready = false;
    if ($ready) {
        return;
    }
    $db = api_db();
    $columns = $db->query("SHOW COLUMNS FROM projects LIKE 'views'")->fetchAll();
    if (!$columns) {
        try {
            $db->exec('ALTER TABLE projects ADD COLUMN views LONGTEXT NULL');
        } catch (PDOException $error) {
            $columns = $db->query("SHOW COLUMNS FROM projects LIKE 'views'")->fetchAll();
            if (!$columns) {
                throw $error;
            }
        }
    }
    $ready = true;
}

function api_views_out($value): array
{
    if (!is_string($value) || $value === '') {
        return [];
    }
    $decoded = json_decode($value, true);
    if (!is_array($decoded)) {
        return [];
    }
    $views = [];
    foreach ($decoded as $view) {
        if (!is_array($view) || !in_array($view['type'] ?? '', ['mobile-app', 'website', 'dashboard', 'marketing'], true)) {
            continue;
        }
        $shots = [];
        foreach (is_array($view['shots'] ?? null) ? $view['shots'] : [] as $shot) {
            $parsed = api_screenshot_out(json_encode($shot));
            if ($parsed) {
                $shots[] = $parsed;
            }
        }
        $links = [];
        foreach (is_array($view['links'] ?? null) ? $view['links'] : [] as $link) {
            if (!is_array($link)) {
                continue;
            }
            $label = trim((string) ($link['label'] ?? ''));
            $href = trim((string) ($link['href'] ?? ''));
            if ($label !== '' && $href !== '') {
                $links[] = ['label' => $label, 'href' => $href];
            }
        }
        $item = [
            'type' => $view['type'],
            'shots' => $shots,
            'links' => $links,
        ];
        $label = trim((string) ($view['label'] ?? ''));
        if ($label !== '') {
            $item['label'] = mb_substr($label, 0, 40);
        }
        $views[] = $item;
    }
    return $views;
}

function api_views_in($value): array
{
    if (!is_array($value)) {
        api_fail(400, 'Project parts are not valid.');
    }
    $views = [];
    foreach ($value as $view) {
        if (!is_array($view)) {
            continue;
        }
        $type = api_one_of((string) ($view['type'] ?? ''), ['mobile-app', 'website', 'dashboard', 'marketing'], 'Project part');
        $shots = [];
        foreach (is_array($view['shots'] ?? null) ? $view['shots'] : [] as $shot) {
            $parsed = api_screenshot_in($shot);
            if ($parsed) {
                $shots[] = $parsed;
            }
        }
        $links = [];
        foreach (is_array($view['links'] ?? null) ? $view['links'] : [] as $link) {
            if (!is_array($link)) {
                continue;
            }
            $label = trim((string) ($link['label'] ?? ''));
            $href = trim((string) ($link['href'] ?? ''));
            if ($label !== '' && $href !== '') {
                $links[] = ['label' => mb_substr($label, 0, 120), 'href' => mb_substr($href, 0, 500)];
            }
        }
        $item = ['type' => $type, 'shots' => $shots, 'links' => $links];
        $label = api_optional_text($view['label'] ?? null, 40);
        if ($label !== null) {
            $item['label'] = $label;
        }
        $views[] = $item;
    }
    return $views;
}

function api_ensure_screenshot_column(): void
{
    static $ready = false;
    if ($ready) {
        return;
    }
    $db = api_db();
    $columns = $db->query("SHOW COLUMNS FROM projects LIKE 'screenshot'")->fetchAll();
    if (!$columns) {
        try {
            $db->exec('ALTER TABLE projects ADD COLUMN screenshot LONGTEXT NULL');
        } catch (PDOException $error) {
            $columns = $db->query("SHOW COLUMNS FROM projects LIKE 'screenshot'")->fetchAll();
            if (!$columns) {
                throw $error;
            }
        }
    }
    $ready = true;
}

function api_projects_image_dir(bool $create = false): string
{
    $dir = dirname(__DIR__) . '/uploads/projects';
    if ($create && !is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        api_fail(500, 'Could not store the image.');
    }
    return $dir;
}

function api_screenshot_out($value): ?array
{
    if (!is_string($value) || $value === '') {
        return null;
    }
    $decoded = json_decode($value, true);
    if (!is_array($decoded)) {
        return null;
    }
    $src = trim((string) ($decoded['src'] ?? ''));
    $width = (int) ($decoded['width'] ?? 0);
    $height = (int) ($decoded['height'] ?? 0);
    if ($src === '' || $width < 1 || $height < 1) {
        return null;
    }
    $alt = trim((string) ($decoded['alt'] ?? ''));
    return [
        'src' => $src,
        'alt' => $alt !== '' ? $alt : 'Project screenshot',
        'width' => $width,
        'height' => $height,
    ];
}

function api_screenshot_in($value): ?array
{
    if ($value === null || $value === '') {
        return null;
    }
    if (!is_array($value)) {
        api_fail(400, 'Image is not valid.');
    }
    $src = trim((string) ($value['src'] ?? ''));
    if (!preg_match('#^https://pranavps\.com/api/uploads/projects/[a-z0-9]+(?:-[a-z0-9]+)*-[a-f0-9]{8}\.(jpg|png|webp)$#', $src)) {
        api_fail(400, 'Image is not valid.');
    }
    $filename = basename((string) parse_url($src, PHP_URL_PATH));
    if (!is_file(api_projects_image_dir() . '/' . $filename)) {
        api_fail(400, 'Upload the image again.');
    }
    $width = (int) ($value['width'] ?? 0);
    $height = (int) ($value['height'] ?? 0);
    if ($width < 1 || $height < 1 || $width > 8000 || $height > 8000) {
        api_fail(400, 'Image is not valid.');
    }
    $alt = api_optional_text($value['alt'] ?? null, 160) ?? 'Project screenshot';
    return [
        'src' => $src,
        'alt' => $alt,
        'width' => $width,
        'height' => $height,
    ];
}

function api_ensure_posts(): void
{
    static $ready = false;
    if ($ready) {
        return;
    }
    $db = api_db();
    $db->exec(
        "CREATE TABLE IF NOT EXISTS posts (
          track ENUM('software', 'marketing') NOT NULL,
          slug VARCHAR(80) NOT NULL,
          status ENUM('public', 'review') NOT NULL DEFAULT 'public',
          title VARCHAR(180) NOT NULL,
          excerpt TEXT NOT NULL,
          published_on DATE NOT NULL,
          tags LONGTEXT NOT NULL,
          body LONGTEXT NOT NULL,
          PRIMARY KEY (track, slug)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
    );
    $count = (int) $db->query('SELECT COUNT(*) FROM posts')->fetchColumn();
    if ($count === 0) {
        api_seed_posts($db);
    }
    $ready = true;
}

function api_seed_posts(PDO $db): void
{
    $path = dirname(__DIR__) . '/blog-seed.json';
    if (!is_file($path)) {
        return;
    }
    $posts = json_decode((string) file_get_contents($path), true);
    if (!is_array($posts)) {
        return;
    }
    $statement = $db->prepare(
        'INSERT IGNORE INTO posts (track, slug, status, title, excerpt, published_on, tags, body)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    foreach ($posts as $post) {
        if (!is_array($post)) {
            continue;
        }
        $track = (string) ($post['track'] ?? '');
        $slug = (string) ($post['slug'] ?? '');
        $title = trim((string) ($post['title'] ?? ''));
        $excerpt = trim((string) ($post['excerpt'] ?? ''));
        $date = (string) ($post['date'] ?? '');
        if (!in_array($track, ['software', 'marketing'], true) || !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) {
            continue;
        }
        if ($title === '' || $excerpt === '' || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            continue;
        }
        $body = api_post_blocks($post['body'] ?? null, false);
        if (!$body) {
            continue;
        }
        $statement->execute([
            $track,
            $slug,
            ($post['status'] ?? 'public') === 'review' ? 'review' : 'public',
            mb_substr($title, 0, 180),
            mb_substr($excerpt, 0, 2000),
            $date,
            json_encode(api_post_tags($post['tags'] ?? []), JSON_UNESCAPED_UNICODE),
            json_encode($body, JSON_UNESCAPED_UNICODE),
        ]);
    }
}

function api_post_tags($value): array
{
    $tags = [];
    foreach (api_string_list($value) as $tag) {
        $tags[] = mb_substr($tag, 0, 40);
        if (count($tags) >= 12) {
            break;
        }
    }
    return $tags;
}

function api_post_blocks($value, bool $required = true): array
{
    if (!is_array($value)) {
        if ($required) {
            api_fail(400, 'Enter the post.');
        }
        return [];
    }
    $blocks = [];
    foreach ($value as $block) {
        if (!is_array($block)) {
            continue;
        }
        $type = (string) ($block['type'] ?? '');
        if ($type === 'image') {
            if (count(array_filter($blocks, fn($item) => $item['type'] === 'image')) >= 8) {
                continue;
            }
            $image = api_post_image_in($block, $required);
            if ($image) {
                $blocks[] = $image;
            }
            continue;
        }
        if ($type === 'paragraph' || $type === 'heading') {
            $text = trim((string) ($block['text'] ?? ''));
            if ($text === '') {
                continue;
            }
            $blocks[] = ['type' => $type, 'text' => mb_substr($text, 0, 8000)];
            continue;
        }
        if ($type !== 'list') {
            continue;
        }
        $items = [];
        foreach (api_string_list($block['items'] ?? []) as $item) {
            $items[] = mb_substr($item, 0, 500);
        }
        if ($items) {
            $blocks[] = ['type' => 'list', 'items' => $items];
        }
    }
    if (!$blocks && $required) {
        api_fail(400, 'Enter the post.');
    }
    return $blocks;
}

function api_post_date($value): string
{
    $date = trim((string) $value);
    $parsed = DateTime::createFromFormat('Y-m-d', $date);
    if (!$parsed || $parsed->format('Y-m-d') !== $date) {
        api_fail(400, 'Enter a date as YYYY-MM-DD.');
    }
    return $date;
}

function api_post_slug(string $value): string
{
    $slug = api_slug($value);
    if (strlen($slug) > 80) {
        api_fail(400, 'Use a shorter slug.');
    }
    return $slug;
}

function api_reading_minutes(array $blocks): int
{
    $words = 0;
    foreach ($blocks as $block) {
        if (($block['type'] ?? '') === 'image') {
            continue;
        }
        $text = $block['type'] === 'list' ? implode(' ', $block['items']) : (string) ($block['text'] ?? '');
        $parts = preg_split('/\s+/', trim($text), -1, PREG_SPLIT_NO_EMPTY);
        $words += is_array($parts) ? count($parts) : 0;
    }
    return max(1, (int) ceil($words / 200));
}

function api_post_body_out($value): array
{
    if (!is_string($value) || $value === '') {
        return [];
    }
    $decoded = json_decode($value, true);
    return api_post_blocks(is_array($decoded) ? $decoded : [], false);
}

function api_post_out(array $row): array
{
    $body = api_post_body_out($row['body']);
    return [
        'track' => $row['track'],
        'slug' => $row['slug'],
        'status' => $row['status'],
        'title' => $row['title'],
        'excerpt' => $row['excerpt'],
        'date' => $row['published_on'],
        'readingMinutes' => api_reading_minutes($body),
        'tags' => api_decode_list($row['tags']),
        'body' => $body,
    ];
}

function api_posts_image_dir(bool $create = false): string
{
    $dir = dirname(__DIR__) . '/uploads/posts';
    if ($create && !is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        api_fail(500, 'Could not store the image.');
    }
    return $dir;
}

function api_post_image_folder(string $track, string $slug, bool $create = false): string
{
    $dir = api_posts_image_dir($create) . '/' . $track . '/' . $slug;
    if ($create && !is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        api_fail(500, 'Could not store the image.');
    }
    return $dir;
}

function api_post_image_in(array $block, bool $required): ?array
{
    $src = trim((string) ($block['src'] ?? ''));
    $pattern = '#^https://pranavps\.com/api/uploads/posts/(software|marketing)/([a-z0-9]+(?:-[a-z0-9]+)*)/([a-f0-9]{8}\.(?:jpg|png|webp))$#';
    if (!preg_match($pattern, $src, $match)) {
        if ($required) {
            api_fail(400, 'Image is not valid.');
        }
        return null;
    }
    $file = api_posts_image_dir() . '/' . $match[1] . '/' . $match[2] . '/' . $match[3];
    if ($required && !is_file($file)) {
        api_fail(400, 'Upload the image again.');
    }
    $width = (int) ($block['width'] ?? 0);
    $height = (int) ($block['height'] ?? 0);
    if ($width < 1 || $height < 1 || $width > 8000 || $height > 8000) {
        if ($required) {
            api_fail(400, 'Image is not valid.');
        }
        return null;
    }
    $alt = api_optional_text($block['alt'] ?? null, 160) ?? 'Blog image';
    return [
        'type' => 'image',
        'src' => $src,
        'alt' => $alt,
        'width' => $width,
        'height' => $height,
    ];
}

function api_prune_post_images(string $track, string $slug, array $keepSrcs): void
{
    if (!in_array($track, ['software', 'marketing'], true)) {
        return;
    }
    $dir = api_post_image_folder($track, $slug);
    if (!is_dir($dir)) {
        return;
    }
    $keep = [];
    foreach ($keepSrcs as $src) {
        $name = basename((string) parse_url((string) $src, PHP_URL_PATH));
        if (preg_match('/^[a-f0-9]{8}\.(jpg|png|webp)$/', $name)) {
            $keep[$name] = true;
        }
    }
    foreach (scandir($dir) ?: [] as $file) {
        if (!preg_match('/^[a-f0-9]{8}\.(jpg|png|webp)$/', $file) || isset($keep[$file])) {
            continue;
        }
        $path = $dir . '/' . $file;
        if (is_file($path)) {
            unlink($path);
        }
    }
}

function api_prune_project_images(string $id, array $keepSrcs): void
{
    $dir = api_projects_image_dir();
    if (!is_dir($dir)) {
        return;
    }
    $keep = [];
    foreach ($keepSrcs as $src) {
        $name = basename((string) parse_url((string) $src, PHP_URL_PATH));
        if ($name !== '') {
            $keep[$name] = true;
        }
    }
    $pattern = '/^' . preg_quote($id, '/') . '-[a-f0-9]{8}\.(jpg|png|webp)$/';
    foreach (scandir($dir) ?: [] as $file) {
        if (!preg_match($pattern, $file) || isset($keep[$file])) {
            continue;
        }
        $path = $dir . '/' . $file;
        if (is_file($path)) {
            unlink($path);
        }
    }
}
