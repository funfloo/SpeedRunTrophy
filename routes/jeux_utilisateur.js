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
    const [rows] = await db.execute('SELECT * FROM jeux_utilisateur');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
});

export default router;
