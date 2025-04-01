<?php session_start(); ?>
<header class="bg-dark text-white px-4 py-3 mb-4 shadow">
    <div class="container d-flex justify-content-between align-items-center flex-wrap">
        <div class="d-flex align-items-center">
            <h1 class="h3 mb-0">🎮 <span class="font-weight-bold">Speedrun Trophée</span></h1>
        </div>
        <nav class="d-flex align-items-center flex-wrap">
            <a href="index.php" class="nav-link text-light mx-2">🏠 Accueil</a>
            <a href="missions.php" class="nav-link text-light mx-2">🎯 Missions</a>
            <a href="leaderboard.php" class="nav-link text-light mx-2">🏆 Classement</a>

            <?php if (isset($_SESSION['steam_id'])): ?>
                <a href="roue.php" class="nav-link text-light mx-2">🎡 Roue</a>
                <a href="profile.php" class="nav-link text-light mx-2">👤 Profil</a>
                <a href="recompenses.php" class="nav-link text-light mx-2">🎁 Récompenses</a>
                <a href="logout.php" class="nav-link text-warning mx-2">↩️ Déconnexion</a>
                
                <span class="text-info font-weight-bold ml-2"><?= htmlspecialchars($_SESSION['username'] ?? 'Utilisateur') ?></span>
            <?php else: ?>
                <a href="connexion.php" class="nav-link text-success mx-2">🔐 Connexion Steam</a>
            <?php endif; ?>
        </nav>
    </div>
</header>
