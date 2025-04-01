<?php
session_start();
require 'config.php';

// Connexion à la base de données
$result = $conn->query("
    SELECT u.nom_utilisateur, COUNT(p.id_trophee) AS nb_trophees
    FROM utilisateurs u
    LEFT JOIN progression_utilisateur p ON u.id = p.utilisateur_id
    GROUP BY u.id
    ORDER BY nb_trophees DESC
    LIMIT 20
");

$classement = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();

$top3 = array_slice($classement, 0, 3);
$reste = array_slice($classement, 3);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Classement</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<?php include 'header.php'; ?>

<main class="container mt-4">
    <h2>🏆 Podium</h2>

    <div class="podium">
        <div class="second">
            <div>🥈</div>
            <strong><?= htmlspecialchars($top3[1]['nom_utilisateur'] ?? '') ?></strong><br>
            <?= $top3[1]['nb_trophees'] ?? 0 ?> trophées
        </div>
        <div class="first">
            <div>🥇</div>
            <strong><?= htmlspecialchars($top3[0]['nom_utilisateur'] ?? '') ?></strong><br>
            <?= $top3[0]['nb_trophees'] ?? 0 ?> trophées
        </div>
        <div class="third">
            <div>🥉</div>
            <strong><?= htmlspecialchars($top3[2]['nom_utilisateur'] ?? '') ?></strong><br>
            <?= $top3[2]['nb_trophees'] ?? 0 ?> trophées
        </div>
    </div>

    <h3 class="mt-5">📋 Classement général</h3>
    <div class="card bg-dark text-white p-3 shadow">
        <table class="table table-striped table-dark table-bordered mb-0">
            <thead>
                <tr>
                    <th>Rang</th>
                    <th>Nom</th>
                    <th>Trophées</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($reste as $index => $joueur): ?>
                <tr>
                    <td><?= $index + 4 ?></td>
                    <td><?= htmlspecialchars($joueur['nom_utilisateur']) ?></td>
                    <td><?= $joueur['nb_trophees'] ?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</main>

</body>
</html>
