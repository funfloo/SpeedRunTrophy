<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - Speedrun Trophée</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- Votre fichier CSS -->
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            background: linear-gradient(to right, #1f1c2c, #928dab);
            color: #333;
            font-family: 'Segoe UI', sans-serif;
        }

        .login-box {
            background-color: #fff;
            max-width: 500px;
            margin: 80px auto;
            padding: 40px 30px;
            border-radius: 12px;
            box-shadow: 0 0 30px rgba(0,0,0,0.2);
            text-align: center;
        }

        .login-box h2 {
            margin-bottom: 15px;
            font-weight: 700;
            color: #4b4b4b;
        }

        .login-box p {
            font-size: 1.1rem;
            color: #555;
        }

        .login-box img {
            margin-top: 25px;
            transition: transform 0.2s ease;
        }

        .login-box img:hover {
            transform: scale(1.05);
        }

        .footer-text {
            margin-top: 60px;
            text-align: center;
            color: #ddd;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>

<?php include 'header.php'; ?>

<main class="container">
    <div class="login-box">
        <h2>Bienvenue sur Speedrun Trophée</h2>
        <p>🎮 Connectez-vous avec Steam pour débloquer vos trophées,<br>
        participer à des défis et grimper dans le classement !</p>

        <a href="steam_callback.php">
            <img src="https://steamcommunity.com/public/images/signinthroughsteam/sits_01.png" 
                 alt="Connexion Steam">
        </a>
    </div>
</main>

<div class="footer-text">
    &copy; 2025 Speedrun Trophée - Connectez-vous pour vivre l’expérience complète
</div>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</body>
</html>
