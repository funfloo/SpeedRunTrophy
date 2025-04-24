// dynamic-date.js
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `<p>&copy; ${currentYear} Speedrun Trophée - Tous droits réservés</p>`;
    }
});
