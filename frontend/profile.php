<?php
session_start();
require 'config.php';

if (!isset($_SESSION['steam_id'])) {
    header("Location: connexion.php");
    exit();
}

$steamId = $_SESSION['steam_id'];
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) die("❌ Erreur MySQL : " . $conn->connect_error);

// 🔹 Récupérer les jeux du joueur
$games = [];
$sql = "SELECT j.nom 
        FROM jeux j
        JOIN jeux_utilisateur ju ON j.id = ju.id_jeu
        JOIN utilisateurs u ON ju.id_utilisateur = u.id
        WHERE u.steam_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $steamId);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $games[] = $row;
}
$stmt->close();

// 🔹 Récupérer les trophées du joueur
$trophies = [];
$sql = "SELECT t.nom, t.description, t.rarete, j.nom AS jeu
        FROM progression_utilisateur p
        JOIN trophees t ON p.id_trophee = t.id
        JOIN jeux j ON t.steam_appid = j.steam_appid
        JOIN utilisateurs u ON p.id_utilisateur = u.id
        WHERE u.steam_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $steamId);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $trophies[] = $row;
}
$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Profil - Speedrun Trophée</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <?php include 'header.php'; ?>
    
    <main class="container">
        <h2>👤 Mon Profil</h2>
        <h3>🎮 Mes Jeux</h3>
        <ul>
            <?php foreach ($games as $game): ?>
                <li><?= htmlspecialchars($game['nom']) ?></li>
            <?php endforeach; ?>
        </ul>

        <h3>🏆 Mes Trophées</h3>
        <ul>
            <?php foreach ($trophies as $trophy): ?>
                <li>
                    <strong><?= htmlspecialchars($trophy['nom']) ?></strong> - <?= htmlspecialchars($trophy['jeu']) ?>
                    <p><?= htmlspecialchars($trophy['description']) ?> (Rare: <?= $trophy['rarete'] ?>%)</p>
                </li>
            <?php endforeach; ?>
        </ul>
    </main>
</body>
</html>
