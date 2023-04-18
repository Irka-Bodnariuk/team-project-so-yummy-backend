const limitPage = ({ page, limit }) => {
  const sp = page > 0 && page < 1000 ? +page : 1;
  const sl = +limit > 0 && +limit < 1000 ? +limit : 12;
  const skip = (sp - 1) * sl;
  return { skip, limit: sl, page: sp };
};
module.exports = limitPage;
