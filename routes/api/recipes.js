const express = require("express");

const { authenticate } = require("../../middlewares");

const {
  ctrllRecipes: {
    getAll,
    getAllRecipes,
    getRecipesMainPage,
    getRecipeById,
    getRecipeByCategory,
    searchRecipeByIngredient,
    searchRecipeByTitle,
  },
} = require("../../controllers");

const router = express.Router();

router.get("/", getAll);

router.get("/category-list", authenticate, getAllRecipes);

router.get("/main-page", getRecipesMainPage);

router.get("/category/:category", getRecipeByCategory);

router.get("/id/:id", getRecipeById);

router.get("/search/title/:query", searchRecipeByTitle);

router.get("/search/ingredient/:query", searchRecipeByIngredient);

module.exports = router;
