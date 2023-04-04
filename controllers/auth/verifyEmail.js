const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);

  const user = await User.findOne({ verificationToken });
  console.log(user);
  if (!user) {
    throw HttpError(404, `User not found`);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
