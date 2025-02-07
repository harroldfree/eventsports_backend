const mysql = require('mysql2');

// Crée une connexion à la base de données
const connection = mysql.createConnection({
  host: process.env.HOST,      // Hôte, généralement 'localhost' ou '127.0.0.1'
  user: process.env.USER  ,// Ton utilisateur MySQL  
  password: process.env.PASSWORD, // Ton mot de passe MySQL
  database: process.env.DATABASE  // Le nom de la base de données à laquelle tu veux te connecter
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ' );
    return;
  }
  console.log('Connecté à la base de données  ' );
});

module.exports = connection;
