const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  if (_id === "") {
    throw HttpError(401, "Email or password is wrong");
  }

  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

module.exports = logout;
