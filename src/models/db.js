const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('school', 'root', 'ywj2022f', {
  host: 'localhost',
  dialect: 'mysql',
  logging: null,
  // timezone: '+8:00'
})
module.exports = sequelize;