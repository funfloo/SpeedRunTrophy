const express = require('express');
const sequelize = require('./connection');
const { DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// ======== Définition des Modèles Sequelize =========
const Utilisateur = sequelize.define('Utilisateur', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false }
}, {
  tableName: 'utilisateurs',
  timestamps: false
});

const Jeu = sequelize.define('Jeu', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nom: { type: DataTypes.STRING(100), allowNull: false }
}, {
  tableName: 'jeux',
  timestamps: false
});

const Trophee = sequelize.define('Trophee', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nom: { type: DataTypes.STRING(100), allowNull: false },
  jeu_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'trophees',
  timestamps: false
});

const JeuxUtilisateur = sequelize.define('JeuxUtilisateur', {
  utilisateur_id: { type: DataTypes.INTEGER, primaryKey: true },
  jeu_id: { type: DataTypes.INTEGER, primaryKey: true }
}, {
  tableName: 'jeux_utilisateur',
  timestamps: false
});

const LiaisonSteam = sequelize.define('LiaisonSteam', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  utilisateur_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  steam_id: { type: DataTypes.STRING(50), allowNull: false, unique: true }
}, {
  tableName: 'liaison_steam',
  timestamps: false
});

const ProgressionUtilisateur = sequelize.define('ProgressionUtilisateur', {
  utilisateur_id: { type: DataTypes.INTEGER, primaryKey: true },
  jeu_id: { type: DataTypes.INTEGER, primaryKey: true },
  progression: { type: DataTypes.FLOAT, allowNull: true },
  derniere_mise_a_jour: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'progression_utilisateur',
  timestamps: false
});

// ======== Associations ========
Utilisateur.belongsToMany(Jeu, { through: JeuxUtilisateur, foreignKey: 'utilisateur_id', otherKey: 'jeu_id' });
Jeu.belongsToMany(Utilisateur, { through: JeuxUtilisateur, foreignKey: 'jeu_id', otherKey: 'utilisateur_id' });

Trophee.belongsTo(Jeu, { foreignKey: 'jeu_id' });
Jeu.hasMany(Trophee, { foreignKey: 'jeu_id' });

Utilisateur.hasOne(LiaisonSteam, { foreignKey: 'utilisateur_id' });
LiaisonSteam.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });

Utilisateur.belongsToMany(Jeu, { through: ProgressionUtilisateur, foreignKey: 'utilisateur_id', otherKey: 'jeu_id', as: 'progressions' });
Jeu.belongsToMany(Utilisateur, { through: ProgressionUtilisateur, foreignKey: 'jeu_id', otherKey: 'utilisateur_id', as: 'progressions' });

// Regroupement pour fonctions.js
const models = {
  Utilisateur,
  Jeu,
  Trophee,
  JeuxUtilisateur,
  LiaisonSteam,
  ProgressionUtilisateur
};

// Endpoints REST
require('./fonctions')(app, models);

// Démarrage du serveur
sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("✅ API en ligne sur http://localhost:3001");
  });
}).catch(err => {
  console.error("❌ Erreur de synchronisation :", err);
});
