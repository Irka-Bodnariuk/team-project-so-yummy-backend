const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const updateSubscribe = async (req, res) => {
  const { _id: id } = req.user;

  const updateStatus = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateStatus) {
    throw HttpError(404, "Not found");
  }
  if (!updateStatus.subscribe) {
    const subscribeEmail = {
      to: updateStatus.email,
      subject: "Unsubscribed from 'So Yummy'",
      html: `<strong>${updateStatus.email} unsubscribed from "So Yummy"<strong>`,
    };
    await sendEmail(subscribeEmail);
    res.status(200).json({
      email: updateStatus.email,
      subscribe: updateStatus.subscribe,
    });
    return;
  }
  const subscribeEmail = {
    to: updateStatus.email,
    subject: "Subscribed to 'So Yummy'",
    html: `<strong>${updateStatus.email} subscribed to the newsletter "So Yummy"<strong>`,
  };
  await sendEmail(subscribeEmail);

  res.status(200).json({
    email: updateStatus.email,
    subscribe: updateStatus.subscribe,
  });
};

module.exports = updateSubscribe;
