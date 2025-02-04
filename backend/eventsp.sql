-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 01 fév. 2025 à 15:18
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `eventsp`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int(11) NOT NULL,
  `nom_categorie` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `nom_categorie`) VALUES
(1, 'Concert'),
(2, 'Sport'),
(3, 'Art'),
(4, 'Conférence'),
(5, 'Atelier');

-- --------------------------------------------------------

--
-- Structure de la table `evenement`
--

CREATE TABLE `evenement` (
  `id_evenement` int(11) NOT NULL,
  `nom_evenement` varchar(100) NOT NULL,
  `date_debut` date NOT NULL,
  `lieu` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `evenement`
--

INSERT INTO `evenement` (`id_evenement`, `nom_evenement`, `date_debut`, `lieu`, `description`, `id_user`, `id_categorie`, `image_url`) VALUES
(9, 'Conférence Tech', '2024-03-15', 'Paris', 'Un grand rassemblement des passionnés de technologie.', 1, 2, 'https://i.ibb.co/gM4skShd/Black-and-White-Monochrome-Tech-Logo.png'),
(10, 'Festival de Musique', '2024-07-20', 'Lyon', 'Un festival avec des artistes internationaux.', 2, 3, 'https://example.com/images/festival.jpg'),
(11, 'Salon du Livre', '2024-05-10', 'Marseille', 'Un salon pour les amateurs de littérature.', 3, 1, 'https://example.com/images/livre.jpg'),
(12, 'Hackathon Développeur', '2024-04-25', 'Toulouse', 'Un hackathon de 48h pour les développeurs.', 4, 2, 'https://example.com/images/hackathon.jpg'),
(13, 'Marathon de Paris', '2024-06-01', 'Paris', 'Une course de 42 km à travers la ville.', 5, 4, 'https://example.com/images/marathon.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `participation`
--

CREATE TABLE `participation` (
  `id_participation` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `motdepasse` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `nom`, `email`, `motdepasse`) VALUES
(1, '', '', ''),
(2, 'Jane Smith', 'janesmith@example.com', 'hashed_password_456'),
(3, 'Mike Brown', 'mikebrown@example.com', 'hashed_password_789'),
(4, 'Anna White', 'annawhite@example.com', 'hashed_password_321'),
(5, 'Chris Green', 'chrisgreen@example.com', 'hashed_password_654'),
(6, 'John Doe', 'johndoe@example.com', '123456'),
(7, 'John bedel', 'john.doe@gmail.com', '$2b$10$pxq4fWIZpryA1uiR4fZVjeD1B.Izx.IW.zw5MmVOUnTfIfsSHRHJC'),
(8, 'John Bedel', 'jharrold@exemple.com', '$2b$10$jy1x2Uvr5iJDfm7uxlkGZOpoaIXfnPJOhbUHtbCxAUIOTmERO8n2u');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Index pour la table `evenement`
--
ALTER TABLE `evenement`
  ADD PRIMARY KEY (`id_evenement`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `participation`
--
ALTER TABLE `participation`
  ADD PRIMARY KEY (`id_participation`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_evenement` (`id_evenement`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `evenement`
--
ALTER TABLE `evenement`
  MODIFY `id_evenement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `participation`
--
ALTER TABLE `participation`
  MODIFY `id_participation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `evenement`
--
ALTER TABLE `evenement`
  ADD CONSTRAINT `evenement_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `evenement_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON DELETE CASCADE;

--
-- Contraintes pour la table `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `participation_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `participation_ibfk_2` FOREIGN KEY (`id_evenement`) REFERENCES `evenement` (`id_evenement`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
