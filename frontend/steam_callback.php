<?php
session_start();
require 'config.php';

// Simulation du retour Steam, suppose que $steamId a été récupéré
$steamId = $_SESSION['steam_id'] ?? null;

if (!$steamId) {
    header("Location: connexion.php");
    exit();
}

// Connexion BDD
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// Récupère nom utilisateur Steam dans la BDD
$stmt = $conn->prepare("SELECT nom_utilisateur FROM utilisateurs WHERE steam_id = ?");
$stmt->bind_param("s", $steamId);
$stmt->execute();
$stmt->bind_result($username);
$stmt->fetch();
$stmt->close();
$conn->close();

// Stocke dans la session
$_SESSION['username'] = $username;

// Redirige vers index ou profil
header("Location: index.php");
exit();
