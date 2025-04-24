const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'speedrun_db'
});

router.get('/user', async (req, res) => {
    const steamId = req.session?.steam_id;
    if (!steamId) {
        return res.status(401).json({ error: 'Non connecté' });
    }

    try {
        const [rows] = await db.execute(
            'SELECT nom_utilisateur, avatar FROM utilisateurs WHERE steam_id = ?',
            [steamId]
        );
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: 'Erreur MySQL', details: err.message });
    }
});

module.exports = router;
