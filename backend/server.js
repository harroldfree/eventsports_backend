const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');



const app = express();
const port = 3000;

// Configurer le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier où stocker les images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier
  }
});

const upload = multer({ storage: storage });

// Servir les fichiers statiques
app.use('/uploads', express.static('uploads'));

// Route pour uploader une image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier envoyé' });
  }
  res.json({ message: 'Fichier uploadé avec succès', fileUrl: `/uploads/${req.file.filename}` });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

app.use(cors()); // Permet toutes les requêtes CORS
