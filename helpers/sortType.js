const sortType = (ss) => {
  let sort = "popular";
  let sortOpts = {};
  if (ss === "title") {
    sort = "title";
    sortOpts = { title: 1 };
  } else {
    sortOpts = { popularity: -1, title: 1 };
  }
  return { sortOpts, sort };
};

module.exports = sortType;
