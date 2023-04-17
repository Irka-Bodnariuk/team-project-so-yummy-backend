const pagedResult = ({ result, userId }) => {
  const total = result[0]?.count[0]?.total || 0;

  return { ...result, total };
};

module.exports = pagedResult;
