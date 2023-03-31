const register = require('./register');
const login = require('./login');
const { ctrlWrapper } = require('../../helpers');

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
