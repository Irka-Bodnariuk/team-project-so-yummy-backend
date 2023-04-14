const HttpError = require("./HttpError");
const { User } = require("../models/user");

const toggleFavoriteLikeState = async ({ type, req, Model }) => {
  const { id: recipeId } = req.params;
  const { _id: userId } = req.user;

  const user = await User.findById({ userId });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  let likeOrFavorite;
  const recipe = await Model.findById({ _id: recipeId });
  if (!recipe) {
    throw HttpError(404, `Not found recipe with id ${recipeId}`);
  }

  const indexUser = user.favorites.indexOf(recipeId);
  if (type === "favorites" && indexUser === -1) {
    user.favorites.push(recipeId);
    await user.save();
  }

  if (type === "favorites" && indexUser !== -1) {
    user.favorites.splice(indexUser, 1);
    await user.save();
  }

  const index = recipe[type].indexOf(userId);

  if (index === -1) {
    recipe[type].push(userId);
    likeOrFavorite = true;
  }
  if (index !== -1) {
    recipe[type].splice(index, 1);
    likeOrFavorite = false;
  }
  const result = await recipe.save();
  return { _id: result._id, likeOrFavorite, popularity: result.popularity };
};

module.exports = toggleFavoriteLikeState;
