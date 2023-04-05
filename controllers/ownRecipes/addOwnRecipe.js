const { OwnRecipe } = require("../../models/ownRecipe");
const {
  HttpError,
  resizeImg,
  uploadImageToCloudinary,
} = require("../../helpers");

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
  // If first recipe is being adding to recipe list - send motivation 'first'
  // let motivation;
  // if (req.user.motivations.addFirstOwnRecipe) {
  //   req.user.motivations.addFirstOwnRecipe = true;
  //   await req.user.save();
  //   motivation = "first";
  // }
  if (req.file) {
    let newRecipe;
    const createRecipeAndSavePreviewUrl = async (result) => {
      const preview = result.secure_url;
      newRecipe = await OwnRecipe.create({
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
        req.user.ownRecipesNumber = req.user.ownRecipesNumber + 1;
        req.user.save();
        res.json({
          id: newRecipe._id,
          message: `Recipe ${newRecipe._id} has been created`,
          // motivation,
        });
      } else {
        throw HttpError(400, " An error occured");
      }
    };
    try {
      const preview = await resizeImg({
        body: req.file,
        width: 350,
        height: 350,
      });
      await uploadImageToCloudinary(
        preview,
        createRecipeAndSavePreviewUrl,
        req.user._id
      );
    } catch (error) {
      throw HttpError(400, " An error occured");
    }
  } else {
    const newRecipe = await OwnRecipe.create({
      title,
      category,
      instructions,
      time,
      favorite,
      ingredients,
      owner: req.user._id,
    });
    if (newRecipe) {
      req.user.ownRecipesNumber = req.user.ownRecipesNumber + 1;
      req.user.save();
      res.json({
        id: newRecipe._id,
        message: `Recipe ${newRecipe._id} has been created`,
        // motivation,
      });
    } else {
      throw HttpError(400, " An error occured");
    }
  }
};

module.exports = addOwnRecipe;

// {
//     "title": "Honey Teriyaki",
//     "category": "Seafood",
//     "instructions": "Mix all the ingredients in the Honey Teriyaki Glaze together. Whisk to…",
//     "time": "25",
//     "favorite": true,
//     "ingredients": [{
//          "id": "640c2dd963a319ea671e369b",
//          "measure": "1 tablespoon"
//     }],
//     "description": "A Japanese-inspired dish made with salmon fillets, teriyaki sauce, hon…"
// }
