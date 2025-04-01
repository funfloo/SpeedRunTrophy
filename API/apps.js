const express = require('express');
const sequelize = require('./connection');
const { DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Modèle Utilisateur
const Utilisateur = sequelize.define('Utilisateur', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
}, { tableName: 'utilisateurs', timestamps: false });

// Modèle Jeu
const Jeu = sequelize.define('Jeu', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING(100), allowNull: false },
}, { tableName: 'jeux', timestamps: false });

// Modèle Trophee
const Trophee = sequelize.define('Trophee', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING(100), allowNull: false },
  jeu_id: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'trophees', timestamps: false });

// Modèle JeuxUtilisateur
const JeuxUtilisateur = sequelize.define('JeuxUtilisateur', {
  utilisateur_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
  jeu_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
}, { tableName: 'jeux_utilisateur', timestamps: false });

// Modèle LiaisonSteam
const LiaisonSteam = sequelize.define('LiaisonSteam', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  utilisateur_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  steam_id: { type: DataTypes.STRING(50), allowNull: false, unique: true },
}, { tableName: 'liaison_steam', timestamps: false });

// Modèle ProgressionUtilisateur
const ProgressionUtilisateur = sequelize.define('ProgressionUtilisateur', {
  utilisateur_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
  jeu_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
  progression: { type: DataTypes.FLOAT, allowNull: true },
  derniere_mise_a_jour: { type: DataTypes.DATE, allowNull: true },
}, { tableName: 'progression_utilisateur', timestamps: false });

// Associations
Utilisateur.belongsToMany(Jeu, { through: JeuxUtilisateur, foreignKey: 'utilisateur_id', otherKey: 'jeu_id' });
Jeu.belongsToMany(Utilisateur, { through: JeuxUtilisateur, foreignKey: 'jeu_id', otherKey: 'utilisateur_id' });
Trophee.belongsTo(Jeu, { foreignKey: 'jeu_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Jeu.hasMany(Trophee, { foreignKey: 'jeu_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Utilisateur.hasOne(LiaisonSteam, { foreignKey: 'utilisateur_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
LiaisonSteam.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });
Utilisateur.belongsToMany(Jeu, { through: ProgressionUtilisateur, foreignKey: 'utilisateur_id', otherKey: 'jeu_id', as: 'progressions' });
Jeu.belongsToMany(Utilisateur, { through: ProgressionUtilisateur, foreignKey: 'jeu_id', otherKey: 'utilisateur_id', as: 'progressions' });

// Endpoints pour utilisateurs
app.get('/utilisateurs', async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll();
    res.json(utilisateurs);
  } catch (err) {
    console.error("❌ Erreur récupération utilisateurs :", err);
    res.status(500).json({ error: "Erreur récupération utilisateurs." });
  }
});

app.post('/utilisateurs', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await Utilisateur.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("❌ Erreur création utilisateur :", err);
    res.status(500).json({ error: "Erreur création utilisateur." });
  }
});

// Endpoints pour jeux
app.get('/jeux', async (req, res) => {
  try {
    const jeux = await Jeu.findAll();
    res.json(jeux);
  } catch (err) {
    console.error("❌ Erreur récupération jeux :", err);
    res.status(500).json({ error: "Erreur récupération jeux." });
  }
});

// Endpoints pour trophées
app.get('/trophees', async (req, res) => {
  try {
    const trophees = await Trophee.findAll();
    res.json(trophees);
  } catch (err) {
    console.error("❌ Erreur récupération trophées :", err);
    res.status(500).json({ error: "Erreur récupération trophées." });
  }
});

// Server startup
sequelize.sync()
  .then(() => {
    app.listen(3001, () => {
      console.log('Serveur démarré sur le port 3001');
    });
  })
  .catch(err => {
    console.error('Erreur de synchronisation:', err);
  });

module.exports = app;
