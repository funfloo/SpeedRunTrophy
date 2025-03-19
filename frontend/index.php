<?php
session_start();
require_once 'config.php';
$connecte = isset($_SESSION['steam_id']);
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil - Speedrun Trophée</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
    <style>
        .carousel-item img {
            width: 100%;
            height: 500px;
            object-fit: cover;
        }
    </style>
</head>

<body>
    <?php include 'header.php'; ?>

    <main class="container py-4">
        <section class="text-center mb-5">
            <h2>Bienvenue sur Speedrun Trophée !</h2>
            <p>Relevez des défis, décrochez des trophées et rejoignez la compétition !</p>
        </section>

        <!-- Slider de jeux populaires -->
        <section class="mb-5">
            <div id="gameCarousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#gameCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#gameCarousel" data-slide-to="1"></li>
                    <li data-target="#gameCarousel" data-slide-to="2"></li>
                </ol>

                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="elden_ring.jpg" alt="Elden Ring">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Elden Ring</h5>
                            <p>Explorez un univers vaste rempli de défis et d'aventures épiques.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="miles_morales.jpg" alt="Miles Morales">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Miles Morales</h5>
                            <p>Vivez l'aventure extraordinaire du nouveau Spider-Man.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="delta_force.jpg" alt="Delta Force">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Delta Force</h5>
                            <p>Affrontez vos adversaires dans des combats intenses et stratégiques.</p>
                        </div>
                    </div>
                </div>

                <a class="carousel-control-prev" href="#gameCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Précédent</span>
                </a>
                <a class="carousel-control-next" href="#gameCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Suivant</span>
                </a>
            </div>
        </section>

        <!-- Message dynamique JavaScript -->
        <section class="text-center">
            <button class="btn btn-primary" onclick="welcomeMessage()">Clique pour un message surprise !</button>
            <p id="message" class="mt-3"></p>
        </section>

    </main>

    <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2025 Speedrun Trophée - Tous droits réservés</p>
    </footer>

    <!-- Bootstrap JS, Popper.js, et jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <!-- Fonction JavaScript personnalisée -->
    <script>
        function welcomeMessage() {
            const messages = [
                "Prêt à battre ton record ? 🚀",
                "Que le meilleur gagne ! 🏆",
                "Bonne chance dans tes défis ! 🎯"
            ];
            const message = messages[Math.floor(Math.random() * messages.length)];
            document.getElementById('message').textContent = message;
        }
    </script>

</body>

</html>