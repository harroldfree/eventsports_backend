# Project Node.js - Backend

Ce projet est une application web Node.js qui utilise XAMPP pour gérer les services Apache et MySQL. Ce fichier `README.md` vous guidera dans le processus de démarrage du projet.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/) : pour exécuter l'application backend.
- [XAMPP](https://www.apachefriends.org/index.html) : pour exécuter les services Apache et MySQL.
- [npm](https://www.npmjs.com/) : pour gérer les dépendances du projet.

## Étapes pour démarrer le projet

### 1. Cloner le projet

Si vous n'avez pas encore cloné le projet, commencez par le faire :

```bash
cd eventsports_backend
git clone https://github.com/harroldfree/eventsports_backend.git
```


### 2. Installer les dépendances
Rendez-vous dans le dossier "backend" et installez les dépendances nécessaires pour  l'application Node.js.

```bash
cd backend
npm install
```
Cela va installer toutes les dépendances définies dans le fichier package.json.

### 3. Démarrer xampp
Lancez XAMPP et assurez-vous que les services Apache et MySQL sont en cours d'exécution. Voici comment :

Ouvrez XAMPP.
Cliquez sur "Start" pour démarrer Apache.
Cliquez sur "Start" pour démarrer MySQL.
Cela lancera un serveur Apache (généralement sur le port 80) et un serveur MySQL (généralement sur le port 3306).

### 4. Importer le fichier .sql pour la base de données

a. Créer la base de données
Accédez à phpMyAdmin via votre navigateur. Vous pouvez y accéder depuis l'interface XAMPP en cliquant sur "admin" ou directement en entrant l'URL: http://localhost/phpmyadmin/index.php?route=/database/structure&db=eventsp.

Créez une nouvelle base de données en fonction de votre projet. Voici comment faire :

Allez dans l'onglet Bases de données.
Entrez un nom pour votre base de données (par exemple mon_projet_backend).
Cliquez sur Créer.
b. Importer le fichier .sql qui se trouve
Dans phpMyAdmin, après avoir créé la base de données :

Cliquez sur votre base de données dans la liste à gauche.
Allez dans l'onglet Import.
Cliquez sur le bouton Choisir un fichier et sélectionnez le fichier .sql que vous avez exporté dans le dossier racine de votre projet.
Cliquez sur Exécuter pour importer les tables et données dans la base de données.
Cela configurera automatiquement la structure de votre base de données.

### 5. Configurer les paramètres de connexion
Vérifiez le fichier de configuration de votre backend (par exemple config.js ou .env) pour vous assurer que les informations de connexion à la base de données MySQL sont correctes. Voici un exemple de configuration typique :
```bash
module.exports = {
  db: {
    host: 'localhost',
    user: 'root', // par défaut sur XAMPP
    password: '', // laissez vide si aucun mot de passe n'est défini
    database: 'eventsp' // nom de la base de données importée
  }
};
```
### 6. Lancer le backend
Retournez dans le dossier backend et lancez le serveur Node.js avec la commande suivante :
```bash
npm start
```
Cela démarrera votre serveur Node.js. Vous devriez voir un message indiquant que le serveur est en cours d'exécution, généralement sur le port 3000 (ou tout autre port que vous avez configuré).

### 7. Tester l'application

Une fois le serveur en cours d'exécution, ouvrez votre navigateur et accédez à l'URL suivante pour tester si votre backend fonctionne correctement :
```bash
http://localhost:3000
```
Vous pouvez également tester les différentes routes de votre API si vous en avez, ou vous assurer que la base de données est correctement connectée et fonctionne.



