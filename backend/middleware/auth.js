const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization'); // Récupérer le header Authorization

  if (!authHeader) {
    return res.status(403).json({ message: 'Accès refusé. Token manquant.' });
  }

  const token = authHeader.split(' ')[1]; // Extraire uniquement le token après "Bearer "

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret_key'); // Vérifier le token
    req.user = verified; // Stocker l'utilisateur vérifié dans `req`
    next(); // Passer à la prochaine fonction
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};
