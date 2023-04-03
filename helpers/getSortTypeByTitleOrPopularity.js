const getSortTypeByTitleOrPopularity = (sSort) => {
  let sort = "popular";
  let sortOpts = {};
  if (sSort === "title") {
    sort = "title";
    sortOpts = { title: 1 };
  } else {
    sortOpts = { popularity: -1, title: 1 };
  }
  return { sortOpts, sort };
};

module.exports = getSortTypeByTitleOrPopularity;
