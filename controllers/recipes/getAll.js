const { Recipe } = require("../../models/recipes");
const {
  getSkipLimitPage,
  getSortTypeByTitleOrPopularity,
  processPagedRecipesResult,
  getFacetObject,
} = require("../../helpers");

const getAll = async (req, res) => {
  const { page: sPage = 1, limit: sLimit = 20, sort: sSort } = req.query;

  const { skip, limit, page } = getSkipLimitPage({
    page: sPage,
    limit: sLimit,
  });

  const { sortOpts, sort } = getSortTypeByTitleOrPopularity(sSort);

  const result = await Recipe.aggregate([
    {
      ...getFacetObject({ sortOpts, skip, limit }),
    },
  ]);

  const response = processPagedRecipesResult({
    result,
    userId: req.user._id,
  });

  res.json({ ...response, page, limit, sort });
};

module.exports = getAll;
