<?php
require_once __DIR__ . '/includes/auth.php';

if (!seo_admin_config_exists()) {
    header('Location: setup.php');
} elseif (seo_admin_is_logged_in()) {
    header('Location: dashboard.php');
} else {
    header('Location: login.php');
}
exit;
