const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtenir toutes les catégories
router.get('/', (req, res) => {
  const query = 'SELECT * FROM categorie';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des catégories:', err);
      res.status(500).send('Erreur lors de la récupération des catégories');
    } else {
      res.status(200).json(results);
    }
  });
});

// Ajouter une nouvelle catégorie
router.post('/', (req, res) => {
  const { nom_categorie } = req.body;
  const query = 'INSERT INTO categorie (nom_categorie) VALUES (?)';
  connection.query(query, [nom_categorie], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de la catégorie:', err);
      res.status(500).send('Erreur lors de l\'ajout de la catégorie');
    } else {
      res.status(201).send('Catégorie ajoutée avec succès');
    }
  });
});

// Supprimer une catégorie
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM categorie WHERE id_categorie = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression de la catégorie:', err);
      res.status(500).send('Erreur lors de la suppression de la catégorie');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Catégorie non trouvée');
    } else {
      res.status(200).send('Catégorie supprimée avec succès');
    }
  });
});

module.exports = router;
