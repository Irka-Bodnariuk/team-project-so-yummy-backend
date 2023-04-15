const { HttpError } = require("../../helpers");
const { OwnRecipe } = require("../../models/ownRecipe");
const Ingredients = require("../../models/ingredients");

const getOwnRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await OwnRecipe.findById(id, null, { lean: true }).populate({
    path: "ingredients.id",
    model: Ingredients,
  });
  console.log(result);
  if (!result) {
    throw HttpError(404, `Recipe with ${id} was not found`);
  }

  // result.ingredients.forEach((ingr) => {
  //   ingr.title = ingr.id.ttl;
  //   ingr.desc = ingr.id.desc;
  //   ingr._id = ingr.id._id;
  //   delete ingr.id;
  // });

  const {
    _id,
    title,
    category,
    description,
    instructions,
    time,
    ingredients,
    preview,
    favorite,
    owner,
  } = result;

  res.json({
    _id,
    title,
    category,
    description,
    instructions,
    ingredients,
    time,
    preview,
    owner,
    favorite,
  });
};

module.exports = getOwnRecipeById;
