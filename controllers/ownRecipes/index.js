const getOwnRecipes = require("./getOwnRecipes");
const addOwnRecipe = require("./addOwnRecipe");
const getOwnRecipeById = require("./getOwnRecipeById");
const deleteOwnById = require("./deleteOwnById");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  deleteOwnById: ctrlWrapper(deleteOwnById),
  getOwnRecipeById: ctrlWrapper(getOwnRecipeById),
};
