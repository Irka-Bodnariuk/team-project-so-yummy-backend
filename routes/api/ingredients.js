const express = require("express");
const router = express.Router();

const {
  ctrllIngredienents: { getAllIngredients },
} = require("../../controllers");

router.get("/list", getAllIngredients);

module.exports = router;
