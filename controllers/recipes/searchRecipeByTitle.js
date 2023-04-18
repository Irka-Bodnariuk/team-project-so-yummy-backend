const { Recipe } = require("../../models/recipes");

const {
  limitPage,
  regexByKeywords,
  sortType,
  facetObject,
  pagedResult,
  HttpError,
} = require("../../helpers");

const searchRecipeByTitle = async (req, res) => {
  const { query } = req.params;
  if (!query) {
    throw HttpError(400);
  }
  const regex = regexByKeywords(query);

  const userId = req.user._id;

  const { page: sp = 1, limit: sl = 12, sort: ss } = req.query;

  const { skip, limit, page } = limitPage({
    page: sp,
    limit: sl,
  });

  const { sortOpts, sort } = sortType(ss);

  const result = await Recipe.aggregate([
    { $match: { title: { $regex: regex } } },
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

module.exports = searchRecipeByTitle;
