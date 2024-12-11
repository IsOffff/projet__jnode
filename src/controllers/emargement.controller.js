const Emargement = require('../models/emargement.model');
const Session = require('../models/session.model');
const { AppError } = require('../utils/errors');
const { ERROR_MESSAGES } = require('../utils/constants');

exports.markAttendance = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const etudiantId = req.user.id;

    const session = await Session.findById(sessionId);
    if (!session) {
      throw new AppError(ERROR_MESSAGES.NOT_FOUND, 404);
    }

    if (new Date(session.date) < new Date()) {
      throw new AppError('Cannot mark attendance for past sessions', 400);
    }

    await Emargement.create({
      session_id: sessionId,
      etudiant_id: etudiantId
    });

    res.status(201).json({
      status: 'success',
      message: 'Attendance marked successfully'
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      next(new AppError('Already marked attendance for this session', 400));
    } else {
      next(error);
    }
  }
};

exports.getSessionAttendance = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    
    const session = await Session.findById(sessionId);
    if (!session) {
      throw new AppError(ERROR_MESSAGES.NOT_FOUND, 404);
    }

    if (session.formateur_id !== req.user.id) {
      throw new AppError(ERROR_MESSAGES.UNAUTHORIZED, 403);
    }

    const attendance = await Emargement.findBySessionId(sessionId);
    res.json({
      status: 'success',
      data: { attendance }
    });
  } catch (error) {
    next(error);
  }
};