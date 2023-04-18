const { Recipe } = require("../../models/recipes");
const Ingredients = require("../../models/ingredients");
const { HttpError } = require("../../helpers");

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Recipe.findById(id, null, { lean: true }).populate({
    path: "ingredients.id",
    model: Ingredients,
  });

  if (!result || result === []) {
    throw HttpError(404, `Recipe with ${id} was not found`);
  }
  result.ingredients.forEach((ingr) => {
    ingr.title = ingr.id.ttl;
    ingr.desc = ingr.id.desc;
    ingr.thumb = ingr.id.thb;
    ingr._id = ingr.id._id;
    delete ingr.id;
  });
  res.json({
    ...result,
  });
};

module.exports = getRecipeById;
