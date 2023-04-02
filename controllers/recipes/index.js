const getAllRecipes = require("./getAllRecipies");
const getRecipesMainPage = require("./getRecipesMainPage");
const getRecipeById = require("./getRecipeById");
const getRecipeByCategory = require("./getRecipeByCategory");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  getAllRecipes: ctrlWrapper(getAllRecipes),
  getRecipesMainPage: ctrlWrapper(getRecipesMainPage),
  getRecipeById: ctrlWrapper(getRecipeById),
  getRecipeByCategory: ctrlWrapper(getRecipeByCategory),
};
