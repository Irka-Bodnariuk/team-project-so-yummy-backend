const express = require("express");

const { authenticate } = require("../../middlewares");

const {
  ctrllRecipes: { getAllRecipes, getRecipesMainPage },
} = require("../../controllers");

const router = express.Router();

router.get("/category-list", authenticate, getAllRecipes);

router.get("/main-page", getRecipesMainPage);

module.exports = router;
