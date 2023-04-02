const { Recipe } = require("../../models/recipes");
const Ingredients = require("../../models/ingredients");

const searchRecipeByIngredient = async (req, res, next) => {
  const { ingredient: ttl } = req.params;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const ingredient = await Ingredients.find({ ttl });

  if (!ingredient || ingredient.length === 0) {
    res.status(404);
    throw new Error(`Ingredient ${ttl} not found`);
  }
  const [{ _id: id }] = ingredient;

  const recipe = await Recipe.find(
    { "ingredients.id": `${id}` },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  );

  if (!recipe || recipe === []) {
    res.status(404);
    throw new Error(`Recipe not found`);
  }

  res.status(200).json({
    code: 200,
    message: "success",
    data: recipe,
    quantity: recipe.length,
  });
};

module.exports = searchRecipeByIngredient;
