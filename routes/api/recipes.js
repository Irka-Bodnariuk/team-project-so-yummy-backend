const express = require("express");

// const { authenticate } = require("../../middlewares");

const {
  ctrllRecipes: {
    getAllRecipes,
    getRecipesMainPage,
    getRecipeById,
    getRecipeByCategory,
    searchRecipeByTitle,
    searchRecipeByIngredient,
  },
} = require("../../controllers");

const router = express.Router();

router.get("/category-list", getAllRecipes);

router.get("/main-page", getRecipesMainPage);

router.get("/category/:category", getRecipeByCategory);

router.get("/:id", getRecipeById);

router.get("/search/title/:title", searchRecipeByTitle);

router.get("/search/ingredient/:ingredient", searchRecipeByIngredient);

module.exports = router;
