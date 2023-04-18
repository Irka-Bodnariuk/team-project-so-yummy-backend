const getAll = require("./getAll");
const getCategoryList = require("./getCategoryList");
const getMainPage = require("./getMainPage");
const getRecipeById = require("./getRecipeById");
const getRecipeByCategory = require("./getRecipeByCategory");
const searchRecipeByIngredient = require("./searchRecipeByIngredient");
const searchRecipeByTitle = require("./searchRecipeByTitle");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getCategoryList: ctrlWrapper(getCategoryList),
  getMainPage: ctrlWrapper(getMainPage),
  getRecipeById: ctrlWrapper(getRecipeById),
  getRecipeByCategory: ctrlWrapper(getRecipeByCategory),
  searchRecipeByIngredient: ctrlWrapper(searchRecipeByIngredient),
  searchRecipeByTitle: ctrlWrapper(searchRecipeByTitle),
};
