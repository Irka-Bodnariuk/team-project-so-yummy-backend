const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const deleteByID = async (req, res) => {
  const { contactId } = req.params;
  const removeContact = await Contact.findByIdAndRemove(contactId);
  if (!removeContact) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = deleteByID;
