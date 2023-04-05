const { Recipe } = require("../../models/recipes");
const toggleFavoriteLikeState = require("../../helpers/toggleFavoriteLikeState");

const updateFavoriteById = async (req, res) => {
  const {
    _id,
    likeOrFavorite: favorite,
    popularity,
  } = await toggleFavoriteLikeState({
    type: "favorites",
    req,
    Model: Recipe,
  });

  // Check conditions for motivation send
  let motivation;
  if (req.user.motivations?.addRecipesToFavorite < 10) {
    // count and save total user favorites recipes
    const totalFavorites = await Recipe.find({
      favorites: { $in: [req.user._id] },
    }).count();
    req.user.motivations.addRecipesToFavorite = totalFavorites;
    await req.user.save();
    if (totalFavorites === 10) {
      motivation = "10";
    }
  }
  res.status(200).json({ _id, favorite, popularity, motivation });
};

module.exports = updateFavoriteById;
