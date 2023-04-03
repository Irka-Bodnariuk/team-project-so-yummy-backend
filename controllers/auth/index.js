const register = require("./register");
const login = require("./login");
const current = require("./current");
const logout = require("./logout");
const updateProfile = require("./updateProfile");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateProfile: ctrlWrapper(updateProfile),
};
