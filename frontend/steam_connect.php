<?php
session_start();

$steamId = '76561198000000000';  // Remplace avec le vrai Steam ID récupéré
$username = 'TestUtilisateur';
$email = 'test@example.com';
$password = 'steam';  // Pas important ici, juste un placeholder

$_SESSION['steam_id'] = $steamId;
$_SESSION['username'] = $username;

// Vérifie si la liaison Steam existe déjà
$liaisons = json_decode(@file_get_contents('http://localhost:3001/liaison-steam'), true);
$utilisateurs = json_decode(@file_get_contents('http://localhost:3001/utilisateurs'), true);

// Recherche s'il y a déjà une liaison pour ce Steam ID
$liaisonExistante = null;
foreach ($liaisons ?? [] as $liaison) {
    if ($liaison['steam_id'] === $steamId) {
        $liaisonExistante = $liaison;
        break;
    }
}

if (!$liaisonExistante) {
    // ➕ Créer un nouvel utilisateur
    $newUserPayload = json_encode([
        'username' => $username,
        'email' => $email,
        'password' => $password,
    ]);
    $userContext = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header'  => "Content-Type: application/json",
            'content' => $newUserPayload
        ]
    ]);
    $newUser = json_decode(file_get_contents('http://localhost:3001/utilisateurs', false, $userContext), true);
    $userId = $newUser['id'];

    // ➕ Créer la liaison Steam
    $liaisonPayload = json_encode([
        'utilisateur_id' => $userId,
        'steam_id' => $steamId
    ]);
    $liaisonContext = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json",
            'content' => $liaisonPayload
        ]
    ]);
    file_get_contents('http://localhost:3001/liaison-steam', false, $liaisonContext);
} else {
    // Liaison déjà existante → on peut aussi stocker l'username dans la session
    foreach ($utilisateurs ?? [] as $u) {
        if ($u['id'] == $liaisonExistante['utilisateur_id']) {
            $_SESSION['username'] = $u['username'];
        }
    }
}

// Redirige vers la page de profil après connexion
header('Location: profile.php');
exit();
?>
