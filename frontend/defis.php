<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Défis - Speedrun Trophée</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- Your existing styles.css -->
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <?php include 'header.php'; ?>

    <main class="container mt-4">
        <section>
            <h2>Liste des défis</h2>
            <p>Relevez les défis du mois pour gagner des points et des récompenses !</p>

            <!-- Filter -->
            <div class="form-inline mb-3">
                <label for="gameFilter" class="mr-2">Filtrer par jeu:</label>
                <select class="form-control mr-2" id="gameFilter">
                    <option value="">Tous les jeux</option>
                    <option value="Game A">Game A</option>
                    <option value="Game B">Game B</option>
                    <option value="Game C">Game C</option>
                </select>

                <label for="trophyFilter" class="mr-2">Filtrer par trophée:</label>
                <input type="text" class="form-control mr-2" id="trophyFilter" placeholder="Entrez le nom du trophée">
            </div>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="text-center">Jeu</th>
                        <th class="text-center">Trophée</th>
                        <th class="text-center">Description</th>
                        <th class="text-center">Pourcentage de complétion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">Game A</td>
                        <td class="text-center">Trophée 1</td>
                        <td class="text-center">Atteindre le niveau 10 en moins de 1 heure.</td>
                        <td class="text-center">15%</td>
                    </tr>
                    <tr>
                        <td class="text-center">Game B</td>
                        <td class="text-center">Trophée 2</td>
                        <td class="text-center">Terminer le jeu en mode difficile sans mourir.</td>
                        <td class="text-center">5%</td>
                    </tr>
                    <tr>
                        <td class="text-center">Game C</td>
                        <td class="text-center">Trophée 3</td>
                        <td class="text-center">Collecter tous les objets cachés.</td>
                        <td class="text-center">25%</td>
                    </tr>
                    <tr>
                        <td class="text-center">Game A</td>
                        <td class="text-center">Trophée 4</td>
                        <td class="text-center">Tuer un boss.</td>
                        <td class="text-center">30%</td>
                    </tr>
                    <tr>
                        <td class="text-center">Game B</td>
                        <td class="text-center">Trophée 5</td>
                        <td class="text-center">Faire un combo.</td>
                        <td class="text-center">40%</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>

    <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2025 Speedrun Trophée - Tous droits réservés</p>
    </footer>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="defis-filter.js"></script>
    <script src="dynamic-date.js"></script>
</body>

</html>
