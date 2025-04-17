<?php
session_start();
if (!isset($_SESSION['steam_id'])) {
    header("Location: connexion.php");
    exit();
}

$conn = new mysqli("localhost", "root", "", "speedrun_trophees");
if ($conn->connect_error) {
    die("Erreur BDD : " . $conn->connect_error);
}

// 🔹 Tous les jeux
$jeux = [];
$res = $conn->query("SELECT * FROM jeux");
while ($row = $res->fetch_assoc()) {
    $jeux[] = $row;
}

// 🔹 5 types les plus fréquents
$types = [];
$typeResult = $conn->query("SELECT type, COUNT(*) as total FROM jeux GROUP BY type ORDER BY total DESC LIMIT 5");
while ($row = $typeResult->fetch_assoc()) {
    $types[] = $row['type'];
}

// 🔹 Trophées par jeu
$trophees = [];
$res = $conn->query("SELECT * FROM trophees");
while ($row = $res->fetch_assoc()) {
    if (isset($row['id_jeu'])) {
        $trophees[$row['id_jeu']][] = $row;
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>🎯 Roue de sélection - Speedrun Trophée</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
            color: #f8f9fa;
            font-family: 'Segoe UI', sans-serif;
            min-height: 100vh;
        }

        .container {
            padding: 40px 20px;
        }

        h2 {
            text-align: center;
            margin-bottom: 30px;
            color: #ffc107;
            font-weight: bold;
        }

        .card-wheel {
            background-color: #1c1f26;
            border: 2px solid #444;
            border-radius: 15px;
            padding: 30px 20px;
            margin-bottom: 40px;
            box-shadow: 0 0 15px rgba(255,255,255,0.1);
        }

        .wheel-box {
            width: 320px;
            height: 320px;
            margin: 0 auto;
            border-radius: 50%;
            border: 10px solid #ffc107;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #2a2d3b;
            font-size: 1.4rem;
            font-weight: bold;
            text-align: center;
            padding: 30px;
            color: #fff;
        }

        .btn-spin {
            margin-top: 20px;
            background-color: #17a2b8;
            color: white;
            padding: 10px 30px;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            transition: background 0.3s;
        }

        .btn-spin:hover {
            background-color: #138496;
        }

        .result-box {
            margin-top: 20px;
            font-size: 1.3rem;
            font-weight: bold;
            text-align: center;
            color: #ffc107;
        }

        .filter-select {
            max-width: 300px;
            margin: 0 auto 20px;
        }
    </style>
</head>
<body>

<?php include 'header.php'; ?>

<div class="container">
    <div class="card-wheel">
        <h2>🎮 Roue des Jeux</h2>

        <div class="filter-select">
            <select id="typeFilter" class="form-control">
                <option value="">-- Tous les types (top 5) --</option>
                <?php foreach ($types as $type): ?>
                    <option value="<?= htmlspecialchars($type) ?>"><?= htmlspecialchars($type) ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="wheel-box" id="wheel-jeux">Cliquez pour lancer 🎲</div>
        <div class="text-center">
            <button class="btn-spin" onclick="spin('jeux')">Lancer la roue des Jeux</button>
        </div>
        <div class="result-box" id="result-jeux">Aucun jeu sélectionné</div>
    </div>

    <div class="card-wheel">
        <h2>🏆 Roue des Trophées</h2>
        <div class="wheel-box" id="wheel-trophees">Sélectionnez un jeu d'abord</div>
        <div class="text-center">
            <button class="btn-spin" onclick="spin('trophees')">Lancer la roue des Trophées</button>
        </div>
        <div class="result-box" id="result-trophee">Aucun trophée sélectionné</div>
    </div>
</div>

<script>
    const jeux = <?= json_encode($jeux) ?>;
    const trophees = <?= json_encode($trophees) ?>;
    const typesTop5 = <?= json_encode($types) ?>;
    let currentJeu = null;
    let intervalId = null;
    let filteredJeux = jeux.filter(j => typesTop5.includes(j.type));

    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function spin(type) {
        const wheel = document.getElementById(type === 'jeux' ? 'wheel-jeux' : 'wheel-trophees');
        const result = document.getElementById(type === 'jeux' ? 'result-jeux' : 'result-trophee');
        const source = type === 'jeux' ? filteredJeux : (currentJeu ? trophees[currentJeu.id] || [] : []);

        if (!source.length) {
            result.innerText = 'Aucune donnée disponible.';
            return;
        }

        let count = 20;
        clearInterval(intervalId);

        intervalId = setInterval(() => {
            const item = getRandomItem(source);
            wheel.innerText = item.nom;
            count--;
            if (count <= 0) {
                clearInterval(intervalId);
                wheel.innerText = `🎉 ${item.nom}`;
                result.innerText = `${type === 'jeux' ? '🎮 Jeu' : '🏅 Trophée'} sélectionné : ${item.nom}`;
                if (type === 'jeux') {
                    currentJeu = item;
                    document.getElementById('wheel-trophees').innerText = "Cliquez pour lancer 🎯";
                    document.getElementById('result-trophee').innerText = "Aucun trophée sélectionné";
                }
            }
        }, 100);
    }

    document.getElementById('typeFilter').addEventListener('change', function () {
        const selected = this.value;
        filteredJeux = selected ? jeux.filter(j => j.type === selected) : jeux.filter(j => typesTop5.includes(j.type));
        currentJeu = null;
        document.getElementById('wheel-jeux').innerText = "Cliquez pour lancer 🎲";
        document.getElementById('wheel-trophees').innerText = "Sélectionnez un jeu d'abord";
        document.getElementById('result-jeux').innerText = "Aucun jeu sélectionné";
        document.getElementById('result-trophee').innerText = "Aucun trophée sélectionné";
    });
</script>

</body>
</html>
