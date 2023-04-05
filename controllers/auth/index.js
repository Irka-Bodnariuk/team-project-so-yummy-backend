const register = require("./register");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const login = require("./login");
const current = require("./current");
const logout = require("./logout");
const updateProfile = require("./updateProfile");
const updateSubscribe = require("./updateSubscribe");
const allShoppingList = require("./allShoppingList");
const addProductToShoppingList = require("./addProductToShoppingList");
const deleteProductFromShoppingList = require("./deleteProductFromShoppingList");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateProfile: ctrlWrapper(updateProfile),
  updateSubscribe: ctrlWrapper(updateSubscribe),
  allShoppingList: ctrlWrapper(allShoppingList),
  addProductToShoppingList: ctrlWrapper(addProductToShoppingList),
  deleteProductFromShoppingList: ctrlWrapper(deleteProductFromShoppingList),
};
