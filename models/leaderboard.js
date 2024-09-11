const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Leaderboard = sequelize.define('Leaderboard', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Leaderboard;
