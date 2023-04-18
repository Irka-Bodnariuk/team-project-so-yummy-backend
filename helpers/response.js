const response = (response, userId) => {
  const recipes = response.map((recipe) => {
    const {
      _id,
      title,
      category,
      preview,
      instructions,
      time,
      favorites,
      description,
      likes,
    } = recipe;

    return {
      _id,
      title,
      category,
      description,
      instructions,
      preview,
      time,
      like,
      favorite,
    };
  });
  return recipes;
};

module.exports = response;
