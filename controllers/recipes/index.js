const getAll = require("./getAll");
const getAllRecipes = require("./getAllRecipies");
const getRecipesMainPage = require("./getRecipesMainPage");
const getRecipeById = require("./getRecipeById");
const getRecipeByCategory = require("./getRecipeByCategory");
const searchRecipeByIngredient = require("./searchRecipeByIngredient");
const searchRecipeByTitle = require("./searchRecipeByTitle");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getAllRecipes: ctrlWrapper(getAllRecipes),
  getRecipesMainPage: ctrlWrapper(getRecipesMainPage),
  getRecipeById: ctrlWrapper(getRecipeById),
  getRecipeByCategory: ctrlWrapper(getRecipeByCategory),
  searchRecipeByIngredient: ctrlWrapper(searchRecipeByIngredient),
  searchRecipeByTitle: ctrlWrapper(searchRecipeByTitle),
};
