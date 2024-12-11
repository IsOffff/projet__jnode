const { userSchema, loginSchema } = require('./user.validator');
const { sessionSchema } = require('./session.validator');
const { emargementSchema } = require('./emargement.validator');

module.exports = {
  userSchema,
  loginSchema,
  sessionSchema,
  emargementSchema
};