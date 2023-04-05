const addFavorite = require('./addFavorite');
const getFavorite = require('./getFavorite');
const removeFavorite = require('./removeFavorite')

const { ctrlWrapper } = require("../../helpers");


module.exports = {
    addFavorite: ctrlWrapper(addFavorite),
    getFavorite: ctrlWrapper(getFavorite),
    removeFavorite: ctrlWrapper(removeFavorite),
}