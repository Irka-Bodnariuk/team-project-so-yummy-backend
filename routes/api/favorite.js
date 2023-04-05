const express = require("express");


const { authenticate } = require("../../middlewares");
const {
  ctrllFavorite: {
    addFavorite,
    getFavorite,
    removeFavorite,
  },
} = require("../../controllers");


const router = express.Router();



router.post('/:id', authenticate, addFavorite);
router.get('/', authenticate, getFavorite);
router.delete('/:id', authenticate, removeFavorite)

module.exports = router;