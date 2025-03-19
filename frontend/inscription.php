<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription - Speedrun Trophée</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- Your existing styles.css -->
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <?php include 'header.php'; ?>

    <main class="container mt-4">
        <section class="form-container">
            <h2>Inscription</h2>
            <form>
                <div class="form-group">
                    <label for="username">Nom d'utilisateur</label>
                    <input type="text" class="form-control" id="username" placeholder="Nom d'utilisateur" required>
                </div>
                <div class="form-group">
                    <label for="email">Adresse e-mail</label>
                    <input type="email" class="form-control" id="email" placeholder="Adresse e-mail" required>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" class="form-control" id="password" placeholder="Mot de passe" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirmer le mot de passe</label>
                    <input type="password" class="form-control" id="confirmPassword" placeholder="Confirmer le mot de passe" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">S'inscrire</button>
            </form>
            <div class="switch-form mt-3 text-center">
                Déjà un compte ? <a href="connexion.html">Connectez-vous</a>
            </div>
        </section>
    </main>

    <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2025 Speedrun Trophée - Tous droits réservés</p>
    </footer>
    <!-- Bootstrap JavaScript (Popper.js and jQuery are required) -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="dynamic-date.js"></script>
    <script src="form-validation.js"></script>
    <script src="password-toggle.js"></script>
</body>

</html>
