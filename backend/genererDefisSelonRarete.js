function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function renderDefi(title, trophy, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="card bg-dark text-white shadow mb-4">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-subtitle mb-2">🏆 ${trophy.nom}</h6>
                <p class="card-text">${trophy.description || "Pas de description."}</p>
                <span class="badge badge-info">Rareté : ${parseFloat(trophy.rarete).toFixed(2)}%</span>
            </div>
        </div>
    `;
}

function selectDefis() {
    const jour = shuffle(allTrophies.filter(t => t.rarete > 80))[0];
    const semaine = shuffle(allTrophies.filter(t => t.rarete >= 25 && t.rarete <= 40))[0];
    const mois = shuffle(allTrophies.filter(t => t.rarete < 5))[0];

    if (jour) renderDefi("🎯 Défi du jour", jour, "defi-jour");
    if (semaine) renderDefi("📅 Défi de la semaine", semaine, "defi-semaine");
    if (mois) renderDefi("🏆 Défi du mois", mois, "defi-mois");
}

document.addEventListener('DOMContentLoaded', selectDefis);
