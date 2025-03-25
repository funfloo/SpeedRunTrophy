const axios = require('axios');
const mysql = require('mysql2/promise');

// 🔹 Configuration MySQL
const DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'speedrun_trophees'
};

// 🔹 Clé API Steam
const API_KEY = "9B79456AE2422A57C047F6FAD331C21B";
const STEAM_ID = "76561198159440219";

// 🔹 Récupère le nom Steam
async function fetchSteamUsername(steamId) {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${steamId}`;
    const { data } = await axios.get(url);
    return data.response.players[0]?.personaname || null;
}

// 🔹 Crée ou récupère l'utilisateur
async function getOrCreateUser(db, steamId) {
    const [rows] = await db.query("SELECT id FROM utilisateurs WHERE steam_id = ?", [steamId]);
    if (rows.length) return rows[0].id;

    const username = await fetchSteamUsername(steamId);
    if (!username) return null;

    const [result] = await db.query(
        "INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe, steam_id) VALUES (?, ?, '', ?)",
        [username, `${steamId}@steam.com`, steamId]
    );
    console.log(`👤 Utilisateur ajouté : ${username}`);
    return result.insertId;
}

// 🔹 Récupère les jeux Steam
async function fetchGames(steamId) {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${API_KEY}&steamid=${steamId}&include_appinfo=true`;
    const { data } = await axios.get(url);
    return data.response.games || [];
}

// 🔹 Récupère les succès d'un jeu
async function fetchAchievements(steamId, appid) {
    try {
        const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${API_KEY}&steamid=${steamId}&appid=${appid}`;
        const { data } = await axios.get(url);
        return data.playerstats?.achievements || [];
    } catch (err) {
        console.warn(`⚠️ Aucun succès récupéré pour appid ${appid}`);
        return [];
    }
}

// 🔹 Script principal
async function syncSteamData(steamId) {
    const db = await mysql.createConnection(DB_CONFIG);
    console.log(`🔄 Synchronisation Steam pour ${steamId}`);

    const userId = await getOrCreateUser(db, steamId);
    if (!userId) {
        console.error("❌ Utilisateur introuvable.");
        return;
    }

    const games = await fetchGames(steamId);
    if (!games.length) {
        console.warn("⚠️ Aucun jeu trouvé.");
        return;
    }

    for (const game of games) {
        console.log(`🎮 Jeu détecté : ${game.name}`);

        // ➤ Ajout du jeu
        await db.query(
            "INSERT INTO jeux (steam_appid, nom) VALUES (?, ?) ON DUPLICATE KEY UPDATE nom = VALUES(nom)",
            [game.appid, game.name]
        );

        // ➤ Récupère l'id interne du jeu
        const [jeuRow] = await db.query("SELECT id FROM jeux WHERE steam_appid = ?", [game.appid]);
        if (!jeuRow.length) continue;
        const gameId = jeuRow[0].id;

        // ➤ Récupère les succès Steam
        const achievements = await fetchAchievements(steamId, game.appid);
        if (!achievements.length) continue;

        for (const ach of achievements) {
            if (!ach.achieved) continue;

            // ➤ Ajout du trophée
            await db.query(
                `INSERT INTO trophees (id_jeu, api_name, nom, description, rarete)
                 VALUES (?, ?, ?, ?, NULL)
                 ON DUPLICATE KEY UPDATE nom = VALUES(nom), description = VALUES(description)`,
                [gameId, ach.apiname, ach.apiname, ach.description || ""]
            );

            // ➤ Récupère l'id du trophée
            const [trophyRow] = await db.query(
                "SELECT id FROM trophees WHERE api_name = ? AND id_jeu = ?",
                [ach.apiname, gameId]
            );

            if (!trophyRow.length) continue;
            const trophyId = trophyRow[0].id;

            // ➤ Ajout de la progression utilisateur
            await db.query(
                `INSERT INTO progression_utilisateur (id_utilisateur, id_trophee, id_jeu, date_obtention)
                 VALUES (?, ?, ?, NOW())
                 ON DUPLICATE KEY UPDATE date_obtention = NOW()`,
                [userId, trophyId, gameId]
            );

            console.log(`🏆 Trophée débloqué : ${ach.apiname}`);
        }
    }

    await db.end();
    console.log("✅ Synchronisation terminée !");
}

syncSteamData(STEAM_ID);
