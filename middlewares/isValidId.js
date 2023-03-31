const { isValidObjectId } = require('mongoose');

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next({ status: 404, message: 'Invalid id' });
  }
  next();
};

module.exports = isValidId;
