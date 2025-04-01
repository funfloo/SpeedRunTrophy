const { Sequelize } = require('sequelize');

// ⚠️ Remplace les infos par celles utilisées dans phpMyAdmin
const sequelize = new Sequelize('speedrun_trophees', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, // Port par défaut de MySQL (ne pas changer si tu utilises XAMPP)
});

module.exports = sequelize;
