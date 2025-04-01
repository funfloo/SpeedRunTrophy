<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['steam_id'])) {
    header('Location: connexion.php'); // Redirige vers la page de connexion si non connecté
    exit();
}

$steamId = $_SESSION['steam_id'];
$username = $_SESSION['username'];

// Connexion à la base de données
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
    die('Erreur de connexion à la base de données : ' . $conn->connect_error);
}

// Récupérer les jeux et trophées de l'utilisateur
$jeux = [];
$trophees = [];

$sql = "SELECT j.nom FROM jeux j
        JOIN progression_utilisateur p ON j.id = p.id_jeu
        WHERE p.id_utilisateur = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $_SESSION['steam_id']);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $jeux[] = $row['nom'];
}

$stmt->close();

// Récupérer les trophées de l'utilisateur
$sql = "SELECT t.nom, t.description FROM trophees t
        JOIN progression_utilisateur pu ON pu.id_trophee = t.id
        WHERE pu.id_utilisateur = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $_SESSION['steam_id']);
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
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<?php include 'header.php'; ?>

<main class="container mt-4">
    <h2>Profil de <?= htmlspecialchars($username) ?></h2>

    <h3>🎮 Mes jeux</h3>
    <ul>
        <?php foreach ($jeux as $jeu): ?>
            <li><?= htmlspecialchars($jeu) ?></li>
        <?php endforeach; ?>
    </ul>

    <h3>🏆 Mes trophées</h3>
    <ul>
        <?php foreach ($trophees as $trophee): ?>
            <li><strong><?= htmlspecialchars($trophee['nom']) ?>:</strong> <?= htmlspecialchars($trophee['description']) ?></li>
        <?php endforeach; ?>
    </ul>
</main>

</body>
</html>
