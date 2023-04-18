const { Recipe } = require("../../models/recipes");
const {
  limitPage,
  regexByKeywords,
  facetObject,
  sortType,
  pagedResult,
  HttpError,
} = require("../../helpers");

const searchRecipeByIngredient = async (req, res, next) => {
  const { query } = req.params;
  const regex = regexByKeywords(query);

  if (!query) {
    throw HttpError(400);
  }

  const userId = req.user._id;

  const { page: sp = 1, limit: sl = 12, sort: ss } = req.query;

  const { skip, limit, page } = limitPage({
    page: sp,
    limit: sl,
  });

  const { sortOpts, sort } = sortType(ss);

  const result = await Recipe.aggregate([
    {
      $lookup: {
        from: "ingredients",
        localField: "ingredients.id",
        foreignField: "_id",
        as: "ingredients",
      },
    },
    {
      $match: {
        "ingredients.ttl": { $regex: regex },
      },
    },
    {
      ...facetObject({ sortOpts, skip, limit }),
    },
  ]);

  const [{ data }] = result;
  if (data.length === 0) {
    throw HttpError(404, `Ingredieny with name ${query} not found`);
  }

  const response = pagedResult({
    result,
    userId,
  });

  res.json({ ...response, page, limit, sort });
};

module.exports = searchRecipeByIngredient;
