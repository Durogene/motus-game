const express = require('express');
const Game = require('../models/game');  // Utilisation du modèle Game
const Attempt = require('../models/attempt');  // Utilisation du modèle Attempt
const router = express.Router();

// Créer une nouvelle partie
router.post('/new', async (req, res) => {
  const { difficulty_level, word_to_guess } = req.body;
  const userId = req.userId;  // Récupéré depuis le JWT

  try {
    const newGame = await Game.create({
      user_id: userId,
      word_to_guess,
      difficulty_level,
    });

    res.json({ message: 'Nouvelle partie créée', game: newGame });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la partie', error });
  }
});

// Soumettre une tentative
router.post('/:gameId/attempt', async (req, res) => {
  const { attempt } = req.body;
  const gameId = req.params.gameId;

  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Partie non trouvée.' });
    }

    // Génération du feedback
    const feedback = generateFeedback(game.word_to_guess, attempt);

    // Enregistrer la tentative
    const newAttempt = await Attempt.create({
      game_id: gameId,
      attempt,
      feedback,
    });

    // Mise à jour des tentatives restantes
    game.attempts_left -= 1;
    if (feedback === 'RRRR') {  // Mot deviné correctement
      game.is_completed = true;
    }
    await game.save();

    res.json({ message: 'Tentative enregistrée', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la tentative', error });
  }
});

// Fonction pour générer un feedback (rouge, jaune, bleu)
function generateFeedback(wordToGuess, attempt) {
  // Logique pour comparer le mot à deviner et la tentative
  return 'RRYY';  // Exemple de feedback (à adapter)
}

module.exports = router;
