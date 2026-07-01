<?php
require_once __DIR__ . '/includes/auth.php';

if (!seo_admin_config_exists()) {
    header('Location: setup.php');
    exit;
}

if (seo_admin_is_logged_in()) {
    header('Location: dashboard.php');
    exit;
}

$config = seo_admin_load_config();
$error = '';

if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Basic brute-force throttle - slows down repeated guesses without
    // needing a database-backed rate limiter for what's a low-traffic,
    // single-user login form.
    if ($_SESSION['login_attempts'] >= 5) {
        $error = 'Too many failed attempts. Please wait a minute and try again.';
        sleep(3);
    } else {
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';

        if ($username === $config['admin_user'] && password_verify($password, $config['admin_pass_hash'])) {
            session_regenerate_id(true);
            $_SESSION['seo_admin_logged_in'] = true;
            $_SESSION['login_attempts'] = 0;
            header('Location: dashboard.php');
            exit;
        }

        $_SESSION['login_attempts']++;
        $error = 'Invalid username or password.';
        sleep(1);
    }
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SEO Admin - Login</title>
<?php include __DIR__ . '/includes/styles.php'; ?>
</head>
<body>
<div class="wrap">
  <div class="card">
    <h1>SEO Admin Login</h1>
    <?php if (isset($_GET['setup']) && $_GET['setup'] === 'done'): ?>
      <div class="success">Admin account created. Please log in.</div>
    <?php endif; ?>
    <?php if ($error): ?><div class="error"><?= htmlspecialchars($error) ?></div><?php endif; ?>
    <form method="post">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required autocomplete="username">

      <label for="password">Password</label>
      <input type="password" id="password" name="password" required autocomplete="current-password">

      <button type="submit">Log In</button>
    </form>
  </div>
</div>
</body>
</html>
