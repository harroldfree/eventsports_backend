const express = require('express');
const router = express.Router();
const connection = require('../config/db'); // Importez la configuration de la base de données

// Obtenir tous les utilisateurs
router.get('/', (req, res) => {
  const query = 'SELECT * FROM user';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      res.status(500).send('Erreur lors de la récupération des utilisateurs');
    } else {
      res.status(200).json(results);
    }
  });
});

// Obtenir un utilisateur par ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM user WHERE id_user = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', err);
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
    } else if (results.length === 0) {
      res.status(404).send('Utilisateur non trouvé');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Ajouter un nouvel utilisateur
router.post('/', (req, res) => {
  const { nom, email, motdepasse, role } = req.body;
  const query = 'INSERT INTO user (nom, email, motdepasse, role) VALUES (?, ?, ?, ?)';
  connection.query(query, [nom, email, motdepasse, role], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
      res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
    } else {
      res.status(201).send('Utilisateur ajouté avec succès');
    }
  });
});

// Mettre à jour un utilisateur
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nom, email, motdepasse, role } = req.body;
  const query = 'UPDATE user SET nom = ?, email = ?, motdepasse = ?, role = ? WHERE id_user = ?';
  connection.query(query, [nom, email, motdepasse, role, id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
      res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Utilisateur non trouvé');
    } else {
      res.status(200).send('Utilisateur mis à jour avec succès');
    }
  });
});

// Supprimer un utilisateur
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM user WHERE id_user = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Utilisateur non trouvé');
    } else {
      res.status(200).send('Utilisateur supprimé avec succès');
    }
  });
});

module.exports = router;
