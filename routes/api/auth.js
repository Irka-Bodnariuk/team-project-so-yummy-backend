const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");

const {
  schemas: { registerSchema, loginSchema, emailSchema, updateSubscribeSchema },
} = require("../../models/user");

const {
  ctrllUsers: {
    register,
    login,
    current,
    logout,
    updateProfile,
    verifyEmail,
    resendVerifyEmail,
    updateSubscribe,
  },
} = require("../../controllers");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", validateBody(emailSchema), resendVerifyEmail);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, current);

router.post("/logout", authenticate, logout);

router.patch("/profile", authenticate, upload.single("avatar"), updateProfile);

router.patch(
  "/subscribe",
  authenticate,
  validateBody(updateSubscribeSchema),
  updateSubscribe
);

module.exports = router;
