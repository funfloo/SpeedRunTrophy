<?php
session_start();
require 'config.php';

if (!isset($_SESSION['steam_id'])) {
    header('Location: connexion.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Récompenses - Speedrun Trophée</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../backend/styles.css">
</head>
<body>

<?php include 'header.php'; ?>

<main class="container mt-5">
    <section class="text-white">
        <h2>🎁 Vos Récompenses</h2>
        <p>Accumulez des points pour débloquer les badges ci-dessous :</p>

        <ul class="list-group">
            <li class="list-group-item">🥉 <strong>Bronze</strong> : 100 points</li>
            <li class="list-group-item">🥈 <strong>Argent</strong> : 500 points</li>
            <li class="list-group-item">🥇 <strong>Or</strong> : 1000 points</li>
        </ul>
    </section>
</main>

</body>
</html>
