<?php
session_start();

// Vérifier explicitement la connexion Steam
if (!isset($_SESSION['steam_id'])) {
    header("Location: connexion.php");
    exit();
}

include 'header.php';
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Missions - Speedrun Trophée</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
</head>

<body>

    <main class="container mt-4">
        <section>
            <h2>🎯 Vos Missions Personnelles</h2>
            <p>Voici vos missions exclusives réservées aux utilisateurs connectés via Steam.</p>

            <ul>
                <li>Mission du jour : obtenir un trophée rare (moins de 5% d'obtention)</li>
                <li>Mission hebdomadaire : atteindre un nouveau record personnel</li>
                <li>Mission du mois : Obtenir 5 trophées rares dans différents jeux</li>
            </ul>
        </section>
    </main>

    <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2025 Speedrun Trophée - Tous droits réservés</p>
    </footer>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="dynamic-date.js"></script>
    <script src="form-validation.js"></script>
</body>

</html>

