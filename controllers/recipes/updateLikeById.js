const { Recipe } = require("../../models/recipes");
const { User } = require("../../models/user");
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
    ModelU: User,
  });
  res.status(201).json({ _id, like, popularity });
};

module.exports = updateLikeById;
