<?php
require_once __DIR__ . '/includes/auth.php';
seo_admin_require_login();

$data = seo_admin_load_data();
ksort($data);

$editKey = isset($_GET['edit']) ? $_GET['edit'] : '';
$editEntry = $editKey !== '' && isset($data[$editKey]) ? $data[$editKey] : ['title' => '', 'description' => '', 'image' => ''];
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SEO Admin - Dashboard</title>
<?php include __DIR__ . '/includes/styles.php'; ?>
</head>
<body>
<div class="wrap">
  <div class="top-bar">
    <h1>SEO Control Panel</h1>
    <a href="logout.php" class="btn secondary">Log Out</a>
  </div>

  <?php if (isset($_GET['saved'])): ?><div class="success">Saved. Changes are live immediately.</div><?php endif; ?>
  <?php if (isset($_GET['deleted'])): ?><div class="success">Entry removed - that page now uses its default SEO text.</div><?php endif; ?>
  <?php if (isset($_GET['error'])): ?><div class="error"><?= htmlspecialchars($_GET['error']) ?></div><?php endif; ?>

  <div class="card">
    <h2><?= $editKey !== '' ? 'Edit Page' : 'Add / Update Page' ?></h2>
    <p class="hint">
      Page key: use <code>home</code>, <code>management</code>, <code>media</code> or <code>gallery</code> for those
      pages, or <code>category-slug/item-slug</code> (the part of the URL after hikom.in/) for a product page -
      e.g. <code>clean-room/puf-panel</code>.
    </p>
    <div class="quick-keys">
      <button type="button" class="secondary" onclick="document.getElementById('page_key').value='home'">home</button>
      <button type="button" class="secondary" onclick="document.getElementById('page_key').value='management'">management</button>
      <button type="button" class="secondary" onclick="document.getElementById('page_key').value='media'">media</button>
      <button type="button" class="secondary" onclick="document.getElementById('page_key').value='gallery'">gallery</button>
    </div>

    <form method="post" action="save.php">
      <label for="page_key">Page Key</label>
      <input type="text" id="page_key" name="page_key" value="<?= htmlspecialchars($editKey) ?>" required>

      <label for="title">Title</label>
      <input type="text" id="title" name="title" value="<?= htmlspecialchars($editEntry['title'] ?? '') ?>">

      <label for="description">Meta Description</label>
      <textarea id="description" name="description"><?= htmlspecialchars($editEntry['description'] ?? '') ?></textarea>

      <label for="image">Social Share Image URL (optional)</label>
      <input type="text" id="image" name="image" value="<?= htmlspecialchars($editEntry['image'] ?? '') ?>" placeholder="https://hikom.in/logo/logo-name.png">
      <p class="hint">Leave any field blank to keep that page's default text for it.</p>

      <button type="submit">Save</button>
    </form>
  </div>

  <div class="card">
    <h2>Configured Pages (<?= count($data) ?>)</h2>
    <?php if (empty($data)): ?>
      <p class="hint">No custom SEO entries yet - every page is using its built-in default title/description.</p>
    <?php else: ?>
      <table>
        <thead>
          <tr><th>Page Key</th><th>Title</th><th class="actions-cell">Actions</th></tr>
        </thead>
        <tbody>
          <?php foreach ($data as $key => $entry): ?>
            <tr>
              <td><?= htmlspecialchars($key) ?></td>
              <td><?= htmlspecialchars($entry['title'] ?? '') ?></td>
              <td class="actions-cell">
                <a href="dashboard.php?edit=<?= urlencode($key) ?>" class="btn secondary">Edit</a>
                <form method="post" action="save.php" onsubmit="return confirm('Remove custom SEO for this page?');">
                  <input type="hidden" name="page_key" value="<?= htmlspecialchars($key) ?>">
                  <input type="hidden" name="action" value="delete">
                  <button type="submit" class="danger">Delete</button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  </div>
</div>
</body>
</html>
