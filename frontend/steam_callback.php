<?php
session_start();
require 'config.php';

if (!isset($_SESSION['steam_id'])) die("Erreur Steam ID absent.");

$steamId = $_SESSION['steam_id'];
$apiKey = "9B79456AE2422A57C047F6FAD331C21B";
$url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=$apiKey&steamids=$steamId";
$data = json_decode(file_get_contents($url), true);
$user = $data["response"]["players"][0];

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) die("Erreur MySQL : ".$conn->connect_error);

$stmt = $conn->prepare("SELECT id FROM utilisateurs WHERE steam_id=?");
$stmt->bind_param("s", $steamId);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows == 0) {
    $insert = $conn->prepare("INSERT INTO utilisateurs (nom_utilisateur, email, steam_id, avatar) VALUES (?, ?, ?, ?)");
    $email = "$steamId@steam.com";
    $insert->bind_param("ssss", $user['personaname'], $email, $steamId, $user['avatarfull']);
    $insert->execute();
    $insert->close();
}

$stmt->close();
$conn->close();

header('Location: index.php');
exit();
?>
