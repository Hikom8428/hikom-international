<?php
require_once __DIR__ . '/includes/auth.php';

// Once config.php exists, setup can never run again - this is what stops
// anyone from re-running setup to hijack the admin account later.
if (seo_admin_config_exists()) {
    header('Location: login.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm = $_POST['confirm'] ?? '';

    if ($username === '' || $password === '') {
        $error = 'Username and password are required.';
    } elseif (strlen($password) < 8) {
        $error = 'Password must be at least 8 characters.';
    } elseif ($password !== $confirm) {
        $error = 'Passwords do not match.';
    } else {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $configContent = "<?php\nreturn [\n    'admin_user' => " . var_export($username, true)
            . ",\n    'admin_pass_hash' => " . var_export($hash, true) . ",\n];\n";

        if (file_put_contents(CONFIG_PATH, $configContent) === false) {
            $error = 'Could not write config.php - check that this folder is writable.';
        } else {
            header('Location: login.php?setup=done');
            exit;
        }
    }
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SEO Admin - First-time Setup</title>
<?php include __DIR__ . '/includes/styles.php'; ?>
</head>
<body>
<div class="wrap">
  <div class="card">
    <h1>SEO Admin - First-time Setup</h1>
    <p class="hint">This runs only once. Choose a username and password for the SEO control panel.</p>
    <?php if ($error): ?><div class="error"><?= htmlspecialchars($error) ?></div><?php endif; ?>
    <form method="post">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required autocomplete="username">

      <label for="password">Password</label>
      <input type="password" id="password" name="password" required minlength="8" autocomplete="new-password">

      <label for="confirm">Confirm Password</label>
      <input type="password" id="confirm" name="confirm" required minlength="8" autocomplete="new-password">

      <button type="submit">Create Admin Account</button>
    </form>
    <p class="hint">After this, delete or rename setup.php for extra security (not required, but recommended).</p>
  </div>
</div>
</body>
</html>
