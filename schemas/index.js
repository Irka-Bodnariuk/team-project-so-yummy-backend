const { registerSchema, loginSchema } = require('./authSchema');
module.exports = {
  '/auth/register': registerSchema,
  '/auth/login': loginSchema,
};
