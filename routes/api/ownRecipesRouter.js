const express = require("express");

const {
  ctrllOwnRecipes: {
    getOwnRecipes,
    addOwnRecipe,
    getOwnRecipeById,
    deleteOwnById,
  },
} = require("../../controllers");

const {
  authenticate,
  validateBody,
  isValidId,
  uploadRecipes,
} = require("../../middlewares");

const { schemas } = require("../../models/ownRecipe");

const router = express.Router();

router.get("/", authenticate, getOwnRecipes);

router.post(
  "/",
  authenticate,
  uploadRecipes.single("preview"),
  validateBody(schemas.addSchema),
  addOwnRecipe
);

router.get("/id/:id", authenticate, isValidId, getOwnRecipeById);

router.delete("/id/:id", authenticate, isValidId, deleteOwnById);

module.exports = router;
