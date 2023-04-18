const { Recipe } = require("../../models/recipes");
const { response } = require("../../helpers");

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

  const breakfast = response(resultRecipes[0].breakfast, req.user._id);
  const vegan = response(resultRecipes[0].vegan, req.user._id);
  const miscellaneous = response(resultRecipes[0].miscellaneous, req.user._id);
  const desserts = response(resultRecipes[0].dessert, req.user._id);

  const result = [breakfast, miscellaneous, vegan, desserts];

  res.status(200).json({ resultRecipes });
};

module.exports = getMainPage;
