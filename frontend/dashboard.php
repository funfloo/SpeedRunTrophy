<?php
session_start();
require 'config.php';

// Vérification de connexion Steam
if (!isset($_SESSION['steam_id'])) {
    header("Location: connexion.html");
    exit();
}

$steamId = $_SESSION['steam_id'];

// Connexion à la base MySQL pour récupérer les données utilisateur
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
    die("❌ Erreur MySQL : " . $conn->connect_error);
}

// Requête pour récupérer les infos utilisateur Steam
$sql = "SELECT nom_utilisateur, avatar FROM utilisateurs WHERE steam_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $steamId);
$stmt->execute();
$stmt->bind_result($username, $avatar);
$stmt->fetch();
$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Dashboard Utilisateur</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Speedrun Trophées</h1>
        <nav>
            <a href="leaderboard.html">🏆 Classement</a>
            <a href="missions.html">🎯 Missions</a>
            <a href="defis.html">🚩 Défis</a>
            <a href="logout.php">🚪 Déconnexion</a>
        </nav>
    </header>
    <main>
        <section class="user-profile">
            <img src="<?= htmlspecialchars($avatar) ?>" alt="Avatar Steam" class="avatar">
            <h2>Bienvenue, <?= htmlspecialchars($username) ?> ! Vous êtes connecté via Steam 🎮</h2>
        </section>

        <section>
            <h3>Trophées récents 🏅</h3>
            <p>Cette section peut afficher les derniers trophées synchronisés depuis Steam.</p>
        </section>

        <section>
            <h3>Jeux populaires 🎮</h3>
            <p>Cette section peut afficher vos jeux préférés ou les jeux populaires parmi les utilisateurs.</p>
        </section>
    </main>
    <footer>
        <p>© Speedrun Trophées 2025</p>
    </footer>
</body>
</html>
