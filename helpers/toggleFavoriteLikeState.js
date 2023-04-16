const HttpError = require("./HttpError");

const toggleFavoriteLikeState = async ({ type, req, Model, ModelU }) => {
  const { id: recipeId } = req.params;
  const { _id: userId } = req.user;

  const user = await ModelU.findById({ _id: userId });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  let likeOrFavorite;
  const recipe = await Model.findById({ _id: recipeId });
  if (!recipe) {
    throw HttpError(404, `Not found recipe with id ${recipeId}`);
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

  if (type === "favorites") {
    const indexUser = user.favorites.indexOf(recipeId);

    if (indexUser === -1) {
      user.favorites.push(recipeId);
    }
    if (indexUser !== -1) {
      user.favorites.splice(indexUser, 1);
    }
  }

  const result = await recipe.save();
  const resultUser = await user.save();

  return {
    _id: result._id,
    likeOrFavorite,
    popularity: result.popularity,
    favorites: resultUser.favorites,
  };
};

module.exports = toggleFavoriteLikeState;
