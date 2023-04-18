const { Recipe } = require("../../models/recipes");
const categoryList = require("../../recipesCategory");
const {
  HttpError,
  limitPage,
  sortType,
  facetObject,
  pagedResult,
} = require("../../helpers");

const getRecipeByCategory = async (req, res, next) => {
  const { category } = req.params;
  if (!categoryList.includes(category.toLowerCase())) {
    throw HttpError(400, `Category ${category} not found`);
  }
  const userId = req.user._id;

  const { page: sp = 1, limit: sl = 8, sort: ss } = req.query;
  const { skip, limit, page } = limitPage({
    page: sp,
    limit: sl,
  });

  const { sortOpts, sort } = sortType(ss);

  const regex = new RegExp(category.trim().toLowerCase(), "i");

  const result = await Recipe.aggregate([
    { $match: { category: { $regex: regex } } },
    {
      ...facetObject({ sortOpts, skip, limit }),
    },
  ]);

  const response = pagedResult({
    result,
    userId,
  });

  res.json({ ...response, page, limit, sort });
};

module.exports = getRecipeByCategory;
