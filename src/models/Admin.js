const sequelize = require('./db');
const { DataTypes } = require('sequelize')
const Admin = sequelize.define(
  "Admin",
  {
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createAt: false,
    updatedAt: false,
    paranoid: true,
  }
);

(async () => {
  await Admin.sync();

})()

module.exports = Admin;