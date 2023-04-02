const express = require("express");
const router = express.Router();


const ctrl = require('../../controllers/ingredienents')


router.get("/list", ctrl.getAllIngredients);



module.exports = router;

