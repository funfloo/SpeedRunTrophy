import express from 'express';
import mysql from 'mysql2/promise';

const router = express.Router();

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'speedrun_trophees'
});

router.get('/', async (req, res) => {
  const steamId = req.session?.steam_id;
  if (!steamId) return res.status(401).json({ error: 'Utilisateur non connecté' });

  try {
    console.log('Utilisateur connecté :', steamId);

    const [missions] = await db.execute(`
      SELECT m.nom_mission, m.description, m.rarete
      FROM missions m
      JOIN jeux_utilisateur j ON j.jeu_id = m.jeu_id
      WHERE j.steam_id = ?
    `, [steamId]);

    if (missions.length === 0) {
      // Fallback missions si aucune trouvée
      const [defaultMissions] = await db.execute(`
        SELECT nom_mission, description, rarete FROM missions LIMIT 5
      `);
      return res.json(defaultMissions);
    }

    res.json(missions);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
});

export default router;
