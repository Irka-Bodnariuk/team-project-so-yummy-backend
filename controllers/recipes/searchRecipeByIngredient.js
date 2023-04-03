const { Recipe } = require("../../models/recipes");

const {
  getSkipLimitPage,
  getRegexForSearchByKeywords,
  getFacetObject,
  getSortTypeByTitleOrPopularity,
  processPagedRecipesResult,
  HttpError,
} = require("../../helpers");

const searchRecipeByIngredient = async (req, res, next) => {
  const { query } = req.params;
  const regex = getRegexForSearchByKeywords(query);

  if (!query) {
    throw HttpError(400);
  }

  // const userId = req.user._id;

  const { page: sPage = 1, limit: sLimit = 12, sort: sSort } = req.query;

  const { skip, limit, page } = getSkipLimitPage({
    page: sPage,
    limit: sLimit,
  });

  const { sortOpts, sort } = getSortTypeByTitleOrPopularity(sSort);

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
      ...getFacetObject({ sortOpts, skip, limit }),
    },
  ]);

  const [{ data }] = result;
  if (data.length === 0) {
    throw HttpError(404, `Ingredieny with name ${query} not found`);
  }

  const response = processPagedRecipesResult({
    result,
    // userId
  });

  res.json({ ...response, page, limit, sort });
};
module.exports = searchRecipeByIngredient;
