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
  try {
    const [rows] = await db.execute(`
      SELECT u.nom_utilisateur, u.avatar, SUM(t.points) AS total_points
      FROM utilisateurs u
      JOIN trophees t ON u.steam_id = t.steam_id
      GROUP BY u.steam_id
      ORDER BY total_points DESC
    `);
    console.log('Classement chargé :', rows);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur classement', details: err.message });
  }
});

export default router;
