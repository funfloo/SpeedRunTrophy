<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['steam_id'])) {
    header("Location: connexion.php");
    exit();
}

$steamId = $_SESSION['steam_id'];

// Connexion BDD
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

// Récupérer l'utilisateur
$stmt = $conn->prepare("SELECT id, nom_utilisateur FROM utilisateurs WHERE steam_id = ?");
$stmt->bind_param("s", $steamId);
$stmt->execute();
$stmt->bind_result($userId, $username);
$stmt->fetch();
$stmt->close();

// 🔹 JEUX du joueur
$jeux = [];
$sql = "SELECT j.nom FROM jeux j
        JOIN progression_utilisateur p ON j.id = p.id_jeu
        WHERE p.id_utilisateur = ?
        GROUP BY j.id";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $jeux[] = $row['nom'];
}
$stmt->close();

// 🔹 TROPHÉES obtenus
$trophees = [];
$sql = "SELECT t.nom, t.description
        FROM progression_utilisateur pu
        JOIN trophees t ON pu.id_trophee = t.id
        WHERE pu.id_utilisateur = ?";
$stmt = $conn->prepare($sql);
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
    <title>Mon Profil - Speedrun Trophée</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../backend/styles.css">
</head>
<body>

<?php include 'header.php'; ?>

<main class="container mt-4">
    <section>
        <h2>👤 Mon Profil</h2>

        <h4>🎮 Mes Jeux</h4>
        <?php if (!empty($jeux)): ?>
            <ul>
                <?php foreach ($jeux as $jeu): ?>
                    <li><?= htmlspecialchars($jeu) ?></li>
                <?php endforeach; ?>
            </ul>
        <?php else: ?>
            <p>Aucun jeu détecté. Lance la synchronisation Steam.</p>
        <?php endif; ?>

        <h4 class="mt-4">🏆 Mes Trophées</h4>
        <?php if (!empty($trophees)): ?>
            <ul>
                <?php foreach ($trophees as $t): ?>
                    <li><strong><?= htmlspecialchars($t['nom']) ?>:</strong> <?= htmlspecialchars($t['description']) ?></li>
                <?php endforeach; ?>
            </ul>
        <?php else: ?>
            <p>Pas encore de trophées débloqués.</p>
        <?php endif; ?>
    </section>
</main>

<footer class="bg-dark text-white text-center py-3">
    <p>&copy; 2025 Speedrun Trophée - Tous droits réservés</p>
</footer>

</body>
</html>
