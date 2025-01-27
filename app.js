require('dotenv').config(); // Charger les variables d'environnement
var connection = require('./config/db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importer les routeurs
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var evenementRouter = require('./routes/evenement'); // Importer la route des événements
var participationRouter = require('./routes/participation'); // Importer la route des participations
var categorieRouter = require('./routes/categorie'); // Importer la route des categories

var app = express();
connection;  // Connexion MySQL

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Utiliser les routeurs
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes principales
app.use('/', indexRouter);             // Route principale
app.use('/users', usersRouter);        // Route pour les utilisateurs
app.use('/evenement', evenementRouter); // Route pour les événements
app.use('/participation', participationRouter); // Route pour les participations
app.use('/categorie', categorieRouter); // Route pour les participations

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
