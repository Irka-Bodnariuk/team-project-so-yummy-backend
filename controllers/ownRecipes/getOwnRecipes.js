const {
  getSkipLimitPage,
  processPagedRecipesResult,
} = require("../../helpers");
const { OwnRecipe } = require("../../models/ownRecipe");

const getOwnRecipes = async (req, res) => {
  const { page: sPage = 1, limit: sLimit = 12 } = req.query;

  const { skip, limit, page } = getSkipLimitPage({
    page: sPage,
    limit: sLimit,
  });
  const result = await OwnRecipe.aggregate([
    { $match: { owner: { $in: [req.user._id] } } },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              createdAt: 0,
              updatedAt: 0,
              ingredients: 0,
            },
          },
        ],
        count: [{ $count: "total" }],
      },
    },
  ]);
  const response = processPagedRecipesResult({
    result,
    userId: req.user._id,
  });

  res.json({ ...response, page, limit });
};

module.exports = getOwnRecipes;
