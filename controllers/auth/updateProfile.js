const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const updateProfile = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;

  if (!req.file && name) {
    await User.findByIdAndUpdate(_id, { name });
    res.json({
      name,
    });
    return;
  }
  if (!req.file && !name) {
    throw HttpError(400, "Missing required field");
  }

  const avatarURL = req.file.path;

  await User.findByIdAndUpdate(_id, { avatarURL, name });
  res.json({
    avatarURL,
    name,
  });
};

module.exports = updateProfile;
