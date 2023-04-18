const { HttpError } = require("../../helpers");
const { OwnRecipe } = require("../../models/ownRecipe");
const Ingredients = require("../../models/ingredients");

const getOwnRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await OwnRecipe.findById(id, null, { lean: true }).populate({
    path: "ingredients.id",
    model: Ingredients,
  });
  if (!result) {
    throw HttpError(404, `Recipe with ${id} was not found`);
  }

  const { ingredients } = result;

  const ingredientsParse = JSON.parse(ingredients);

  res.json({
    ...result,
    ingredientsParse,
  });
};

module.exports = getOwnRecipeById;
