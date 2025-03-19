<?php
session_start();
if (!isset($_SESSION['steam_id'])) {
    header("Location: connexion.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Récompenses - Speedrun Trophée</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <?php include 'header.php'; ?>

    <main class="container mt-4">
        <section>
            <h2>🎁 Vos Récompenses</h2>
            <p>Accumulez des trophées et relevez des défis pour gagner ces récompenses :</p>
            <ul>
                <li>🏅 <strong>Badge Bronze</strong> – Obtenez 10 trophées.</li>
                <li>🥈 Badge d'argent (50 trophées obtenus)</li>
                <li>🥇 Badge d'Or (100 trophées obtenus)</li>
                <li>✨ Badge Platine (150 trophées obtenus)</li>
            </ul>
        </section>
    </main>

    <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2025 Speedrun Trophée</p>
    </footer>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="dynamic-date.js"></script>
</body>

</html>
