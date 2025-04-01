<?php
session_start();
if (!isset($_SESSION['steam_id'])) {
    header("Location: connexion.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Missions - Speedrun Trophée</title>
    <link rel="stylesheet" href="../backend/styles.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
<?php include 'header.php'; ?>

<main class="container mt-5 text-white">
    <h2 class="mb-4">🎯 Missions du jour</h2>

    <div class="card bg-dark text-white p-3 mb-3">
        <h4>Défi quotidien</h4>
        <p>Accomplis un défi parmi tes jeux les plus joués !</p>
    </div>

    <div class="card bg-dark text-white p-3 mb-3">
        <h4>Défi hebdomadaire</h4>
        <p>Termine un succès de rareté moyenne sur n'importe quel jeu.</p>
    </div>

    <div class="card bg-dark text-white p-3">
        <h4>Défi du mois</h4>
        <p>Débloque un succès extrêmement rare !</p>
    </div>
</main>
</body>
</html>
