const { AppError } = require('../utils/errors');

exports.validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      next(new AppError('Validation error', 400, error.errors));
    }
  };
};