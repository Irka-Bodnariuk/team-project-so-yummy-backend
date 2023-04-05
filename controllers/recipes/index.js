const getAll = require("./getAll");
const getCategoryList = require("./getCategoryList");
const getRecipesMainPage = require("./getRecipesMainPage");
const getRecipeById = require("./getRecipeById");
const getRecipeByCategory = require("./getRecipeByCategory");
const searchRecipeByIngredient = require("./searchRecipeByIngredient");
const searchRecipeByTitle = require("./searchRecipeByTitle");
const updateFavoriteById = require("./updateFavoriteById");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getCategoryList: ctrlWrapper(getCategoryList),
  getRecipesMainPage: ctrlWrapper(getRecipesMainPage),
  getRecipeById: ctrlWrapper(getRecipeById),
  getRecipeByCategory: ctrlWrapper(getRecipeByCategory),
  searchRecipeByIngredient: ctrlWrapper(searchRecipeByIngredient),
  searchRecipeByTitle: ctrlWrapper(searchRecipeByTitle),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};
