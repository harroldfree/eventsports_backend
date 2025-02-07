// import auth from '../middleware/auth';
const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtenir toutes les participations
router.get('/', (req, res) => {
  const query = 'SELECT * FROM participation';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des participations:', err);
      res.status(500).send('Erreur lors de la récupération des participations');
    } else {
      res.status(200).json(results);
    }
  });
});

// Obtenir les participations d'un seul utilisateur
router.get('/:id_user', (req, res) => {
  const userId = req.params.id_user; // Récupère l'ID de l'utilisateur depuis l'URL
  const query = 'SELECT * FROM `participation`JOIN evenement WHERE evenement.id_evenement = participation.id_evenement and participation.id_user = ?';

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des participations:', err);
      res.status(500).send('Erreur lors de la récupération des participations');
    } else {
      res.status(200).json(results);
    }
  });
})

// Ajouter une participation
router.post('/', (req, res) => {
  const { id_user, id_evenement } = req.body;
  const query = 'INSERT INTO participation (id_user, id_evenement) VALUES (?, ?)';
  connection.query(query, [id_user, id_evenement], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de la participation:', err);
      res.status(500).send('Erreur lors de l\'ajout de la participation');
    } else {
      res.status(201).send('Participation ajoutée avec succès');
    }
  });
});

// Supprimer une participation
router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;
  console.log(req.user)
    console.log("Hello World !")
  const query = 'DELETE FROM participation WHERE id_evenement = ? and id_user = ?';
  connection.query(query, [id, req.user.id], (err, results) => {
    
    if (err) {
      console.error('Erreur lors de la suppression de la participation:', err);
      res.status(500).send('Erreur lors de la suppression de la participation');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Participation non trouvée');
    } else {
      res.status(200).send('Participation supprimée avec succès');
    }
  });
});

module.exports = router;
