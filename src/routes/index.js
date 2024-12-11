const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const sessionRoutes = require('./session.routes');
const emargementRoutes = require('./emargement.routes');

router.use('/auth', authRoutes);
router.use('/sessions', sessionRoutes);
router.use('/sessions', emargementRoutes);

module.exports = router;