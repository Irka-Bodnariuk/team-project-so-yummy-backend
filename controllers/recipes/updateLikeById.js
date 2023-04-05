const { Recipe } = require("../../models/recipes");
const toggleFavoriteLikeState = require("../../helpers/toggleFavoriteLikeState");

const updateLikeById = async (req, res) => {
  const {
    _id,
    likeOrFavorite: like,
    popularity,
  } = await toggleFavoriteLikeState({
    type: "likes",
    req,
    Model: Recipe,
  });
  res.status(201).json({ _id, like, popularity });
};

module.exports = updateLikeById;
