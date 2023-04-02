const { Recipe } = require("../../models/recipes");

const searchRecipeByTitle = async (req, res, next) => {
  const { title } = req.params;

  const result = await Recipe.find({ title });

  if (!result) {
    res.status(404);
    throw new Error(`Recipe with title - ${title} not found`);
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: result,
    quantity: result.length,
  });
};

module.exports = searchRecipeByTitle;
