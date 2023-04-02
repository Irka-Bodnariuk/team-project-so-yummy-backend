const { Recipe } = require("../../models/recipes");

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  const result = await Recipe.findById(id);

  if (!result) {
    res.status(404);
    throw new Error(`Recipe with id=${id} not found`);
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: result,
    quantity: result.length,
  });
};

module.exports = getRecipeById;
