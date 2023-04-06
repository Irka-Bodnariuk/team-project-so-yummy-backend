const getPopularRecipes = require('./getPopularRecipes');

const { ctrlWrapper } = require("../../helpers");


module.exports = {
    getPopularRecipes: ctrlWrapper(getPopularRecipes),
}