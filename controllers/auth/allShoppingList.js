const { HttpError } = require("../../helpers");

const allShoppingList = async (req, res) => {
  const { shoppingList } = req.user;
  if (!shoppingList) {
    throw HttpError(404, `No shopping list`);
  }

  res.json({
    shoppingList,
  });
};

module.exports = allShoppingList;
