const { Recipe } = require("../../models/recipes");
const {
  limitPage,
  sortType,
  pagedResult,
  facetObject,
} = require("../../helpers");

const getAll = async (req, res) => {
  const { page: pg = 1, limit: sl = 20, sort: ss } = req.query;

  const { skip, limit, page } = limitPage({
    page: pg,
    limit: sl,
  });

  const { sortOpts, sort } = sortType(ss);

  const result = await Recipe.aggregate([
    {
      ...facetObject({ sortOpts, skip, limit }),
    },
  ]);

  const response = pagedResult({
    result,
    userId: req.user._id,
  });

  res.json({ ...response, page, limit, sort });
};

module.exports = getAll;
