<?php
session_start();
require 'config.php';

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
$result = $conn->query("
    SELECT t.nom, t.description, t.rarete, j.nom AS jeu
    FROM trophees t
    JOIN jeux j ON t.id_jeu = j.id
    WHERE t.rarete IS NOT NULL
");
$tropheesAvecRarete = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Défis - Speedrun Trophée</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../backend/styles.css">
</head>
<body>

<?php include 'header.php'; ?>

<main class="container mt-4">
    <h2 class="mb-4 text-white">🔥 Vos Défis</h2>

    <div id="defi-jour"></div>
    <div class="text-right mb-4">
        <button onclick="changerDefiJour()" class="btn btn-outline-warning btn-sm">🔁 Changer le défi du jour</button>
    </div>

    <div id="defi-semaine"></div>
    <div id="defi-mois"></div>
</main>

<footer class="bg-dark text-white text-center py-3">
    <p>&copy; 2025 Speedrun Trophée - Tous droits réservés</p>
</footer>

<script>
// 📦 Données injectées depuis PHP
const allTrophies = <?= json_encode($tropheesAvecRarete) ?>;

// 🔁 Mélange de tableau
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 🎨 Affichage d’un défi dans un conteneur
function renderDefi(title, trophy, containerId) {
    const container = document.getElementById(containerId);
    if (!trophy) {
        container.innerHTML = `<div class="alert alert-warning">Aucun trophée disponible pour ${title}</div>`;
        return;
    }

    container.innerHTML = `
        <div class="card bg-dark text-white shadow mb-4">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-subtitle mb-2">🏆 ${trophy.nom}</h6>
                <p class="card-text">${trophy.description || "Pas de description disponible."}</p>
                <p class="card-text"><strong>🎮 Jeu :</strong> ${trophy.jeu}</p>
                <span class="badge badge-info">Rareté : ${parseFloat(trophy.rarete).toFixed(2)}%</span>
            </div>
        </div>
    `;
}

// 🔄 Fonction principale
function genererDefisSelonRarete() {
    const now = new Date();

    // 🔹 Défi du jour
    const dateJour = localStorage.getItem('date_jour');
    const savedJour = localStorage.getItem('defi_jour');
    const jourExp = new Date(dateJour);

    if (!savedJour || isNaN(jourExp) || now.toDateString() !== jourExp.toDateString()) {
        const nouveau = shuffle(allTrophies.filter(t => parseFloat(t.rarete) > 80))[0];
        localStorage.setItem('defi_jour', JSON.stringify(nouveau));
        localStorage.setItem('date_jour', now.toDateString());
    }
    renderDefi("🎯 Défi du jour", JSON.parse(localStorage.getItem('defi_jour')), "defi-jour");

    // 🔹 Défi de la semaine
    const dateSemaine = new Date(localStorage.getItem('date_semaine') || '');
    const diffSemaine = (now - dateSemaine) / (1000 * 3600 * 24);
    const savedSemaine = localStorage.getItem('defi_semaine');

    if (!savedSemaine || isNaN(dateSemaine) || diffSemaine >= 7) {
        const nouveau = shuffle(allTrophies.filter(t => parseFloat(t.rarete) >= 25 && parseFloat(t.rarete) <= 40))[0];
        localStorage.setItem('defi_semaine', JSON.stringify(nouveau));
        localStorage.setItem('date_semaine', now.toISOString());
    }
    renderDefi("📅 Défi de la semaine", JSON.parse(localStorage.getItem('defi_semaine')), "defi-semaine");

    // 🔹 Défi du mois
    const dateMois = new Date(localStorage.getItem('date_mois') || '');
    const isNewMonth = now.getMonth() !== dateMois.getMonth() || now.getFullYear() !== dateMois.getFullYear();
    const savedMois = localStorage.getItem('defi_mois');

    if (!savedMois || isNaN(dateMois) || isNewMonth) {
        const nouveau = shuffle(allTrophies.filter(t => parseFloat(t.rarete) < 5))[0];
        localStorage.setItem('defi_mois', JSON.stringify(nouveau));
        localStorage.setItem('date_mois', now.toISOString());
    }
    renderDefi("🏆 Défi du mois", JSON.parse(localStorage.getItem('defi_mois')), "defi-mois");
}

// 🔁 Changer manuellement le défi du jour
function changerDefiJour() {
    const nouveau = shuffle(allTrophies.filter(t => parseFloat(t.rarete) > 80))[0];
    localStorage.setItem('defi_jour', JSON.stringify(nouveau));
    localStorage.setItem('date_jour', new Date().toDateString());
    renderDefi("🎯 Défi du jour", nouveau, "defi-jour");
}

document.addEventListener('DOMContentLoaded', genererDefisSelonRarete);
</script>

</body>
</html>
