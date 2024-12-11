const express = require('express');
const router = express.Router();
const { auth, isFormateur, isEtudiant } = require('../middleware/auth');
const Attendance = require('../models/Attendance');

router.post('/:id/emargement', auth, isEtudiant, async (req, res) => {
  try {
    const sessionId = req.params.id;
    const attendance = await Attendance.create({
      session_id: sessionId,
      etudiant_id: req.user.id,
      status: true
    });
    res.status(201).json({ message: 'Attendance recorded', attendanceId: attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id/emargement', auth, isFormateur, async (req, res) => {
  try {
    const attendances = await Attendance.findBySessionId(req.params.id);
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;