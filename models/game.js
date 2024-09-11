const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  word_to_guess: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty_level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attempts_left: {
    type: DataTypes.INTEGER,
    defaultValue: 6,
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Game;
import React, { useState } from 'react';
import axios from 'axios';



