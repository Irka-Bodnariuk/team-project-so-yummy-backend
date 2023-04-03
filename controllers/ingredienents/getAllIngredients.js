const Ingredients = require("../../models/ingredients");



const getAllIngredients = async (req, res) => {

    const result = await Ingredients.find({});

    res.status(200).json(result);
};  

module.exports = getAllIngredients