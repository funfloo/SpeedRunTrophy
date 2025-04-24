<?php if (session_status() === PHP_SESSION_NONE) session_start(); ?>

<?php $isGuest = !isset($_SESSION['steam_id']); ?>
<?php $layoutClass = $isGuest ? 'justify-content-start' : 'justify-content-between'; ?>

<header class="bg-dark text-white py-3 mb-4 shadow">
    <div class="container d-flex <?= $layoutClass ?> align-items-center flex-wrap">
        <div class="d-flex align-items-center mr-4 mb-2 mb-md-0">
            <span style="font-size: 1.8rem; margin-right: 10px;">🎮</span>
            <h1 class="h4 mb-0 font-weight-bold">Speedrun Trophée</h1>
        </div>

        <nav class="d-flex align-items-center flex-wrap">
            <a href="index.php" class="nav-link text-light mx-2">🏠 Accueil</a>
            <a href="missions.php" class="nav-link text-light mx-2">🎯 Missions</a>
            <a href="leaderboard.php" class="nav-link text-light mx-2">🏆 Classement</a>

            <?php if (!$isGuest): ?>
                <a href="roue.php" class="nav-link text-light mx-2">🎡 Roue</a>
                <a href="profile.php" class="nav-link text-light mx-2">👤 Profil</a>
                <a href="recompenses.php" class="nav-link text-light mx-2">🎁 Récompenses</a>
                <a href="logout.php" class="nav-link text-warning mx-2">↩️ Déconnexion</a>
                <span class="text-info font-weight-bold ml-2">
                    <?= htmlspecialchars($_SESSION['username'] ?? 'Utilisateur') ?>
                </span>
            <?php else: ?>
                <a href="connexion.php" class="nav-link text-success mx-2">🔐 Connexion Steam</a>
            <?php endif; ?>
        </nav>
    </div>
</header>
