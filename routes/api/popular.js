const express = require('express');
const router = express.Router();

const {
    ctrllPopularRecipes: {
        getPopularRecipes,
    },
} = require("../../controllers");


router.get('/', getPopularRecipes);

module.exports = router;