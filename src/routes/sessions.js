const express = require('express');
const router = express.Router();
const { auth, isFormateur } = require('../middleware/auth');
const Session = require('../models/Session');
const { z } = require('zod');

const sessionSchema = z.object({
  title: z.string().min(2),
  date: z.string().datetime(),
});

router.post('/', auth, isFormateur, async (req, res) => {
  try {
    const validatedData = sessionSchema.parse(req.body);
    const sessionId = await Session.create({
      ...validatedData,
      formateur_id: req.user.id
    });
    res.status(201).json({ message: 'Session created', sessionId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const sessions = await Session.findAll();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, isFormateur, async (req, res) => {
  try {
    const validatedData = sessionSchema.parse(req.body);
    await Session.update(req.params.id, validatedData);
    res.json({ message: 'Session updated' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, isFormateur, async (req, res) => {
  try {
    await Session.delete(req.params.id);
    res.json({ message: 'Session deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;