// connection.js
const { Sequelize } = require('sequelize');

// Connexion à la base de données "speedrun_trophees"
const sequelize = new Sequelize('speedrun_trophees', 'root', 'root', {
  host: 'localhost',
  port: 8889, // Adapter si besoin
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;