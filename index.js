const express = require('express');
const sequelize = require('./config/database'); // Importe la configuration de Sequelize
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Pour les requêtes JSON
app.use(cors());  // Autoriser les requêtes cross-origin
app.use(express.json());  // Parser les requêtes JSON
// Routes
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');
const attemptRoutes = require('./routes/attempts');
const leaderboardRoutes = require('./routes/leaderboard');

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.listen(PORT, () => {
  console.log(`Backend Express est en cours d'exécution sur le port ${PORT}`);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


