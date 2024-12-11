const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const User = require('../models/User');
const logger = require('../utils/logger');
const INVALID_CREDENTIALS = 'Invalid credentials';
const { ROLES, ERROR_MESSAGES } = require('../utils/constants');


const userSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  role: z.enum(['formateur', 'etudiant'])
});

router.post('/signup', async (req, res, next) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const existingUser = await User.findByEmail(validatedData.email);
    
    if (existingUser) {
      throw new ValidationError([{ field: 'email', message: 'Email already exists' }]);
    }

    const userId = await User.create(validatedData);
    logger.info(`New user created: ${userId}`);
    
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: { userId }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AuthenticationError('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    logger.info(`User logged in: ${user.id}`);
    
    res.json({
      status: 'success',
      data: { token }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;