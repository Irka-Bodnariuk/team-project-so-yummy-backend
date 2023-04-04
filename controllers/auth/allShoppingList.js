const { User } = require("../../models/user");

const allShoppingList = async (req, res) => {
  const { ingredients } = req.user;

  res.json({
    ingredients,
  });
};

module.exports = allShoppingList;

// "ingredients": [{
//          "id": "640c2dd963a319ea671e369b",
//          "measure": "1 tablespoon"
//     }],
