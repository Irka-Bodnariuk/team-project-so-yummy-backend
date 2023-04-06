const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipes");


const getPopularRecipes = async (req, res) => {

    const result = await Recipe.aggregate([
        {
            $project: {
                count: { $size: "$favorites" },
                preview: 1,
                title: 1,
                description: 1,
            }
        },
        {
            $sort: {
                count: -1,
            }
        },
        {
            $limit: 4
        }
    ]);

    if (!result) {
        throw HttpError(404, "Not found")
    }; 

    res.json(result)
}

module.exports = getPopularRecipes;