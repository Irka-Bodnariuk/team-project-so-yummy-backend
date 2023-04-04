const authRouter = require("./auth");
const recipesRouter = require("./recipes");
const ingredientsRouter = require("./ingredients");
const ownRecipesRouter = require("./ownRecipesRouter");

module.exports = {
  authRouter,
  recipesRouter,
  ingredientsRouter,
  ownRecipesRouter,
};
