<?php
session_start();
require 'openid.php';

try {
    $openid = new LightOpenID('localhost');
    if (!$openid->mode) {
        $openid->identity = 'https://steamcommunity.com/openid';
        header('Location: ' . $openid->authUrl());
        exit();
    } elseif ($openid->mode == 'cancel') {
        echo 'Connexion annulée.';
    } else {
        if ($openid->validate()) {
            $_SESSION['steam_id'] = basename($openid->identity);
            header('Location: steam_callback.php');
            exit();
        } else {
            echo 'Validation échouée.';
        }
    }
} catch (Exception $e) {
    echo 'Erreur : ' . $e->getMessage();
}
?>
