<?php
session_start();
require_once 'config.php';
$connecte = isset($_SESSION['steam_id']);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Accueil - Speedrun Trophée</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../backend/styles.css">

    <style>
        body {
            background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
            color: #fff;
            font-family: 'Segoe UI', sans-serif;
        }

        /* ===================== */
        /* === Titre principal == */
        /* ===================== */
        .intro-box {
            background: rgba(0, 0, 0, 0.8);
            border: 3px solid #ff6f00;
            border-radius: 20px;
            padding: 60px 40px;
            box-shadow: 0 0 35px rgba(255, 111, 0, 0.8);
            text-align: center;
            max-width: 850px;
            margin: 0 auto 60px;
            animation: fadeIn 1.2s ease-in-out;
        }

        .intro-box h2 {
            font-size: 3.2rem;
            font-weight: 800;
            color: #ffb347;
            text-shadow: 0 0 20px #ff6f00, 0 0 30px #ff9f43;
        }

        .intro-box p {
            font-size: 1.4rem;
            color: #f8f8f8;
            margin-top: 20px;
        }

        /* ===================== */
        /* === Animations ==== */
        /* ===================== */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .carousel-item img {
            width: 100%;
            height: 500px;
            object-fit: cover;
            border-radius: 15px;
        }

        .carousel-caption {
            background: rgba(0,0,0,0.6);
            border-radius: 8px;
            padding: 10px 20px;
        }

        .btn-primary {
            background-color: #ff6f00;
            border: none;
            padding: 12px 25px;
            font-size: 1.1rem;
            transition: 0.3s ease;
        }

        .btn-primary:hover {
            background-color: #e65100;
        }

        #message {
            font-size: 1.2rem;
            font-weight: bold;
            color: #ffe58f;
        }
    </style>
</head>

<body>
<?php include 'header.php'; ?>

<main class="container py-5">
    <!-- 🎮 Bloc Speedrun Trophée retravaillé -->
    <section class="intro-box">
        <h2>🚀 Speedrun Trophée</h2>
        <p>
            Relevez des <strong>défis épiques</strong>, débloquez des <strong>trophées rares</strong><br>
            et hissez-vous au sommet du classement 🏆
        </p>
    </section>

    <!-- 🎮 Slider -->
    <section class="mb-5">
        <div id="gameCarousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#gameCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#gameCarousel" data-slide-to="1"></li>
                <li data-target="#gameCarousel" data-slide-to="2"></li>
            </ol>

            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../image/jeux/elden_ring.jpg" alt="Elden Ring">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Elden Ring</h5>
                        <p>Explorez un monde impitoyable rempli de secrets !</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="../image/jeux/miles_morales.jpg" alt="Miles Morales">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Miles Morales</h5>
                        <p>Plongez dans la peau du nouveau Spider-Man !</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="../image/jeux/delta_force.jpg" alt="Delta Force">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Delta Force</h5>
                        <p>Une expérience tactique intense à vivre entre amis !</p>
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

    <!-- 💬 Message aléatoire -->
    <section class="text-center">
        <button class="btn btn-primary mb-3" onclick="welcomeMessage()">Clique pour un message surprise !</button>
        <p id="message"></p>
    </section>
</main>

<footer class="bg-dark text-white text-center py-3">
    <p>&copy; 2025 Speedrun Trophée - Tous droits réservés</p>
</footer>

<!-- Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<!-- JS dynamique -->
<script>
    function welcomeMessage() {
        const messages = [
            "🔥 Ton prochain défi t'attend !",
            "💪 Prouve ta valeur et grimpe dans le classement !",
            "👑 Seul les meilleurs débloquent les trophées rares !",
            "🚀 Let's go, gamer ! À toi de jouer !"
        ];
        const message = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById('message').textContent = message;
    }
</script>
</body>
</html>
