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
