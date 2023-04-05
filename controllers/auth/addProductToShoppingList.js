const { User } = require("../../models/user");
const Ingredients = require("../../models/ingredients");

const { HttpError } = require("../../helpers");

const addProductToShoppingList = async (req, res) => {
  const { _id, shoppingList } = req.user;
  const product = req.body;

  const ingredients = await Ingredients.findById(product.productId);

  if (!ingredients) {
    throw HttpError(404, `No such ingredient`);
  }

  const productIndex = shoppingList.findIndex((item) => {
    return String(item.productId) === String(product.productId);
  });

  if (productIndex !== -1) {
    shoppingList[productIndex].measure.push(product.measure);

    const repeatMeasure = await User.findByIdAndUpdate(
      _id,
      {
        shoppingList: shoppingList,
      },
      {
        new: true,
      }
    );

    res.json({
      shoppingList: repeatMeasure.shoppingList,
    });
  } else {
    const { ttl, thb } = ingredients;

    const addIngredients = await User.findByIdAndUpdate(
      _id,
      { $push: { shoppingList: { ...product, ttl, thb } } },
      {
        new: true,
      }
    );

    res.json({
      shoppingList: addIngredients.shoppingList,
    });
  }
};

module.exports = addProductToShoppingList;

//                 {
//                     "productId": "640c2dd963a319ea671e372e",
//                     "measure": "2"
//                 },

//////////////////////////////////////////////////////////
// const { User } = require("../../models/user");
// const { HttpError } = require("../../helpers");
// const mongoose = require("mongoose");
// const Ingredients = require("../../models/ingredients");

// const addProductToShoppingList = async (req, res) => {
//   const { productId, measure } = req.body;
//   const user = req.user.toObject();
//   const ObjectId = mongoose.Types.ObjectId;
//   if (!ObjectId.isValid(productId)) {
//     throw HttpError(400, `Wrong ID`);
//   }
//   const ingr = await Ingredients.findById(productId);
//   if (!ingr) {
//     throw HttpError(404, `No such ingredient`);
//   }
//   let result = [];
//   const productIndex = user.shoppingList.findIndex((item) => {
//     return String(item.productId) === String(productId);
//   });
//   if (productIndex !== -1) {
//     user.shoppingList[productIndex].measure.push(measure);
//     result = await User.findByIdAndUpdate(
//       user._id,
//       { shoppingList: user.shoppingList },
//       { new: true }
//     )
//       .select("shoppingList")
//       .populate({
//         path: "shoppingList.productId",
//         ref: "ingredients",
//       });
//   } else {
//     result = await User.findByIdAndUpdate(
//       user._id,
//       {
//         $push: { shoppingList: { productId, measure } },
//       },
//       { new: true }
//     )
//       .select("shoppingList")
//       .populate({
//         path: "shoppingList.productId",
//         ref: "ingredients",
//       });
//   }
//   const { shoppingList } = result.toObject();
//   shoppingList.forEach((ingr) => {
//     ingr.title = ingr.productId.ttl;
//     ingr.thumb = ingr.productId.thb;
//     ingr.productId = ingr.productId._id;
//   });
//   res.json({ shoppingList });
// };
// module.exports = addProductToShoppingList;
