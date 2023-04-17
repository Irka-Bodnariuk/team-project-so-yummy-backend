const { OwnRecipe } = require("../../models/ownRecipe");
const { HttpError, toCloudinary } = require("../../helpers");

const addOwnRecipe = async (req, res) => {
  const {
    title,
    category,
    instructions,
    time,
    favorite,
    ingredients,
    description,
  } = req.body;

  if (req.file) {
    const recipePreview = async (result) => {
      const preview = result.secure_url;

      const newRecipe = await OwnRecipe.create({
        title,
        category,
        instructions,
        description,
        time,
        favorite,
        ingredients,
        preview,
        owner: req.user._id,
      });
      if (newRecipe) {
        res.status(201).json({
          id: newRecipe._id,
          message: `Recipe ${newRecipe.title} has been created`,
          preview,
        });
      } else {
        throw HttpError(400, " An error occured");
      }
    };
    try {
      const preview = req.file.path;
      await toCloudinary(preview, recipePreview, req.user._id);
    } catch (error) {
      throw HttpError(400, "Thomesing wrong");
    }
  } else {
    const newRecipe = await OwnRecipe.create({
      title,
      category,
      instructions,
      time,
      favorite,
      ingredients,
      description,
      owner: req.user._id,
    });
    if (newRecipe) {
      res.status(201).json({
        id: newRecipe._id,
        message: `Recipe ${newRecipe.title} has been created`,
      });
    } else {
      throw HttpError(400, " Thomesing wrong");
    }
  }
};

module.exports = addOwnRecipe;
