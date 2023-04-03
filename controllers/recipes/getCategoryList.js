const categoryList = require("../../recipesCategory");

const getCategoryList = async (req, res, next) => {
  res.json(categoryList.sort());
};

module.exports = getCategoryList;
