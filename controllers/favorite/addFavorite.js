const { User } = require('../../models/user');
const { Recipe } = require('../../models/recipes');

const { HttpError } = require('../../helpers');

const addFavorite = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;

    const user = await User.findById({ _id });

    if (!user) {
        throw HttpError(404, 'User not found');
    }

    if (user.favorites.includes(id)) {
        throw HttpError(409, 'Recipe is already added to user');
    }

    const addFavUser = await User.findByIdAndUpdate(
        { _id },
        { $push: { favorites: id } },
        { new: true }
    );

    const addFavRecipe = await Recipe.findOneAndUpdate(
        { _id: id },
        { $push: { favorites: _id } },
        { new: true }
    );

    res.json({
        message: 'Recipe is added',
    });
};

module.exports = addFavorite;
