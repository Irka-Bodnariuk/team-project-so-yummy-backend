const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const {
  schemas: { registerSchema, loginSchema },
} = require("../../models/user");

const {
  ctrllUsers: { register, login, current, logout },
} = require("../../controllers");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, current);

router.post("/logout", authenticate, logout);

module.exports = router;
