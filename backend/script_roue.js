// script_roue.js

// Array of available games (Replace with your actual game data)
const allGames = ["Game A", "Game B", "Game C", "Game D", "Game E", "Game F", "Game G"];

// Object containing trophies for each game (Replace with your actual trophy data)
const trophies = {
    "Game A": ["Trophy 1", "Trophy 2", "Trophy 3"],
    "Game B": ["Trophy 4", "Trophy 5"],
    "Game C": ["Trophy 6", "Trophy 7", "Trophy 8", "Trophy 9"],
    "Game D": ["Trophy 10", "Trophy 11", "Trophy 12"],
    "Game E": ["Trophy 13", "Trophy 14"],
    "Game F": ["Trophy 15", "Trophy 16"],
    "Game G": ["Trophy 17", "Trophy 18"]
};

/**
 * Generates the segments for the spinning wheel.
 * @param {string} wheelId - The ID of the wheel element.
 * @param {array} data - The array of data to be displayed on the wheel.
 */
function generateWheelSegments(wheelId, data) {
    const wheel = document.getElementById(wheelId);
    const numSegments = data.length;
    const angle = 360 / numSegments;

    wheel.innerHTML = '';

    for (let i = 0; i < numSegments; i++) {
        const segment = document.createElement("div");
        segment.classList.add("wheel-segment");
        segment.style.transform = `rotate(${i * angle}deg)`;
        segment.style.backgroundColor = `hsl(${i * (360 / numSegments)}, 70%, 50%)`; // Vary colors
        segment.textContent = data[i];
        wheel.appendChild(segment);
    }
}

/**
 * Spins the wheel and selects a random segment.
 * @param {string} wheelId - The ID of the wheel container element.
 * @param {string} resultId - The ID of the element where the selected item will be displayed.
 * @param {array} data - The array of data to spin through.
 */
function spinWheel(wheelId, resultId, data) {
    const wheelContainer = document.getElementById(wheelId + "Container");
    const wheel = document.getElementById(wheelId);
    const numSegments = data.length;
    const angle = 360 / numSegments;
    const randomSpin = Math.floor(Math.random() * 360); // Random spin angle

    let rotation = 360 * 5 + randomSpin; // Spin multiple times + random angle
    wheelContainer.style.transition = "transform 5s ease-in-out"; // Smooth transition

    wheelContainer.style.transform = `rotate(${rotation}deg)`;
    wheelContainer.addEventListener('transitionend', () => {
        wheelContainer.style.transition = 'none';

        let actualRotation = rotation % 360; // Get rotation within 0-360 degrees
        let selectedIndex = Math.floor((360 - actualRotation) / angle) % numSegments; // Index of selected segment
        document.getElementById(resultId).textContent = data[selectedIndex]; // Set result
    });
}

/**
 * Function to handle the game wheel spinning.
 */
function spinGameWheel() {
    const gameFilterSelect = document.getElementById("gameFilter");
    const filterValue = gameFilterSelect.value;
    let filteredGames = allGames; // Default to all games

    if (filterValue !== "") {
        filteredGames = allGames.filter(game => game === filterValue);
    }

    generateWheelSegments("gameWheel", filteredGames);
    spinWheel("gameWheel", "gameResult", filteredGames);
}

/**
 * Function to handle the trophy wheel spinning.
 */
function spinTrophyWheel() {
    const selectedGame = document.getElementById("gameResult").textContent;
    if (!selectedGame) {
        alert("Veuillez faire tourner la roue des jeux en premier !");
        return;
    }

    const trophyList = trophies[selectedGame];
    if (!trophyList) {
        alert("Pas de trophées disponibles pour ce jeu.");
        return;
    }

    generateWheelSegments("trophyWheel", trophyList);
    spinWheel("trophyWheel", "trophyResult", trophyList);
}

// Generate initial wheel segments
document.addEventListener('DOMContentLoaded', function() {
    generateWheelSegments("gameWheel", allGames);
});
