<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');  // Utilisez l'utilisateur configuré dans PHPMyAdmin
define('DB_PASSWORD', '');  // Laissez vide si aucun mot de passe
define('DB_NAME', 'speedrun_trophees');  // Nom de la base de données dans PHPMyAdmin

// Connexion à la base de données avec MySQLi
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}
?>
