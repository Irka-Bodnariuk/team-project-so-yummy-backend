const HttpError = require("./HttpError");
const Joi = require("joi");

const getRegexForSearchByKeyword = (query) => {
  const querySchema = Joi.string()
    .pattern(/^[a-z A-Z\-&,]+$/)
    .required()
    .messages({
      "string.base": `"search query" should be a type of 'string'`,
      "string.pattern.base": `wrong format of "search query"`,
      "any.required": `"search query" is required`,
    });
  const { error } = querySchema.validate(query);
  if (error) {
    throw HttpError(400, error.message);
  }
  const regex = new RegExp(query.trim().toLowerCase(), "i");
  return regex;
};

module.exports = getRegexForSearchByKeyword;
