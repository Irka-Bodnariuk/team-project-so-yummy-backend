const listRecipeResponse = (response, userId) => {
  const recipes = response.map((recipe) => {
    const {
      _id,
      title,
      tags,
      category,
      area,
      preview,
      instructions,
      time,
      popularity,
      likes,
      favorites,
      description,
      thumb,
      ingredients,
      youtube,
    } = recipe;
    const favorite = favorites?.some((id) => String(id) === String(userId));
    const like = likes?.some((id) => String(id) === String(userId));
    return {
      _id,
      title,
      tags,
      category,
      area,
      description,
      instructions,
      preview,
      thumb,
      time,
      popularity,
      like,
      favorite,
      ingredients,
      youtube,
    };
  });
  return recipes;
};

module.exports = listRecipeResponse;
