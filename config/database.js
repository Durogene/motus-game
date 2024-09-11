const { Sequelize } = require('sequelize');

// Utilisation de l'URL fournie par Railway pour PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Désactiver les logs Sequelize
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Important pour éviter les erreurs SSL avec Railway
    },
  },
});

module.exports = sequelize;
