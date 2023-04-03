const { Recipe } = require("../../models/recipes");

const getRecipesMainPage = async (req, res, next) => {
  const result = await Recipe.aggregate([
    { $group: { _id: "$category", items: { $push: "$$ROOT" } } },
    { $project: { firstFour: { $slice: ["$items", 4] } } },
    { $limit: 4 },
  ]);

  res.status(200).json({
    result,
  });
};

module.exports = getRecipesMainPage;
