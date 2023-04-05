const { User } = require('../../models/user');
const { Recipe } = require('../../models/recipes');
const { HttpError } = require('../../helpers');

const removeFavorite = async (req, res) => {
    
    const { id } = req.params;
    const { _id } = req.user;

    const user = await User.findById({ _id });

    if (!user) {
        throw HttpError(404, "User not found");
    };
    if (user.favorites.indexOf(id) === -1) {
        throw HttpError(404, "Recipe not found");
    };

    const removeFavFromUser = await User.findByIdAndUpdate({ _id }, { $pull: { favorites: id } }, { new: true });

    const removeFavFromRecipe = await Recipe.findOneAndUpdate({ _id: id }, { $pull: { favorites: _id } }, { new: true });

    res.json({
        message: "Recipe is removed from favorite"
    });
}

module.exports = removeFavorite;