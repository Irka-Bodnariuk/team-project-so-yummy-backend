const getAll = require("./allContacts");
const getById = require("./contactById");
const add = require("./addContact");
const deleteByID = require("./deleteContact");
const updateByID = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteByID: ctrlWrapper(deleteByID),
  updateByID: ctrlWrapper(updateByID),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
