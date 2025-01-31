const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const multer = require('multer');
const path = require('path');

// Configuration de Multer pour gérer l'upload des images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Assure-toi que ce dossier existe
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer l'image
  }
});
const upload = multer({ storage: storage });

// ✅ Obtenir tous les événements
router.get('/', (req, res) => {
  const query = 'SELECT * FROM evenement';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('❌ Erreur lors de la récupération des événements:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
    } else {
      res.status(200).json(results);
    }
  });
});

// ✅ Obtenir un événement par ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM evenement WHERE id_evenement = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('❌ Erreur lors de la récupération de l\'événement:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'événement' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Événement non trouvé' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// ✅ Ajouter un nouvel événement avec upload d'image
router.post('/', upload.single('image'), (req, res) => {
  const { nom_evenement, date_debut, lieu, description, id_categorie, id_user } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO evenement (nom_evenement, date_debut, lieu, description, id_categorie, id_user, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [nom_evenement, date_debut, lieu, description, id_categorie, id_user, image_url], (err, results) => {
    if (err) {
      console.error('❌ Erreur lors de l\'ajout de l\'événement:', err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'événement' });
    } else {
      res.status(201).json({ message: '✅ Événement ajouté avec succès', eventId: results.insertId });
    }
  });
});

// ✅ Mettre à jour un événement (avec ou sans nouvelle image)
router.put('/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { nom_evenement, date_debut, lieu, description, id_categorie } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url; // Garde l'ancienne image si pas de nouvelle image

  const query = 'UPDATE evenement SET nom_evenement = ?, date_debut = ?, lieu = ?, description = ?, id_categorie = ?, image_url = ? WHERE id_evenement = ?';
  connection.query(query, [nom_evenement, date_debut, lieu, description, id_categorie, image_url, id], (err, results) => {
    if (err) {
      console.error('❌ Erreur lors de la mise à jour de l\'événement:', err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'événement' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Événement non trouvé' });
    } else {
      res.status(200).json({ message: '✅ Événement mis à jour avec succès' });
    }
  });
});

// ✅ Supprimer un événement
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM evenement WHERE id_evenement = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('❌ Erreur lors de la suppression de l\'événement:', err);
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'événement' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Événement non trouvé' });
    } else {
      res.status(200).json({ message: '✅ Événement supprimé avec succès' });
    }
  });
});

module.exports = router;
