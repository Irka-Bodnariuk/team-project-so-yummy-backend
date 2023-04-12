const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, `User not found`);
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target='_blank' href='https://irka-bodnariuk.github.io/team-project-so-yummy-frontend/signin/${verificationToken}'>Click verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
