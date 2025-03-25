const axios = require('axios');
const mysql = require('mysql2/promise');

const DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'speedrun_trophees'
};

const API_KEY = "9B79456AE2422A57C047F6FAD331C21B";
const STEAM_ID = "76561198159440219";

// 🔹 Obtenir le nom Steam
async function fetchSteamUsername(steamId) {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${steamId}`;
    const { data } = await axios.get(url);
    return data.response.players[0]?.personaname || null;
}

// 🔹 Obtenir le genre/type du jeu depuis le store Steam
async function fetchGameType(appid) {
    try {
        const url = `https://store.steampowered.com/api/appdetails?appids=${appid}&l=french`;
        const { data } = await axios.get(url);
        const gameData = data[appid];

        if (gameData?.success && gameData.data?.genres) {
            return gameData.data.genres.map(g => g.description).join(', ');
        }
    } catch (err) {
        console.warn(`❌ Type non récupéré pour appid ${appid}`);
    }
    return null;
}

// 🔹 Obtenir la rareté globale des trophées (en %)
async function fetchGlobalAchievementRates(appid) {
    try {
        const url = `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${appid}`;
        const { data } = await axios.get(url);
        const rates = {};

        if (data?.achievementpercentages?.achievements) {
            for (const a of data.achievementpercentages.achievements) {
                rates[a.name] = parseFloat(a.percent);
            }
        }
        return rates;
    } catch (err) {
        console.warn(`❌ Rareté non récupérée pour appid ${appid}`);
        return {};
    }
}

// 🔹 Obtenir les succès débloqués par l'utilisateur
async function fetchAchievements(steamId, appid) {
    try {
        const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${API_KEY}&steamid=${steamId}&appid=${appid}`;
        const { data } = await axios.get(url);
        return data.playerstats?.achievements || [];
    } catch (err) {
        return [];
    }
}

// 🔹 Vérifier ou créer l'utilisateur en base
async function getOrCreateUser(db, steamId) {
    const [rows] = await db.query("SELECT id FROM utilisateurs WHERE steam_id = ?", [steamId]);
    if (rows.length) return rows[0].id;

    const username = await fetchSteamUsername(steamId);
    if (!username) return null;

    const [res] = await db.query(
        "INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe, steam_id) VALUES (?, ?, '', ?)",
        [username, `${steamId}@steam.com`, steamId]
    );
    return res.insertId;
}

// 🔹 Synchronisation principale
async function syncSteamData(steamId) {
    const db = await mysql.createConnection(DB_CONFIG);
    console.log(`🔄 Début synchronisation Steam pour ${steamId}...`);

    const userId = await getOrCreateUser(db, steamId);
    if (!userId) return console.error("❌ Utilisateur introuvable");

    const games = await fetchGames(steamId);
    if (!games.length) return console.warn("⚠️ Aucun jeu trouvé");

    for (const game of games) {
        console.log(`🎮 ${game.name}`);

        const type = await fetchGameType(game.appid);

        await db.query(
            `INSERT INTO jeux (steam_appid, nom, type)
             VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE nom = VALUES(nom), type = VALUES(type)`,
            [game.appid, game.name, type]
        );

        const [jeuRow] = await db.query("SELECT id FROM jeux WHERE steam_appid = ?", [game.appid]);
        const gameId = jeuRow[0]?.id;
        if (!gameId) continue;

        const rarityMap = await fetchGlobalAchievementRates(game.appid);
        const achievements = await fetchAchievements(steamId, game.appid);

        for (const ach of achievements) {
            if (!ach.achieved) continue;

            const rarete = rarityMap[ach.apiname] !== undefined
                ? parseFloat(rarityMap[ach.apiname])
                : null;

            // Ajout trophée
            await db.query(
                `INSERT INTO trophees (id_jeu, api_name, nom, description, rarete)
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE nom = VALUES(nom), description = VALUES(description), rarete = VALUES(rarete)`,
                [gameId, ach.apiname, ach.apiname, ach.description || '', rarete]
            );

            // Récupération de l’ID du trophée
            const [trophyRow] = await db.query(
                "SELECT id FROM trophees WHERE api_name = ? AND id_jeu = ?",
                [ach.apiname, gameId]
            );

            const trophyId = trophyRow[0]?.id;
            if (!trophyId) continue;

            // Ajout progression
            await db.query(
                `INSERT INTO progression_utilisateur (id_utilisateur, id_trophee, id_jeu, date_obtention)
                 VALUES (?, ?, ?, NOW())
                 ON DUPLICATE KEY UPDATE date_obtention = NOW()`,
                [userId, trophyId, gameId]
            );

            console.log(`🏆 ${ach.apiname} - ${rarete !== null ? rarete.toFixed(2) + '%' : 'N/A'}`);
        }
    }

    await db.end();
    console.log("✅ Synchronisation terminée !");
}

// 🔥 Start
async function fetchGames(steamId) {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${API_KEY}&steamid=${steamId}&include_appinfo=true`;
    const { data } = await axios.get(url);
    return data.response.games || [];
}

syncSteamData(STEAM_ID);
