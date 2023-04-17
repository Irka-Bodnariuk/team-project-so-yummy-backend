const facetObject = ({ sortOpts, skip, limit }) => {
  return {
    $facet: {
      data: [
        { $sort: sortOpts },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
          },
        },
      ],
      count: [{ $count: "total" }],
    },
  };
};

module.exports = facetObject;
