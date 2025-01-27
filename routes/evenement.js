const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtenir tous les événements
router.get('/', (req, res) => {
  const query = 'SELECT * FROM evenement';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des événements:', err);
      res.status(500).send('Erreur lors de la récupération des événements');
    } else {
      res.status(200).json(results);
    }
  });
});

// pour pouvoir push

// Obtenir un événement par ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM evenement WHERE id_evenement = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'événement:', err);
      res.status(500).send('Erreur lors de la récupération de l\'événement');
    } else if (results.length === 0) {
      res.status(404).send('Événement non trouvé');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Ajouter un nouvel événement
router.post('/', (req, res) => {
  const { nom_evenement, date_debut, lieu, description, role, id_categorie } = req.body;
  const query = 'INSERT INTO evenement (nom_evenement, date_debut, lieu, description, role, id_categorie) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [nom_evenement, date_debut, lieu, description, role, id_categorie], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de l\'événement:', err);
      res.status(500).send('Erreur lors de l\'ajout de l\'événement');
    } else {
      res.status(201).send('Événement ajouté avec succès');
    }
  });
});

// Mettre à jour un événement
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nom_evenement, date_debut, lieu, description, role, id_categorie } = req.body;
  const query = 'UPDATE evenement SET nom_evenement = ?, date_debut = ?, lieu = ?, description = ?, role = ?, id_categorie = ? WHERE id_evenement = ?';
  connection.query(query, [nom_evenement, date_debut, lieu, description, role, id_categorie, id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l\'événement:', err);
      res.status(500).send('Erreur lors de la mise à jour de l\'événement');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Événement non trouvé');
    } else {
      res.status(200).send('Événement mis à jour avec succès');
    }
  });
});

// Supprimer un événement
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM evenement WHERE id_evenement = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'événement:', err);
      res.status(500).send('Erreur lors de la suppression de l\'événement');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Événement non trouvé');
    } else {
      res.status(200).send('Événement supprimé avec succès');
    }
  });
});

module.exports = router;
