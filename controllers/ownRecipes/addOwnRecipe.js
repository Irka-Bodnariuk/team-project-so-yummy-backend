const { OwnRecipe } = require("../../models/ownRecipe");
const { User } = require("../../models/user");
const {
  HttpError,
  resizeImg,
  uploadImageToCloudinary,
} = require("../../helpers");

const addOwnRecipe = async (req, res) => {
  const ownRecipesNumber = await OwnRecipe.countDocuments({
    owner: { $in: [req.user._id] },
  });
  if (ownRecipesNumber >= 20) {
    throw HttpError(
      403,
      "You have reached the maximum number of your recipes 20"
    );
  }

  const {
    title,
    category,
    instructions,
    time,
    favorite,
    ingredients,
    description,
  } = req.body;

  let motivation;
  if (!req.user.motivations?.addFirstOwnRecipe) {
    await User.findByIdAndUpdate(req.user._id, {
      motivations: { addFirstOwnRecipe: true },
    });
    motivation = "first";
  }

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
        if (!req.user.ownRecipesNumber) {
          await User.findByIdAndUpdate(req.user._id, {
            ownRecipesNumber: 1,
          });
        }
        req.user.ownRecipesNumber = req.user.ownRecipesNumber + 1;
        req.user.save();
        res.status(201).json({
          id: newRecipe._id,
          message: `Recipe ${newRecipe.title} has been created`,
          preview,
          motivation,
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
      description,
      owner: req.user._id,
    });
    if (newRecipe) {
      if (!req.user.ownRecipesNumber) {
        await User.findByIdAndUpdate(req.user._id, {
          ownRecipesNumber: 1,
        });
      }
      req.user.ownRecipesNumber = req.user.ownRecipesNumber + 1;
      req.user.save();
      res.status(201).json({
        id: newRecipe._id,
        message: `Recipe ${newRecipe.title} has been created`,
        motivation,
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
//     "description": "A Japanese-inspired dish made with salmon fillets, teriyaki sauce, hon…"
//     "instructions": "Mix all the ingredients in the Honey Teriyaki Glaze together. Whisk to…",
//     "time": "25",
//     "ingredients": [{
//          "measure": "1 tablespoon"
//     }],

// }
