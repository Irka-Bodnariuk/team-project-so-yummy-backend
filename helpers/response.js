const listRecipeResponse = (response, userId) => {
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
    const favorite = favorites?.some((id) => String(id) === String(userId));
    const like = likes?.some((id) => String(id) === String(userId));
    return {
      _id,
      title,
      // tags,
      category,
      // area,
      description,
      instructions,
      preview,
      time,
      // popularity,
      like,
      favorite,
      // ingredients,
      // youtube,
    };
  });
  return recipes;
};

module.exports = listRecipeResponse;
