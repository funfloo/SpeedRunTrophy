// leaderboard-sort.js
function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const sortedRows = rows.sort((a, b) => {
        const aValue = a.querySelector(`td:nth-child(${columnIndex + 1})`).textContent.trim();
        const bValue = b.querySelector(`td:nth-child(${columnIndex + 1})`).textContent.trim();

        // Handle numeric and string comparisons
        if (!isNaN(aValue) && !isNaN(bValue)) {
            return Number(aValue) - Number(bValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });

    // Clear and re-populate the table
    tbody.innerHTML = '';
    sortedRows.forEach(row => tbody.appendChild(row));
}

document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('table');
    const headers = table.querySelectorAll('th');

    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            sortTable(table, index);
        });
    });
});
