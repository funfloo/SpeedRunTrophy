const axios = require('axios');
const mysql = require('mysql2/promise');

// 🔹 Configuration de la base de données MySQL
const DB_CONFIG = {
    host: 'localhost',
    user: 'root',  
    password: '',  
    database: 'speedrun_trophees'
};

// 🔹 Clé API Steam (remplace par la tienne)
const API_KEY = "9B79456AE2422A57C047F6FAD331C21B";

// 🔹 ID Steam de l'utilisateur à synchroniser (remplace par un vrai ID)
const STEAM_ID = "76561198159440219";

/**
 * 🔹 Récupère le nom d'utilisateur Steam
 */
async function fetchSteamUsername(steamId) {
    try {
        const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${steamId}`;
        const { data } = await axios.get(url);
        return data.response.players.length ? data.response.players[0].personaname : null;
    } catch (error) {
        console.error(`❌ Erreur récupération nom utilisateur Steam : ${error.message}`);
        return null;
    }
}

/**
 * 🔹 Vérifie si l'utilisateur existe en base, sinon l'ajoute
 */
async function getOrCreateUser(db, steamId) {
    const [rows] = await db.query("SELECT id FROM utilisateurs WHERE steam_id = ?", [steamId]);
    
    if (rows.length) return rows[0].id;

    const username = await fetchSteamUsername(steamId);
    if (!username) return null;

    const [result] = await db.query(
        `INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe, steam_id)
         VALUES (?, ?, ?, ?)`,
        [username, `${steamId}@steam.com`, '', steamId]
    );

    return result.insertId;
}

/**
 * 🔹 Récupère la liste des jeux possédés par l'utilisateur Steam
 */
async function fetchGames(steamId) {
    try {
        const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${API_KEY}&steamid=${steamId}&include_appinfo=true`;
        const { data } = await axios.get(url);
        return data.response.games || []; 
    } catch (error) {
        console.error(`❌ Erreur récupération jeux Steam : ${error.message}`);
        return []; 
    }
}

/**
 * 🔹 Récupère les succès (trophées) Steam d'un utilisateur pour un jeu donné
 */
async function fetchAchievements(steamId, gameId) {
    try {
        const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${API_KEY}&steamid=${steamId}&appid=${gameId}`;
        const { data } = await axios.get(url);

        if (!data.playerstats || !data.playerstats.achievements) {
            console.warn(`⚠️ Aucun succès trouvé pour le jeu ${gameId}`);
            return [];
        }

        return data.playerstats.achievements;
    } catch (error) {
        console.error(`❌ Erreur récupération succès du jeu ${gameId}: ${error.message}`);
        return []; 
    }
}

/**
 * 🔹 Synchronise les jeux et trophées Steam d'un utilisateur
 */
async function syncSteamData(steamId) {
    const db = await mysql.createConnection(DB_CONFIG);

    console.log(`🔄 Début synchronisation Steam pour ${steamId}...`);

    // 🔹 Vérifier si l'utilisateur existe, sinon le créer
    const userId = await getOrCreateUser(db, steamId);
    if (!userId) {
        console.error(`❌ Impossible de synchroniser les données pour Steam ID ${steamId}`);
        await db.end();
        return;
    }

    // 🔹 Récupérer les jeux du joueur
    const games = await fetchGames(steamId);
    if (games.length === 0) {
        console.warn("⚠️ Aucun jeu trouvé pour cet utilisateur.");
        await db.end();
        return;
    }

    for (const game of games) {
        console.log(`🎮 Ajout du jeu : ${game.name}`);

        // 🔹 Ajout du jeu dans la base de données
        await db.query(
            `INSERT INTO jeux (steam_appid, nom) VALUES (?, ?)
             ON DUPLICATE KEY UPDATE nom = VALUES(nom)`,
            [game.appid, game.name]
        );

        // 🔹 Associer le jeu à l'utilisateur
        await db.query(
            `INSERT INTO jeux_utilisateur (id_utilisateur, id_jeu) 
             SELECT ?, id FROM jeux WHERE steam_appid = ? 
             ON DUPLICATE KEY UPDATE id_utilisateur = VALUES(id_utilisateur)`,
            [userId, game.appid]
        );

        // 🔹 Récupérer les trophées pour ce jeu
        const achievements = await fetchAchievements(steamId, game.appid);
        if (achievements.length === 0) continue;

        for (const ach of achievements) {
            if (ach.achieved) {
                console.log(`🏆 Succès débloqué : ${ach.apiname}`);

                // 🔹 Insérer le trophée dans la base
                await db.query(
                    `INSERT INTO trophees (steam_appid, api_name, nom, description, rarete)
                     VALUES (?, ?, ?, ?, NULL)
                     ON DUPLICATE KEY UPDATE nom = VALUES(nom), description = VALUES(description)`,
                    [game.appid, ach.apiname, ach.apiname, ach.description || ""]
                );

                // 🔹 Récupérer l'ID du trophée
                const [trophyRow] = await db.query(
                    "SELECT id FROM trophees WHERE api_name = ? AND steam_appid = ?",
                    [ach.apiname, game.appid]
                );
                if (!trophyRow.length) continue;
                const trophyId = trophyRow[0].id;

                // 🔹 Ajouter la progression utilisateur
                await db.query(
                    `INSERT INTO progression_utilisateur (id_utilisateur, id_trophee, date_obtention)
                    VALUES (?, ?, NOW())
                    ON DUPLICATE KEY UPDATE date_obtention = NOW()`,
                    [userId, trophyId]
                );
            }
        }
    }

    console.log("✅ Synchronisation Steam terminée !");
    await db.end();
}

// 🏁 Lancer la synchronisation pour un utilisateur spécifique
syncSteamData(STEAM_ID);
