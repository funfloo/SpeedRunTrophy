<?php
session_start();
require 'config.php';

if (!isset($_SESSION['steam_id'])) {
    echo "<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'><title>Missions</title>
          <link rel='stylesheet' href='../backend/styles.css'>
          <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'></head><body>";
    include 'header.php';
    echo "<main class='container mt-5'><div class='alert alert-warning text-center'>🚫 Veuillez vous connecter pour accéder à vos missions.</div></main>";
    echo "</body></html>";
    exit();
}

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
$stmt = $conn->prepare("SELECT id FROM utilisateurs WHERE steam_id = ?");
$stmt->bind_param("s", $_SESSION['steam_id']);
$stmt->execute();
$stmt->bind_result($userId);
$stmt->fetch();
$stmt->close();

$sql = "
    SELECT t.nom, t.description, t.rarete, j.nom AS jeu, j.id AS id_jeu
    FROM trophees t
    JOIN jeux j ON t.id_jeu = j.id
    WHERE t.rarete IS NOT NULL
    AND j.id IN (
        SELECT DISTINCT id_jeu FROM progression_utilisateur WHERE id_utilisateur = $userId
    )
";
$result = $conn->query($sql);
$tropheesAvecRarete = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Missions - Speedrun Trophée</title>
    <link rel="stylesheet" href="../backend/styles.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        .defi-card {
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 30px;
            color: white;
        }

        .defi-jour {
            background: linear-gradient(135deg, #00c6ff, #0072ff);
        }

        .defi-semaine {
            background: linear-gradient(135deg, #f7971e, #ffd200);
        }

        .defi-mois {
            background: linear-gradient(135deg, #ff416c, #ff4b2b);
        }

        .badge-custom {
            background-color: rgba(255,255,255,0.15);
            font-size: 0.9rem;
            padding: 6px 12px;
            border-radius: 8px;
        }

        .defi-header {
            font-size: 1.6rem;
            font-weight: bold;
        }

        .btn-refresh {
            background-color: #ffffff22;
            color: white;
            border: 1px solid #fff;
        }

        .btn-refresh:hover {
            background-color: #ffffff33;
        }
    </style>
</head>
<body>

<?php include 'header.php'; ?>

<main class="container mt-4">
    <h2 class="text-white mb-4">🔥 Vos Missions</h2>

    <div id="defi-jour"></div>
    <div class="text-right mb-5">
        <button onclick="changerDefiJour()" class="btn btn-refresh btn-sm">🔁 Changer le défi du jour</button>
    </div>

    <div id="defi-semaine"></div>
    <div id="defi-mois"></div>
</main>

<footer class="bg-dark text-white text-center py-3">
    <p>&copy; 2025 Speedrun Trophée - Tous droits réservés</p>
</footer>

<script>
const allTrophies = <?= json_encode($tropheesAvecRarete) ?>;

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function renderDefi(title, trophy, containerId, className) {
    const container = document.getElementById(containerId);
    if (!trophy) {
        container.innerHTML = `<div class="alert alert-warning">Aucun trophée disponible pour ${title}</div>`;
        return;
    }

    container.innerHTML = `
        <div class="defi-card ${className} shadow">
            <div class="defi-header mb-2">${title}</div>
            <h5>🏆 ${trophy.nom}</h5>
            <p class="mb-1">${trophy.description || "Pas de description disponible."}</p>
            <p>🎮 <strong>${trophy.jeu}</strong></p>
            <span class="badge-custom">Rareté : ${parseFloat(trophy.rarete).toFixed(2)}%</span>
        </div>
    `;
}

function genererDefisSelonRarete() {
    const now = new Date();

    // 🔹 JOUR (> 80%)
    const dateJour = localStorage.getItem('date_jour');
    const savedJour = localStorage.getItem('defi_jour');
    const jourExp = new Date(dateJour);

    if (!savedJour || isNaN(jourExp) || now.toDateString() !== jourExp.toDateString()) {
        const nouveau = shuffle(allTrophies.filter(t => parseFloat(t.rarete) > 80))[0];
        localStorage.setItem('defi_jour', JSON.stringify(nouveau));
        localStorage.setItem('date_jour', now.toDateString());
    }
    renderDefi("🎯 Défi du jour", JSON.parse(localStorage.getItem('defi_jour')), "defi-jour", "defi-jour");

    // 🔹 SEMAINE (25% à 40%)
    const dateSemaine = new Date(localStorage.getItem('date_semaine') || '');
    const diffSemaine = (now - dateSemaine) / (1000 * 3600 * 24);
    const savedSemaine = localStorage.getItem('defi_semaine');

    if (!savedSemaine || isNaN(dateSemaine) || diffSemaine >= 7) {
        const nouveau = shuffle(allTrophies.filter(t => parseFloat(t.rarete) >= 25 && parseFloat(t.rarete) <= 40))[0];
        localStorage.setItem('defi_semaine', JSON.stringify(nouveau));
        localStorage.setItem('date_semaine', now.toISOString());
    }
    renderDefi("📅 Défi de la semaine", JSON.parse(localStorage.getItem('defi_semaine')), "defi-semaine", "defi-semaine");

    // 🔹 MOIS (< 5%)
    const dateMois = new Date(localStorage.getItem('date_mois') || '');
    const isNewMonth = now.getMonth() !== dateMois.getMonth() || now.getFullYear() !== dateMois.getFullYear();
    const savedMois = localStorage.getItem('defi_mois');

    if (!savedMois || isNaN(dateMois) || isNewMonth) {
        const nouveau = shuffle(allTrophies.filter(t => parseFloat(t.rarete) < 5))[0];
        localStorage.setItem('defi_mois', JSON.stringify(nouveau));
        localStorage.setItem('date_mois', now.toISOString());
    }
    renderDefi("🏆 Défi du mois", JSON.parse(localStorage.getItem('defi_mois')), "defi-mois", "defi-mois");
}

function changerDefiJour() {
    const nouveau = shuffle(allTrophies.filter(t => parseFloat(t.rarete) > 80))[0];
    localStorage.setItem('defi_jour', JSON.stringify(nouveau));
    localStorage.setItem('date_jour', new Date().toDateString());
    renderDefi("🎯 Défi du jour", nouveau, "defi-jour", "defi-jour");
}

document.addEventListener('DOMContentLoaded', genererDefisSelonRarete);
</script>

</body>
</html>
