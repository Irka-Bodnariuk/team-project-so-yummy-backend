const { limitPage, pagedResult } = require("../../helpers");
const { OwnRecipe } = require("../../models/ownRecipe");

const getOwnRecipes = async (req, res) => {
  const { page: sp = 1, limit: sl = 12 } = req.query;

  const { skip, limit, page } = limitPage({
    page: sp,
    limit: sl,
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
  const response = pagedResult({
    result,
    userId: req.user._id,
  });

  res.json({ ...response, page, limit });
};

module.exports = getOwnRecipes;
