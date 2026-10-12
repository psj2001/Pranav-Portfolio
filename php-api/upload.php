<?php

require __DIR__ . '/lib/bootstrap.php';
api_boot();
api_require_auth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    api_fail(405, 'Use POST.');
}

$id = api_slug((string) ($_POST['id'] ?? ''));
$kind = (string) ($_POST['kind'] ?? 'project') === 'post' ? 'post' : 'project';
$track = (string) ($_POST['track'] ?? '');
if ($kind === 'post' && !in_array($track, ['software', 'marketing'], true)) {
    api_fail(400, 'Track is not valid.');
}
$file = $_FILES['image'] ?? null;
if (!is_array($file)) {
    api_fail(400, 'Choose an image.');
}
if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    api_fail(400, 'The image did not upload. Try a smaller file.');
}
if (!is_uploaded_file((string) ($file['tmp_name'] ?? ''))) {
    api_fail(400, 'Choose an image.');
}
if (($file['size'] ?? 0) > 8 * 1024 * 1024) {
    api_fail(400, 'Use an image under 8 MB.');
}

$info = @getimagesize((string) $file['tmp_name']);
if ($info === false) {
    api_fail(400, 'Choose a JPEG, PNG, or WebP image.');
}
$types = [
    IMAGETYPE_JPEG => 'jpg',
    IMAGETYPE_PNG => 'png',
    IMAGETYPE_WEBP => 'webp',
];
$type = $info[2] ?? 0;
if (!isset($types[$type])) {
    api_fail(400, 'Choose a JPEG, PNG, or WebP image.');
}

$width = (int) $info[0];
$height = (int) $info[1];
if ($width < 1 || $height < 1) {
    api_fail(400, 'Choose a JPEG, PNG, or WebP image.');
}

$name = ($kind === 'post' ? '' : $id . '-') . bin2hex(random_bytes(4)) . '.' . $types[$type];
$dest = $kind === 'post'
    ? api_post_image_folder($track, $id, true) . '/' . $name
    : api_projects_image_dir(true) . '/' . $name;
if (!move_uploaded_file((string) $file['tmp_name'], $dest)) {
    api_fail(500, 'Could not store the image.');
}
chmod($dest, 0644);

$alt = api_optional_text($_POST['alt'] ?? null, 160) ?? ($kind === 'post' ? 'Blog image' : 'Project screenshot');
$src = $kind === 'post'
    ? 'https://pranavps.com/api/uploads/posts/' . $track . '/' . $id . '/' . $name
    : 'https://pranavps.com/api/uploads/projects/' . $name;
api_ok([
    'src' => $src,
    'alt' => $alt,
    'width' => $width,
    'height' => $height,
]);
