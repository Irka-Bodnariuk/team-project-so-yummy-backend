const { User } = require("../../models/user");
const Ingredients = require("../../models/ingredients");

const { HttpError } = require("../../helpers");

const deleteProductFromShoppingList = async (req, res) => {
  const { productId } = req.params;
  const { _id, shoppingList } = req.user;
  //   console.log(productId);
  const productIndex = shoppingList.findIndex((item) => {
    return String(item.productId) === String(productId);
  });
  // console.log(productIndex);
  if (!productIndex !== -1) {
    // console.log(productIndex);
    shoppingList.splice(productIndex);
    // console.log(shoppingList);
    const deleteIngredients = await User.findByIdAndUpdate(
      _id,
      { shoppingList: { shoppingList } },
      {
        new: true,
      }
    );

    console.log(deleteIngredients);

    res.json({
      shoppingList: deleteIngredients.shoppingList,
    });
  }

  //   const removeShoppingList = await User.findOne(_id, {
  //     shoppingList: productId,
  //   });
  //   console.log(removeShoppingList);

  //   if (!removeContact) {
  //     throw HttpError(404, "Not found");
  //   }
  //   res.json({ message: "contact deleted" });
};

module.exports = deleteProductFromShoppingList;

//                 {
//                     "id": "640c2dd963a319ea671e372e",
//                     "measure": "2"
//                 },
