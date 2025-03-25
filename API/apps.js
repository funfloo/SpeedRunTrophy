const express = require('express');
const sequelize = require('./connection');
const { DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Modèle Utilisateur (table 'utilisateurs')
const Utilisateur = sequelize.define('Utilisateur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'utilisateurs',
  timestamps: false,
});

// Modèle Jeu (table 'jeux')
const Jeu = sequelize.define('Jeu', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'jeux',
  timestamps: false,
});

// Modèle Trophee (table 'trophees')
const Trophee = sequelize.define('Trophee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  jeu_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'trophees',
  timestamps: false,
});

// Modèle JeuxUtilisateur (table 'jeux_utilisateur') - relation many-to-many entre utilisateurs et jeux
const JeuxUtilisateur = sequelize.define('JeuxUtilisateur', {
  utilisateur_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  jeu_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  // Vous pouvez ajouter d'autres colonnes (ex. date d'inscription) si nécessaire
}, {
  tableName: 'jeux_utilisateur',
  timestamps: false,
});

// Modèle LiaisonSteam (table 'liaison_steam') - associe un utilisateur à son compte Steam
const LiaisonSteam = sequelize.define('LiaisonSteam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  steam_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'liaison_steam',
  timestamps: false,
});

// Modèle ProgressionUtilisateur (table 'progression_utilisateur') - suit la progression d'un utilisateur dans un jeu
const ProgressionUtilisateur = sequelize.define('ProgressionUtilisateur', {
  utilisateur_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  jeu_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  progression: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  derniere_mise_a_jour: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'progression_utilisateur',
  timestamps: false,
});

// Associations

// Relation many-to-many entre Utilisateur et Jeu via JeuxUtilisateur
Utilisateur.belongsToMany(Jeu, {
  through: JeuxUtilisateur,
  foreignKey: 'utilisateur_id',
  otherKey: 'jeu_id',
});
Jeu.belongsToMany(Utilisateur, {
  through: JeuxUtilisateur,
  foreignKey: 'jeu_id',
  otherKey: 'utilisateur_id',
});

// Relation entre Jeu et Trophee
Trophee.belongsTo(Jeu, {
  foreignKey: 'jeu_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Jeu.hasMany(Trophee, {
  foreignKey: 'jeu_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// Relation one-to-one entre Utilisateur et LiaisonSteam
Utilisateur.hasOne(LiaisonSteam, {
  foreignKey: 'utilisateur_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
LiaisonSteam.belongsTo(Utilisateur, {
  foreignKey: 'utilisateur_id',
});

// Pour ProgressionUtilisateur, nous créons une association many-to-many avec attributs supplémentaires
Utilisateur.belongsToMany(Jeu, {
  through: ProgressionUtilisateur,
  foreignKey: 'utilisateur_id',
  otherKey: 'jeu_id',
  as: 'progressions',
});
Jeu.belongsToMany(Utilisateur, {
  through: ProgressionUtilisateur,
  foreignKey: 'jeu_id',
  otherKey: 'utilisateur_id',
  as: 'progressions',
});

// Regroupement des modèles
const models = {
  Utilisateur,
  Jeu,
  Trophee,
  JeuxUtilisateur,
  LiaisonSteam,
  ProgressionUtilisateur,
};

// Importation du module de fonctions qui va ajouter les endpoints
require('./fonctions')(app, models);

// Synchronisation avec la base de données puis démarrage du serveur
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Serveur démarré sur le port 3000');
    });
  })
  .catch(err => console.error('Erreur de synchronisation:', err));

module.exports = app;