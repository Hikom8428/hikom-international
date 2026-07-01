<?php
session_start();

define('SEO_ADMIN_DIR', dirname(__DIR__));
define('CONFIG_PATH', SEO_ADMIN_DIR . '/config.php');
define('DATA_PATH', SEO_ADMIN_DIR . '/seo-data.json');

function seo_admin_config_exists() {
    return file_exists(CONFIG_PATH);
}

function seo_admin_load_config() {
    if (!seo_admin_config_exists()) {
        return null;
    }
    return require CONFIG_PATH;
}

function seo_admin_is_logged_in() {
    return !empty($_SESSION['seo_admin_logged_in']);
}

function seo_admin_require_login() {
    if (!seo_admin_is_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

function seo_admin_load_data() {
    if (!file_exists(DATA_PATH)) {
        return [];
    }
    $json = file_get_contents(DATA_PATH);
    $data = json_decode($json, true);
    return is_array($data) ? $data : [];
}

// Writes with an exclusive lock so two saves at the same time can't corrupt
// the file - this is the same JSON file the live React site fetches on every
// page load, so it always needs to be valid.
function seo_admin_save_data($data) {
    $fp = fopen(DATA_PATH, 'c+');
    if (!$fp) {
        return false;
    }
    flock($fp, LOCK_EX);
    ftruncate($fp, 0);
    fwrite($fp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    return true;
}
