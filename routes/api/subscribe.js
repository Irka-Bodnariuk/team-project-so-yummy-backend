const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const {
  schemas: { updateSubscribeSchema },
} = require("../../models/user");

const {
  ctrllUsers: { updateSubscribe },
} = require("../../controllers");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscribeSchema),
  updateSubscribe
);

module.exports = router;
