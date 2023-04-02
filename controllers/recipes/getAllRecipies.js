const categoryList = require("../../recipesCategory");

const getAllRecipes = async (req, res, next) => {
  res.json(categoryList.sort());
};

module.exports = getAllRecipes;
