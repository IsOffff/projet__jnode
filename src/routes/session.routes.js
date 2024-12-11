const express = require('express');
const router = express.Router();

router.post('/start', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Session started',
  });
});

router.post('/end', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Session ended',
  });
});

module.exports = router;
