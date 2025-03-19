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
    <title>Roue de Sélection - Speedrun Trophée</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
    <style>
        .wheel-container {
            position: relative;
            width: 300px;
            height: 300px;
            margin: 20px auto;
            border-radius: 50%;
            overflow: hidden;
            transition: transform 5s ease-in-out;
        }

        .wheel {
            width: 100%;
            height: 100%;
            position: absolute;
        }

        .wheel-segment {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
            transform-origin: 50% 50%;
            text-align: center;
            line-height: 300px;
            font-size: 1.2rem;
            color: white;
        }

        .spin-button {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.1rem;
        }

        .wheel-filter {
            margin: 10px auto;
            text-align: center;
        }

        .wheel-filter label {
            margin-right: 10px;
        }
    </style>
</head>

<body>
    <?php include 'header.php'; ?>

    <main class="container mt-4">
        <section>
            <h2>Sélection Aléatoire</h2>
            <p>Faites tourner les roues pour choisir un jeu et un trophée au hasard !</p>

            <h3>Roue des Jeux</h3>
            <div class="wheel-filter">
                <label for="gameFilter" class="mr-2">Filtrer par jeu:</label>
                <select class="form-control" id="gameFilter">
                    <option value="">Tous les jeux</option>
                    <option value="Game A">Game A</option>
                    <option value="Game B">Game B</option>
                    <option value="Game C">Game C</option>
                    <option value="Game D">Game D</option>
                    <option value="Game E">Game E</option>
                </select>
            </div>
            <div class="wheel-container" id="gameWheelContainer">
                <div class="wheel" id="gameWheel"></div>
            </div>
            <button class="spin-button btn btn-primary" onclick="spinGameWheel()">Faire tourner la roue des Jeux</button>
            <p id="selectedGame">Jeu sélectionné : <span id="gameResult"></span></p>

            <h3>Roue des Trophées</h3>
            <div class="wheel-container" id="trophyWheelContainer">
                <div class="wheel" id="trophyWheel"></div>
            </div>
            <button class="spin-button btn btn-primary" onclick="spinTrophyWheel()">Faire tourner la roue des Trophées</button>
            <p id="selectedTrophy">Trophée sélectionné : <span id="trophyResult"></span></p>
        </section>
    </main>

    <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2025 Speedrun Trophée - Tous droits réservés</p>
    </footer>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="script_roue.js"></script>
</body>

</html>
