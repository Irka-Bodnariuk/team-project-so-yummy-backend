const authRouter = require("./auth");
const recipesRouter = require("./recipes");
const ingredientsRouter = require("./ingredients");
const favoriteRouter = require('./favorite')

module.exports = { authRouter, recipesRouter, ingredientsRouter, favoriteRouter };
