document.addEventListener('DOMContentLoaded', function() {
    const gameFilterSelect = document.getElementById('gameFilter');
    const trophyFilterInput = document.getElementById('trophyFilter');
    const tableRows = document.querySelectorAll('table tbody tr');

    function filterTable() {
        const gameFilterValue = gameFilterSelect.value.toLowerCase();
        const trophyFilterValue = trophyFilterInput.value.toLowerCase();

        tableRows.forEach(row => {
            const gameName = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
            const trophyName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

            const gameMatch = gameFilterValue === "" || gameName.includes(gameFilterValue);
            const trophyMatch = trophyName.includes(trophyFilterValue);

            if (gameMatch && trophyMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    gameFilterSelect.addEventListener('change', filterTable);
    trophyFilterInput.addEventListener('keyup', filterTable);
});
