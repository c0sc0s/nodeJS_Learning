const { Sequelize } = require('sequelize');
const { sqlLogger } = require("../log")
const sequelize = new Sequelize('school', 'root', 'ywj2022f', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => {
    sqlLogger.debug(msg);
  }
  // timezone: '+8:00'
})
module.exports = sequelize;