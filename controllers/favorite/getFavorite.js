const { HttpError } = require('../../helpers');
const { Recipe } = require('../../models/recipes');
const { User } = require('../../models/user');


const getFavorite = async (req, res) => {
    
    const { _id } = req.user;

    const user = await User.findOne({ _id });

    if (!user) {
        throw HttpError(404, 'User not found');
    };

    const favoriteRecipes = await Recipe.find({
        _id: { $in: user.favorites }
    });

    if (!favoriteRecipes) {
        throw HttpError(404, 'Recipes not found')
    }

    res.json(favoriteRecipes);

};

module.exports = getFavorite;