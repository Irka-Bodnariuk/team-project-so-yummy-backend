const response = require("./response");

const processPagedRecipesResult = ({ result, userId }) => {
  const total = result[0]?.count[0]?.total || 0;
  let recipes = [];
  if (total) {
    recipes = response(result[0].data, userId);
  }
  return { recipes, total };
};

module.exports = processPagedRecipesResult;
