const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await Contact.findById(contactId);

  if (!oneContact) {
    throw HttpError(404, "Not found");
  }

  res.json(oneContact);
};

module.exports = getById;
