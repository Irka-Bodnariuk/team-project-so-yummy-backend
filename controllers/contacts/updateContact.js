const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateByID = async (req, res) => {
  const { contactId } = req.params;

  const editContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!editContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(editContact);
};

module.exports = updateByID;
