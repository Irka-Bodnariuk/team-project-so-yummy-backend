const express = require("express");

const { authenticate } = require("../../middlewares");

const {
  ctrllRecipes: {
    getAllRecipes,
    getRecipesMainPage,
    getRecipeById,
    getRecipeByCategory,
  },
} = require("../../controllers");

const router = express.Router();

router.get("/category-list", authenticate, getAllRecipes);

router.get("/main-page", getRecipesMainPage);

router.get("/category/:category", getRecipeByCategory);

router.get("/:id", getRecipeById);

module.exports = router;
