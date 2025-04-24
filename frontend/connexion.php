<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Connexion - Speedrun Trophée</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

    <style>
        html, body {
            height: 100%;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            background: linear-gradient(to right, #1f1c2c, #928dab);
            font-family: 'Segoe UI', sans-serif;
        }

        main {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-box {
            background-color: #fff;
            max-width: 500px;
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
            text-align: center;
            color: #ddd;
            font-size: 0.9rem;
            padding: 20px 0;
        }
    </style>
</head>
<body>

<?php include 'header.php'; ?>

<main>
    <div class="login-box">
        <h2>Bienvenue sur Speedrun Trophée</h2>
        <p>🎮 Connectez-vous avec Steam pour débloquer vos trophées,<br>
        participer à des défis et grimper dans le classement !</p>

        <a href="login.php">
            <img src="https://steamcommunity.com/public/images/signinthroughsteam/sits_01.png" 
                 alt="Connexion Steam">
        </a>
    </div>
</main>

<div class="footer-text">
    &copy; 2025 Speedrun Trophée - Connectez-vous pour vivre l’expérience complète
</div>

</body>
</html>
