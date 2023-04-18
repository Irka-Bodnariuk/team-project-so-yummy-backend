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
      likes,
      favorites,
    };
  });
  return recipes;
};

module.exports = response;
