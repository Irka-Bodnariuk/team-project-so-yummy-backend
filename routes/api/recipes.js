const express = require("express");

const { authenticate } = require("../../middlewares");

const {
  ctrllRecipes: {
    getAll,
    getCategoryList,
    getMainPage,
    getRecipeById,
    getRecipeByCategory,
    searchRecipeByIngredient,
    searchRecipeByTitle,
  },
} = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/category-list", authenticate, getCategoryList);

router.get("/main-page", authenticate, getMainPage);

router.get("/category/:category", authenticate, getRecipeByCategory);

router.get("/id/:id", authenticate, getRecipeById);

router.get("/search/title/:query", authenticate, searchRecipeByTitle);

router.get("/search/ingredient/:query", authenticate, searchRecipeByIngredient);

module.exports = router;
