const HttpError = require("./HttpError");
const Joi = require("joi");

const regexByKeywords = (query) => {
  const querySchema = Joi.string()
    .pattern(/^[a-z A-Z\-&,]+$/)
    .required()
  const { error } = querySchema.validate(query);
  if (error) {
    throw HttpError(400, error.message);
  }
  const regex = new RegExp(query.trim().toLowerCase(), "i");
  return regex;
};

module.exports = regexByKeywords;
