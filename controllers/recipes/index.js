const getAllRecipes = require("./getAllRecipies");
const getRecipesMainPage = require("./getRecipesMainPage");
const getRecipeById = require("./getRecipeById");
const getRecipeByCategory = require("./getRecipeByCategory");
const searchRecipeByTitle = require("./searchRecipeByTitle");
const searchRecipeByIngredient = require("./searchRecipeByIngredient");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  getAllRecipes: ctrlWrapper(getAllRecipes),
  getRecipesMainPage: ctrlWrapper(getRecipesMainPage),
  getRecipeById: ctrlWrapper(getRecipeById),
  getRecipeByCategory: ctrlWrapper(getRecipeByCategory),
  searchRecipeByTitle: ctrlWrapper(searchRecipeByTitle),
  searchRecipeByIngredient: ctrlWrapper(searchRecipeByIngredient),
};
