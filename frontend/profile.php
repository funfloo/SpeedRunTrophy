<?php
session_start();
require 'config.php';

if (!isset($_SESSION['steam_id'])) {
    header("Location: connexion.php");
    exit();
}

// Connexion à la base de données
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// 🔍 Récupération des infos utilisateur
$stmt = $conn->prepare("SELECT id, nom_utilisateur FROM utilisateurs WHERE steam_id = ?");
$stmt->bind_param("s", $_SESSION['steam_id']);
$stmt->execute();
$stmt->bind_result($userId, $username);
$stmt->fetch();
$stmt->close();

// 🔁 Jeux (10 aléatoires)
$jeux = [];
$stmt = $conn->prepare("
    SELECT DISTINCT j.nom FROM jeux j
    JOIN progression_utilisateur p ON j.id = p.id_jeu
    WHERE p.id_utilisateur = ?
    ORDER BY RAND() LIMIT 10
");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $jeux[] = $row['nom'];
}
$stmt->close();

// 🏆 Trophées (20 aléatoires)
$trophees = [];
$stmt = $conn->prepare("
    SELECT t.nom, t.description FROM trophees t
    JOIN progression_utilisateur p ON t.id = p.id_trophee
    WHERE p.id_utilisateur = ?
    ORDER BY RAND() LIMIT 20
");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $trophees[] = $row;
}
$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Profil - Speedrun Trophée</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../backend/styles.css">
</head>
<body>

<?php include 'header.php'; ?>

<main class="container mt-4 text-white">
    <h2 class="mb-4">👤 Profil de <?= htmlspecialchars($username) ?></h2>

    <h4>🎮 10 Jeux aléatoires</h4>
    <div class="row">
        <?php foreach ($jeux as $jeu): ?>
            <div class="col-md-4 mb-3">
                <div class="card bg-dark text-white shadow">
                    <div class="card-body">
                        <h5 class="card-title"><?= htmlspecialchars($jeu) ?></h5>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
        <?php if (empty($jeux)): ?>
            <p class="text-warning">Aucun jeu détecté.</p>
        <?php endif; ?>
    </div>

    <h4 class="mt-5">🏆 20 Trophées obtenus</h4>
    <div class="row">
        <?php foreach ($trophees as $t): ?>
            <div class="col-md-6 mb-3">
                <div class="card bg-secondary text-white shadow">
                    <div class="card-body">
                        <h5 class="card-title"><?= htmlspecialchars($t['nom']) ?></h5>
                        <p class="card-text"><?= htmlspecialchars($t['description']) ?: 'Pas de description.' ?></p>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
        <?php if (empty($trophees)): ?>
            <p class="text-warning">Aucun trophée trouvé.</p>
        <?php endif; ?>
    </div>
</main>

</body>
</html>
