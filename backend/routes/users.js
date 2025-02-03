const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');

// Promisifier les requêtes MySQL pour async/await
connection.query = util.promisify(connection.query);

// ✅ Création d'un utilisateur
router.post(
  '/',
  [
    body('nom').notEmpty().withMessage('Le nom est requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('motdepasse').isLength({ min: 6 }).withMessage('Mot de passe trop court'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nom, email, motdepasse } = req.body;

    try {
      const queryCheckEmail = 'SELECT * FROM user WHERE email = ?';
      const emailResults = await connection.query(queryCheckEmail, [email]);

      if (emailResults.length > 0) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }

      const hashedPassword = await bcrypt.hash(motdepasse, 10);
      const query = 'INSERT INTO user (nom, email, motdepasse) VALUES (?, ?, ?)';
      await connection.query(query, [nom, email, hashedPassword]);

      res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
    } catch (err) {
      console.error('Erreur:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
);


// ✅ Authentification et génération de token
router.post('/login', async (req, res) => {
  const { email, motdepasse } = req.body;

  try {
    const results = await connection.query('SELECT * FROM user WHERE email = ?', [email]);

    // Si l'utilisateur n'est pas trouvé
    if (results.length === 0) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    const user = results[0];  // Utilisateur trouvé

    // Comparaison du mot de passe
    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);

    // Si le mot de passe est incorrect
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id_user },  // Payload du token (ID de l'utilisateur)
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1h' }  // Le token expirera dans 1 heure
    );

    // Retourner le token et les informations de l'utilisateur
    res.json({
      token,  // Le token JWT
      user: {  // Les informations de l'utilisateur
        id: user.id_user,
        nom: user.nom,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
////////////////////////////////////////////////

// ✅ Obtenir tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const results = await connection.query('SELECT id_user, nom, email FROM user'); // On exclut motdepasse
    res.status(200).json(results);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ Obtenir un utilisateur par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const results = await connection.query('SELECT id_user, nom, email FROM user WHERE id_user = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(results[0]);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, email, motdepasse } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    const query = 'UPDATE user SET nom = ?, email = ?, motdepasse = ? WHERE id_user = ?';
    const results = await connection.query(query, [nom, email, hashedPassword, id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const results = await connection.query('DELETE FROM user WHERE id_user = ?', [id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;