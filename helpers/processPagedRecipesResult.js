const listRecipeResponse = require("./listRecipeResponse");

const processPagedRecipesResult = ({ result, userId }) => {
  const total = result[0]?.count[0]?.total || 0;
  let recipes = [];
  if (total) {
    recipes = listRecipeResponse(result[0].data, userId);
  }
  return { recipes, total };
};

module.exports = processPagedRecipesResult;
