const jwt = require('jsonwebtoken');
const { ROLES, ERROR_MESSAGES } = require('../utils/constants');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
  }
};

const isFormateur = (req, res, next) => {
  if (req.user.role !== ROLES.FORMATEUR) {
    return res.status(403).json({ message: ERROR_MESSAGES.FORBIDDEN });
  }
  next();
};

const isEtudiant = (req, res, next) => {
  if (req.user.role !== ROLES.ETUDIANT) {
    return res.status(403).json({ message: ERROR_MESSAGES.FORBIDDEN });
  }
  next();
};

module.exports = { auth, isFormateur, isEtudiant };
