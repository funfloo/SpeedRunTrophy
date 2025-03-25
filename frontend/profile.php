<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['steam_id'])) {
    header("Location: connexion.php");
    exit();
}

$steamId = $_SESSION['steam_id'];

// Connexion BDD
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

// Récupérer l'utilisateur
$stmt = $conn->prepare("SELECT id, nom_utilisateur FROM utilisateurs WHERE steam_id = ?");
$stmt->bind_param("s", $steamId);
$stmt->execute();
$stmt->bind_result($userId, $username);
$stmt->fetch();
$stmt->close();

// 🔹 TOUS les JEUX
$jeux = [];
$sql = "SELECT DISTINCT j.nom FROM jeux j
        JOIN progression_utilisateur p ON j.id = p.id_jeu
        WHERE p.id_utilisateur = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $jeux[] = $row['nom'];
}
$stmt->close();

// 🔹 TOUS les TROPHÉES
$trophees = [];
$sql = "SELECT t.nom, t.description FROM progression_utilisateur pu
        JOIN trophees t ON pu.id_trophee = t.id
        WHERE pu.id_utilisateur = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $trophees[] = $row;
}
$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mon Profil - Speedrun Trophée</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../backend/styles.css">
</head>
<body>

<?php include 'header.php'; ?>

<main class="container mt-4">
    <section>
        <h2 class="mb-4">👤 Bienvenue <?= htmlspecialchars($username) ?></h2>

        <div class="mb-5">
            <h4 class="mb-3">🎮 10 jeux sélectionnés</h4>
            <div class="row" id="games-container"></div>
        </div>

        <div>
            <h4 class="mb-3">🏆 20 trophées débloqués</h4>
            <div class="row" id="trophies-container"></div>
        </div>
    </section>
</main>

<footer class="bg-dark text-white text-center py-3">
    <p>&copy; 2025 Speedrun Trophée - Tous droits réservés</p>
</footer>

<script>
    // Données injectées depuis PHP
    const allGames = <?= json_encode($jeux) ?>;
    const allTrophies = <?= json_encode($trophees) ?>;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function renderCards(items, containerId, type) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        items.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-3';

            const card = document.createElement('div');
            card.className = 'card bg-dark text-white h-100 shadow';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const title = document.createElement('h5');
            title.className = 'card-title';
            title.innerText = type === 'game' ? item : item.nom;

            cardBody.appendChild(title);

            if (type === 'trophy') {
                const desc = document.createElement('p');
                desc.className = 'card-text';
                desc.innerText = item.description || 'Sans description';
                cardBody.appendChild(desc);
            }

            card.appendChild(cardBody);
            col.appendChild(card);
            container.appendChild(col);
        });
    }

    // Sélection aléatoire et affichage
    document.addEventListener('DOMContentLoaded', () => {
        const randomGames = shuffle(allGames).slice(0, 10);
        const randomTrophies = shuffle(allTrophies).slice(0, 20);
        renderCards(randomGames, 'games-container', 'game');
        renderCards(randomTrophies, 'trophies-container', 'trophy');
    });
</script>

</body>
</html>
