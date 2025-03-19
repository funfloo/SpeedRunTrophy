// missions-display.js (Requires server-side authentication)
document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in (e.g., by checking for a cookie or session variable)
    const isLoggedIn = checkUserLoginStatus(); // Implement this function server-side

    if (isLoggedIn) {
        // Fetch user's missions from the server
        fetch('/api/missions') // Replace with your API endpoint
            .then(response => response.json())
            .then(missions => {
                // Display the missions in a list or table
                const missionsList = document.createElement('ul');
                missions.forEach(mission => {
                    const missionItem = document.createElement('li');
                    missionItem.textContent = mission.description;
                    missionsList.appendChild(missionItem);
                });

                const missionsSection = document.querySelector('main section');
                missionsSection.innerHTML = '<h2>Vos Missions</h2>';
                missionsSection.appendChild(missionsList);
            })
            .catch(error => {
                console.error('Error fetching missions:', error);
                // Display an error message to the user
            });
    } else {
        // Display a message indicating that the user needs to log in
        const missionsSection = document.querySelector('main section');
        missionsSection.innerHTML = '<h2>Vos Missions</h2><p>Connectez-vous pour voir vos missions personnalisées.</p>';
    }
});
