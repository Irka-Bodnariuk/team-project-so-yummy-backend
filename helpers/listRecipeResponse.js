const listRecipeResponse = (response, userId) => {
  const recipes = response.map((recipe) => {
    const {
      _id,
      title,
      category,
      preview,
      time,
      popularity,
      likes,
      favorites,
      description,
      thumb,
    } = recipe;
    const favorite = favorites?.some((id) => String(id) === String(userId));
    const like = likes?.some((id) => String(id) === String(userId));
    return {
      _id,
      title,
      category,
      description,
      preview,
      thumb,
      time,
      popularity,
      like,
      favorite,
    };
  });
  return recipes;
};

module.exports = listRecipeResponse;
