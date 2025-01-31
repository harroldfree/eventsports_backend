require('dotenv').config(); // Charger les variables d'environnement
var connection = require('./config/db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer'); // Import Multer

// Importer les routeurs
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var evenementRouter = require('./routes/evenement'); // Importer la route des événements
var participationRouter = require('./routes/participation'); // Importer la route des participations
var categorieRouter = require('./routes/categorie'); // Importer la route des categories

var app = express();
connection; // Connexion MySQL

// Configuration de Multer pour l'upload des images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Assure-toi que ce dossier existe
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer l'image
  }
});
const upload = multer({ storage: storage });

// Configuration des fichiers statiques (accès aux images uploadées)
app.use('/uploads', express.static('uploads'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Utiliser les routeurs
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route pour uploader une image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier envoyé' });
  }
  res.json({ 
    message: 'Fichier uploadé avec succès',
    fileUrl: `/uploads/${req.file.filename}` 
  });
});

// Routes principales
app.use('/', indexRouter);             // Route principale
app.use('/users', usersRouter);        // Route pour les utilisateurs
app.use('/evenement', evenementRouter); // Route pour les événements
app.use('/participation', participationRouter); // Route pour les participations
app.use('/categorie', categorieRouter); // Route pour les participations

// Middleware pour gérer les erreurs 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Gestion des erreurs
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
