const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const deleteProductFromShoppingList = async (req, res) => {
  const { productId } = req.params;
  const { _id, shoppingList } = req.user;

  const productIndex = shoppingList.findIndex((item) => {
    return String(item.productId) === String(productId);
  });

  if (productIndex === -1) {
    throw HttpError(404, `No such ingredient`);
  } else {
    shoppingList.splice(productIndex, 1);

    const deleteIngredients = await User.findByIdAndUpdate(
      _id,
      { shoppingList: shoppingList },
      {
        new: true,
      }
    );

    console.log(deleteIngredients);

    res.json({
      shoppingList,
    });
  }
};

module.exports = deleteProductFromShoppingList;
