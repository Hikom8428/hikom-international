<?php
require_once __DIR__ . '/includes/auth.php';
seo_admin_require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: dashboard.php');
    exit;
}

$action = $_POST['action'] ?? 'save';
$key = trim($_POST['page_key'] ?? '');

if ($key === '') {
    header('Location: dashboard.php?error=' . urlencode('Page key is required.'));
    exit;
}

// Page keys mirror the site's own URL slugs (e.g. "home", "gallery", or
// "clean-room/puf-panel" for a product page), so only letters/numbers/hyphen/slash.
if (!preg_match('/^[a-z0-9\-\/]+$/i', $key)) {
    header('Location: dashboard.php?error=' . urlencode('Page key can only contain letters, numbers, hyphens and /'));
    exit;
}

$data = seo_admin_load_data();

if ($action === 'delete') {
    unset($data[$key]);
    seo_admin_save_data($data);
    header('Location: dashboard.php?deleted=1');
    exit;
}

$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$image = trim($_POST['image'] ?? '');

$entry = [];
if ($title !== '') $entry['title'] = $title;
if ($description !== '') $entry['description'] = $description;
if ($image !== '') $entry['image'] = $image;

if (empty($entry)) {
    unset($data[$key]);
} else {
    $data[$key] = $entry;
}

seo_admin_save_data($data);
header('Location: dashboard.php?saved=1');
exit;
