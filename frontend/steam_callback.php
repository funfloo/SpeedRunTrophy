<?php
session_start();
require_once '../vendor/autoload.php'; // Assurez-vous que ce chemin est correct

use LightOpenID;

$openid = new LightOpenID('http://localhost/steam_callback.php'); // L'URL de votre callback

if (!$openid->mode) {
    // Démarrer le processus de connexion
    $openid->identity = 'http://steamcommunity.com/openid';
    header('Location: ' . $openid->authUrl());
    exit();
} elseif ($openid->mode == 'cancel') {
    echo 'Connexion annulée.';
} else {
    // Si l'utilisateur est connecté
    if ($openid->validate()) {
        $steamId = str_replace('https://steamcommunity.com/openid/id/', '', $openid->identity);
        $_SESSION['steam_id'] = $steamId;
        $_SESSION['username'] = 'Utilisateur Steam'; // Vous pouvez ici récupérer d'autres infos utilisateur via Steam API

        // Rediriger vers la page de profil après la connexion
        header('Location: profile.php');
        exit();
    } else {
        echo 'Connexion échouée.';
    }
}
?>
