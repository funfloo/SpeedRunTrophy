const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('speedrun_trophees', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, // par défaut sur XAMPP
  logging: false,
});

module.exports = sequelize;
