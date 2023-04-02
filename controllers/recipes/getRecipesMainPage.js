const { Recipe } = require("../../models/recipes");

const getRecipesByCategory = async (req, res, next) => {
  const result = await Recipe.aggregate([
    { $group: { _id: "$category", items: { $push: "$$ROOT" } } },
    { $project: { firstFour: { $slice: ["$items", 4] } } },
    { $limit: 4 },
  ]);

  res.status(200).json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getRecipesByCategory;
