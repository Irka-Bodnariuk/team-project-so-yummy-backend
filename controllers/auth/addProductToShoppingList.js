const { User } = require("../../models/user");
const Ingredients = require("../../models/ingredients");

const { HttpError } = require("../../helpers");

const addShoppingList = async (req, res) => {
  const { _id, shoppingList } = req.user;
  const product = req.body;
  if (!_id) {
    throw HttpError(401, "Wrong ID");
  }
  if (!product.productId) {
    throw HttpError(404, `No such ingredient`);
  }

  const productIndex = shoppingList.findIndex((item) => {
    return String(item.productId) === String(product.productId);
  });

  if (productIndex !== -1) {
    console.log(productIndex); ///
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
    const { ttl, thb } = await Ingredients.findById(product.productId);

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

module.exports = addShoppingList;

// //  "ingredients": [
// //                 {
// //                     "id": "640c2dd963a319ea671e372e",
// //                     "measure": "2"
// //                 },
// //                 {
// //                     "id": "640c2dd963a319ea671e372c",
// //                     "measure": "1tbsp"
// //                 },
// //                 {
// //                     "id": "640c2dd963a319ea671e36e3",
// //                     "measure": "1 clove"
// //                 },
// //                 {
// //                     "id": "640c2dd963a319ea671e370f",
// //                     "measure": "500g"
// //                 },
// //                 {
// //                     "id": "640c2dd963a319ea671e3726",
// //                     "measure": "90g"
// //                 },
// //                 {
// //                     "id": "640c2dd963a319ea671e36c4",
// //                     "measure": "1tsp"
// //                 },
// //                 {
// //                     "id": "640c2dd963a319ea671e377f",
// //                     "measure": "400g can"
// //                 },
// //                 {
// //                     "id": "640c2dd963a319ea671e36ff",
// //                     "measure": "300ml"
// //                 },
// //                 {
// //                     "id": "640c2dd963a319ea671e377e",
// //                     "measure": "1tbsp"
// //                 },
// //                 {
// //                     "id": "640c2dd963a319ea671e3798",
// //                     "measure": "1tbsp"
// //                 },
// //                 {
// //                     "id": "640c2dd963a319ea671e376e",
// //                     "measure": "350g"
// //                 },
// //                 {
// //                     "id": "640c2dd963a319ea671e3735",
// //                     "measure": "Topping"
// //                 }
// //             ],
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
