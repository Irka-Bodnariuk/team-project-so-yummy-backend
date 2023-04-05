const express = require("express");

const { validateBody, authenticate, isValidId } = require("../../middlewares");

const {
  schemas: { addShoppingListSchema },
} = require("../../models/user");

const {
  ctrllUsers: {
    allShoppingList,
    addProductToShoppingList,
    deleteProductFromShoppingList,
  },
} = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, allShoppingList);

router.patch(
  "/",
  authenticate,
  validateBody(addShoppingListSchema),
  addProductToShoppingList
);

router.patch(
  "/:productId",
  authenticate,
  // isValidId,
  deleteProductFromShoppingList
);

module.exports = router;
