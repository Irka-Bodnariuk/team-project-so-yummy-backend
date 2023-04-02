const getAllRecipes = require("./getAllRecipies");
const getRecipesMainPage = require("./getRecipesMainPage");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  getAllRecipes: ctrlWrapper(getAllRecipes),
  getRecipesMainPage: ctrlWrapper(getRecipesMainPage),
};
