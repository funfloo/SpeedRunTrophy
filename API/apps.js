// apps.js
const express = require('express');
const sequelize = require('./connection');
const { DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Définition du modèle User (table 'users')
const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  username: { 
    type: DataTypes.STRING(50), 
    allowNull: false, 
    unique: true 
  },
  email: { 
    type: DataTypes.STRING(100), 
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  steam_id: { 
    type: DataTypes.STRING(50), 
    allowNull: true, 
    unique: true 
  },
}, {
  tableName: 'users',
  timestamps: false,
});

// Définition du modèle Game (table 'games')
const Game = sequelize.define('Game', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
}, {
  tableName: 'games',
  timestamps: false,
});

// Définition du modèle Trophy (table 'trophees')
const Trophy = sequelize.define('Trophy', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  game_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
}, {
  tableName: 'trophees',
  timestamps: false,
});

// Définition du modèle UserTrophy (table 'user_trophees')
const UserTrophy = sequelize.define('UserTrophy', {
  user_id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    allowNull: false 
  },
  trophee_id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    allowNull: false 
  },
  obtained_date: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
}, {
  tableName: 'user_trophees',
  timestamps: false,
});

// Associations Many-to-Many entre User et Trophy via UserTrophy
User.belongsToMany(Trophy, { 
  through: UserTrophy, 
  foreignKey: 'user_id', 
  otherKey: 'trophee_id'
});
Trophy.belongsToMany(User, { 
  through: UserTrophy, 
  foreignKey: 'trophee_id', 
  otherKey: 'user_id'
});

// Regroupement des modèles dans un objet pour les transmettre aux fonctions
const models = { User, Game, Trophy, UserTrophy };

// Importation du module de fonctions qui ajoute tous les endpoints à notre app
require('./fonctions')(app, models);

// Synchronisation avec la base de données puis démarrage du serveur
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Serveur démarré sur le port 3000');
    });
  })
  .catch(err => console.error('Erreur de synchronisation avec la base de données:', err));