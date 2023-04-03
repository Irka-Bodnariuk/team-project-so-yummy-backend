const getAllIngredients = require('./getAllIngredients');

const { ctrlWrapper } = require("../../helpers");


module.exports = {
    getAllIngredients:ctrlWrapper(getAllIngredients),
}