const Session = require('../models/session.model');
const { AppError } = require('../utils/errors');
const { ERROR_MESSAGES } = require('../utils/constants');

exports.createSession = async (req, res, next) => {
  try {
    const sessionData = {
      ...req.body,
      formateur_id: req.user.id
    };
    
    const sessionId = await Session.create(sessionData);
    res.status(201).json({
      status: 'success',
      data: { sessionId }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllSessions = async (req, res, next) => {
  try {
    const sessions = await Session.findAll();
    res.json({
      status: 'success',
      data: { sessions }
    });
  } catch (error) {
    next(error);
  }
};

exports.getSessionById = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      throw new AppError(ERROR_MESSAGES.NOT_FOUND, 404);
    }
    
    res.json({
      status: 'success',
      data: { session }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      throw new AppError(ERROR_MESSAGES.NOT_FOUND, 404);
    }
    
    if (session.formateur_id !== req.user.id) {
      throw new AppError(ERROR_MESSAGES.UNAUTHORIZED, 403);
    }
    
    await Session.update(req.params.id, req.body);
    res.json({
      status: 'success',
      message: 'Session updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      throw new AppError(ERROR_MESSAGES.NOT_FOUND, 404);
    }
    
    if (session.formateur_id !== req.user.id) {
      throw new AppError(ERROR_MESSAGES.UNAUTHORIZED, 403);
    }
    
    await Session.delete(req.params.id);
    res.json({
      status: 'success',
      message: 'Session deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};