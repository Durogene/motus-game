const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attempt = sequelize.define('Attempt', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attempt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feedback: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Attempt;
