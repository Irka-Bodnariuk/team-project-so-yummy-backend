const { Recipe } = require("../../models/recipes");
const categoryList = require("../../recipesCategory");

const getRecipeByCategory = async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  if (!categoryList.find((item) => item === category)) {
    res.status(404);
    throw new Error(`Category ${category} not found`);
  }

  const result = await Recipe.find(
    { category: `${category}` },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).sort({
    createdAt: -1,
  });

  if (!result) {
    res.status(404);
    throw new Error(`Category ${category} not found`);
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: result,
    quantity: result.length,
  });
};

module.exports = getRecipeByCategory;
