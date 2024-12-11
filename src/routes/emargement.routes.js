const express = require('express');
const router = express.Router();
const { auth, isFormateur, isEtudiant } = require('../middleware/auth');
const emargementController = require('../controllers/emargement.controller');

router.post('/:id/emargement', auth, isEtudiant, emargementController.markAttendance);
router.get('/:id/emargement', auth, isFormateur, emargementController.getSessionAttendance);

module.exports = router;