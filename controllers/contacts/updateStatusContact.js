const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const updateStatus = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!updateStatus) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updateStatus);
};

module.exports = updateStatusContact;
