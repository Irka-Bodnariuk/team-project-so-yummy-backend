const category = require("../../recipesCategory");

const getAllRecipes = async (req, res, next) => {
  res.json(category.sort());
};

module.exports = getAllRecipes;
