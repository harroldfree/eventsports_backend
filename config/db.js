const mysql = require('mysql2');

// Crée une connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',      // Hôte, généralement 'localhost' ou '127.0.0.1'
  user: 'root',// Ton utilisateur MySQL
  password: '', // Ton mot de passe MySQL
  database: 'eventsp' // Le nom de la base de données à laquelle tu veux te connecter
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ' );
    return;
  }
  console.log('Connecté à la base de données  ' );
});

// Exemple de requête pour récupérer des utilisateurs
// connection.query('SELECT * FROM users', (err, results) => {
//   if (err) {
//     console.error('Erreur lors de l\'exécution de la requête: ' + err.stack);
//     return;
//   }
//   console.log('Résultats de la requête: ', results);
// });

// Fermer la connexion lorsque le travail est terminé
// connection.end();
module.exports = connection;
