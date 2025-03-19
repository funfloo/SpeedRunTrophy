<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Classement - Speedrun Trophée</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- Your existing styles.css -->
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <?php include 'header.php'; ?>

    <main class="container mt-4">
        <section>
            <h2>Classement des joueurs</h2>
            <p>Découvrez les meilleurs joueurs de Speedrun Trophée !</p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="text-center">Position</th>
                        <th class="text-center">Nom d'utilisateur</th>
                        <th class="text-center">Points</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td class="text-center">Joueur 1</td>
                        <td class="text-center">1000</td>
                    </tr>
                    <tr>
                        <td class="text-center">2</td>
                        <td class="text-center">Joueur 2</td>
                        <td class="text-center">900</td>
                    </tr>
                    <tr>
                        <td class="text-center">3</td>
                        <td class="text-center">Joueur 3</td>
                        <td class="text-center">800</td>
                    </tr>
                </tbody>
            </table>
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
    <script src="leaderboard-sort.js"></script>
</body>

</html>
