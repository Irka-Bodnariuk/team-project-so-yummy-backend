const { Recipe } = require("../../models/recipes");

const getMainPage = async (req, res, next) => {
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

  const result = [
    resultRecipes[0].breakfast,
    resultRecipes[0].vegan,
    resultRecipes[0].miscellaneous,
    resultRecipes[0].desserts,
  ];

  res.status(200).json({ result });
};

module.exports = getMainPage;
