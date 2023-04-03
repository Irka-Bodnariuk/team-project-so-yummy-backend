const getSkipLimitPage = ({ page, limit }) => {
  const sPage = page > 0 && page < 1000 ? +page : 1;
  const sLimit = +limit > 0 && +limit < 1000 ? +limit : 12;
  const skip = (sPage - 1) * sLimit;
  return { skip, limit: sLimit, page: sPage };
};
module.exports = getSkipLimitPage;
