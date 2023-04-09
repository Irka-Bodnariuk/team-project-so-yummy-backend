const current = async (req, res) => {
  const { name, email, avatarURL  } = req.user;

  res.json({
    name,
    email,
    avatarURL,
  });
};

module.exports = current;
