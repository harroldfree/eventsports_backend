const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, aucun token fourni' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secret_key');
    req.user = decoded; // Ajoute l'utilisateur décodé à la requête
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};
