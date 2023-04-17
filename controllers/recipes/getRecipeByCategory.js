const { Recipe } = require("../../models/recipes");
const categoryList = require("../../recipesCategory");
const {
  HttpError,
  getSkipLimitPage,
  getSortTypeByTitleOrPopularity,
  getFacetObject,
  processPagedRecipesResult,
} = require("../../helpers");

const getRecipeByCategory = async (req, res, next) => {
  const { category } = req.params;
  if (!categoryList.includes(category.toLowerCase())) {
    throw HttpError(400, `Category ${category} not found`);
  }
  const userId = req.user._id;

  const { page: sPage = 1, limit: sLimit = 8, sort: sSort } = req.query;
  const { skip, limit, page } = getSkipLimitPage({
    page: sPage,
    limit: sLimit,
  });

  const { sortOpts, sort } = getSortTypeByTitleOrPopularity(sSort);

  const regex = new RegExp(category.trim().toLowerCase(), "i");

  const result = await Recipe.aggregate([
    { $match: { category: { $regex: regex } } },
    {
      ...getFacetObject({ sortOpts, skip, limit }),
    },
  ]);

  const response = processPagedRecipesResult({
    result,
    userId,
  });

  res.json({ ...response, page, limit, sort });
};

module.exports = getRecipeByCategory;
