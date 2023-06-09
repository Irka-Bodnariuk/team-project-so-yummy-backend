const authRouter = require("./auth");
const recipesRouter = require("./recipes");
const ingredientsRouter = require("./ingredients");
const favoriteRouter = require("./favorite");
const ownRecipesRouter = require("./ownRecipesRouter");
const subscribeRouter = require("./subscribe");
const shoppingListRouter = require("./shoppingList");
const popularRouter = require('./popular');

module.exports = {
  authRouter,
  recipesRouter,
  ingredientsRouter,
  favoriteRouter,
  ownRecipesRouter,
  subscribeRouter,
  shoppingListRouter,
  popularRouter
};
