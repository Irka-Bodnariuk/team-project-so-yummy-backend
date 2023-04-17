const { OwnRecipe } = require("../../models/ownRecipe");
const { HttpError } = require("../../helpers");

const deleteOwnById = async (req, res) => {
  const { id } = req.params;

  const recipe = await OwnRecipe.findById(id);
  if (!recipe) {
    throw HttpError(404, `Recipe with ID ${id} was not found`);
  }
  if (String(recipe.owner) !== String(req.user._id)) {
    throw HttpError(403);
  }

  await OwnRecipe.findByIdAndDelete(id);
  req.user.save();
  res.json({ message: `Recipe ${id} has been successfully deleted` });
};

module.exports = deleteOwnById;
