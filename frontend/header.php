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
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <!-- Logo + Titre -->
        <div class="d-flex align-items-center mb-3 mb-md-0">
            <span class="h3 mb-0 mr-2">🎮</span>
            <h1 class="h4 mb-0">Speedrun Trophées</h1>
        </div>

        <!-- Navigation -->
        <div class="d-flex flex-column flex-md-row align-items-center">
            <nav class="d-flex flex-wrap align-items-center justify-content-center mb-2 mb-md-0">
                <a href="index.php" class="nav-link text-primary">🏠 Accueil</a>
                <a href="missions.php" class="nav-link text-primary">🎯 Missions</a>
                <a href="leaderboard.php" class="nav-link text-primary">🏆 Classement</a>
                <a href="defis.php" class="nav-link text-primary">🚩 Défis</a>

                <?php if ($connecte): ?>
                    <a href="profile.php" class="nav-link text-primary">👤 Profil</a>
                    <a href="roue.php" class="nav-link text-primary">🎡 Roue</a>
                    <a href="recompenses.php" class="nav-link text-primary">🎁 Récompenses</a>
                    <a href="logout.php" class="nav-link text-warning">↩️ Déconnexion</a>
                <?php else: ?>
                    <a href="connexion.php" class="nav-link text-success">🔑 Connexion</a>
                    <a href="inscription.php" class="nav-link text-success">📝 Inscription</a>
                <?php endif; ?>
            </nav>

            <!-- Pseudo à droite -->
            <?php if ($connecte): ?>
                <div class="text-light font-weight-bold ml-md-3 mt-2 mt-md-0"><?= htmlspecialchars($username) ?></div>
            <?php endif; ?>
        </div>
    </div>
</header>
