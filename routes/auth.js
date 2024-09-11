const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Utilisation du modèle User
const router = express.Router();

// Clé secrète pour signer les JWT (à définir dans les variables d'environnement)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Route d'inscription
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Vérification si l'utilisateur existe déjà
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Création de l'utilisateur
  const newUser = await User.create({
    username,
    email,
    password_hash: hashedPassword,
  });

  res.json({ message: 'Utilisateur créé avec succès', user: newUser });
});

// Route de connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Rechercher l'utilisateur dans la base de données
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: 'Utilisateur non trouvé.' });
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Mot de passe incorrect.' });
  }

  // Générer un JWT
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Connexion réussie', token });
});

module.exports = router;
