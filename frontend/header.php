<?php
if (session_status() === PHP_SESSION_NONE) session_start();
require_once 'config.php';

$connecte = false;
$username = '';

if (isset($_SESSION['steam_id'])) {
    $connecte = true;
    $steamId = $_SESSION['steam_id'];

    $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if (!$conn->connect_error) {
        $stmt = $conn->prepare("SELECT nom_utilisateur FROM utilisateurs WHERE steam_id=?");
        $stmt->bind_param("s", $steamId);
        $stmt->execute();
        $stmt->bind_result($username);
        $stmt->fetch();
        $stmt->close();
        $conn->close();
    }
}
?>

<header class="bg-dark text-white py-3">
    <div class="container d-flex justify-content-between align-items-center">
        <h1 class="m-0">Speedrun Trophées 🎮</h1>
        <nav class="d-flex align-items-center">
            <a href="index.php">🏠 Accueil</a>
            <a href="missions.php">🎯 Missions</a>
            <a href="leaderboard.php">🏆 Classement</a>
            <a href="defis.php">🚩 Défis</a>
            <?php if ($connecte): ?>
                <a href="profile.php">👤 Profil</a>
                <a href="roue.php">🎡 Roue</a>
                <a href="recompenses.php">🎁 Récompenses</a>
                <a href="logout.php">🚪 Déconnexion</a>
            <?php else: ?>
                <a href="connexion.php">🔑 Connexion</a>
                <a href="inscription.php">📝 Inscription</a>
            <?php endif; ?>
        </nav>

        <?php if ($connecte): ?>
            <div class="user-info text-white">
                <span class="pseudo">👤 <?= htmlspecialchars($username) ?></span>
            </div>
        <?php endif; ?>
    </div>
</header>