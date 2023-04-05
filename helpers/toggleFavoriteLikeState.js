const HttpError = require("./HttpError");

const toggleFavoriteLikeState = async ({ type, req, Model }) => {
  const { id: recipeId } = req.params;
  const { _id: userId } = req.user;
  let likeOrFavorite;
  const recipe = await Model.findById({ _id: recipeId });
  if (!recipe) {
    throw HttpError(404, `Not found recipe with id ${recipeId}`);
  }
  const index = recipe[type].indexOf(userId);
  if (index === -1) {
    recipe[type].push(userId);
    likeOrFavorite = true;
  } else {
    recipe[type].splice(index, 1);
    likeOrFavorite = false;
  }
  const result = await recipe.save();
  return { _id: result._id, likeOrFavorite, popularity: result.popularity };
};

module.exports = toggleFavoriteLikeState;
