const { Recipe } = require("../../models/recipes");
const { listRecipeResponse } = require("../../helpers");

const getRecipesMainPage = async (req, res, next) => {
  const options = [
    { $sample: { size: 4 } },
    { $limit: 4 },
    {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        ingredients: 0,
        area: 0,
        tags: 0,
        thumb: 0,
      },
    },
  ];
  const resultRecipes = await Recipe.aggregate([
    {
      $facet: {
        breakfast: [{ $match: { category: "Breakfast" } }, ...options],
        vegan: [{ $match: { category: "Vegan" } }, ...options],
        miscellaneous: [{ $match: { category: "Miscellaneous" } }, ...options],
        dessert: [{ $match: { category: "Dessert" } }, ...options],
      },
    },
  ]);

  const breakfast = listRecipeResponse(
    resultRecipes[0].breakfast,
    req.user._id
  );
  const vegan = listRecipeResponse(resultRecipes[0].vegan, req.user._id);
  const miscellaneous = listRecipeResponse(
    resultRecipes[0].miscellaneous,
    req.user._id
  );
  const dessert = listRecipeResponse(resultRecipes[0].dessert, req.user._id);

  const result = [breakfast, vegan, miscellaneous, dessert];

  res.status(200).json({ result });
};

module.exports = getRecipesMainPage;
