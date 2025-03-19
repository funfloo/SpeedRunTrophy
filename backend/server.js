const express = require('express');
const session = require('express-session');
const { Issuer, Strategy } = require('openid-client');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

// 🔹 Connexion à la base de données
const DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'speedrun_trophees'
};

// 🔹 Configuration de la session
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// 🔹 Configuration OpenID pour Steam
const steamIssuer = new Issuer({
    issuer: 'https://steamcommunity.com/openid',
    authorization_endpoint: 'https://steamcommunity.com/openid/login'
});

// 🔹 Création du client OpenID Steam
const client = new steamIssuer.Client({
    client_id: '',  // Steam n'a pas d'ID client
    client_secret: '',  // Steam n'a pas de secret client
    redirect_uris: ['http://localhost:3000/auth/steam/callback'], // Remplace par ton URL
    response_types: ['id_token']
});

// 🔹 Route de connexion Steam
app.get('/auth/steam', (req, res) => {
    const authUrl = client.authorizationUrl({
        response_mode: 'query',
        claims: { id_token: { sub: null } }
    });
    res.redirect(authUrl);
});

// 🔹 Callback après connexion Steam
app.get('/auth/steam/callback', async (req, res) => {
    const steamId = req.query['openid.claimed_id'].split('/').pop();

    if (!steamId) {
        return res.status(400).send('Erreur de connexion Steam.');
    }

    req.session.steamId = steamId;
    console.log(`✅ Connexion réussie : Steam ID ${steamId}`);

    // 🔹 Connexion MySQL
    const db = await mysql.createConnection(DB_CONFIG);

    // 🔹 Vérifier si l'utilisateur existe en base
    const [rows] = await db.query("SELECT id FROM utilisateurs WHERE steam_id = ?", [steamId]);
    
    if (!rows.length) {
        // 🔹 Récupérer le nom Steam
        const username = await fetchSteamUsername(steamId);

        console.log(`➕ Création du nouvel utilisateur Steam : ${username}`);

        // 🔹 Création de l'utilisateur
        await db.query(
            `INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe, steam_id)
             VALUES (?, ?, ?, ?)`,
            [username, `${steamId}@steam.com`, '', steamId]
        );
    }

    res.redirect('/dashboard');
});

// 🔹 Récupère le nom d'utilisateur Steam
async function fetchSteamUsername(steamId) {
    try {
        const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=9B79456AE2422A57C047F6FAD331C21B&steamids=${steamId}`);
        return response.data.response.players[0].personaname;
    } catch (error) {
        console.error(`❌ Erreur récupération nom utilisateur Steam : ${error.message}`);
        return `SteamUser_${steamId}`;
    }
}

// 🔹 Page après connexion
app.get('/dashboard', async (req, res) => {
    if (!req.session.steamId) {
        return res.redirect('/');
    }

    res.send(`🎉 Bienvenue, utilisateur Steam ${req.session.steamId} !`);
});

// 🔹 Déconnexion
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// 🔹 Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
