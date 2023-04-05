const express = require('express');


const { authenticate, isValidId } = require("../../middlewares");

const {
  ctrllRecipes: {
    getAll,
    getCategoryList,
    getRecipesMainPage,
    getRecipeById,
    getRecipeByCategory,
    searchRecipeByIngredient,
    searchRecipeByTitle,
    updateFavoriteById,
    updateLikeById,
  },
} = require("../../controllers");

const router = express.Router();

router.get('/', authenticate, getAll);

router.get('/category-list', authenticate, getCategoryList);

router.get('/main-page', authenticate, getRecipesMainPage);

router.get('/category/:category', authenticate, getRecipeByCategory);

router.get('/id/:id', authenticate, getRecipeById);

router.get('/search/title/:query', authenticate, searchRecipeByTitle);

router.get('/search/ingredient/:query', authenticate, searchRecipeByIngredient);

router.patch("/favorite/:id", authenticate, isValidId, updateFavoriteById);

router.patch("/like/:id", authenticate, isValidId, updateLikeById);

module.exports = router;
