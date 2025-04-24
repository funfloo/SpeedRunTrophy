<?php
session_start();
require 'config.php';

if (!isset($_SESSION['steam_id'])) {
    header("Location: connexion.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Récompenses</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../backend/styles.css">
</head>
<body>

<?php include 'header.php'; ?>

<main class="container mt-4">
    <div class="card bg-dark text-white shadow p-4">
        <h2>🎁 Vos Récompenses</h2>
        <p>Accumulez des points pour obtenir des récompenses exclusives :</p>
        <ul>
            <li><strong>🥉 Bronze:</strong> 100 points - Badge de Bronze</li>
            <li><strong>🥈 Argent:</strong> 500 points - Badge d'Argent</li>
            <li><strong>🥇 Or:</strong> 1000 points - Badge d'Or</li>
        </ul>
    </div>
</main>

</body>
</html>
