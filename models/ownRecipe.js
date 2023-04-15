const { Schema, model, isValidObjectId } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const categoryList = require("../recipesCategory/categoryList");

const ingredientSchema = Schema({
  id: {
    type: String,
  },
  measure: {
    type: String,
    default: "",
  },

  _id: false,
});

const ownRecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: categoryList,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    instructions: {
      type: String,
    },
    preview: {
      type: String,
    },
    time: {
      type: String,
      default: "",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    ingredients: [ingredientSchema],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

ownRecipeSchema.post("save", handleMongooseError);

const objectSchema = Joi.object({
  id: Joi.string().required(),
  measure: Joi.string().required(),
});

const addSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  category: Joi.string()
    .valid(...categoryList)
    .required(),
  description: Joi.string().min(2).max(600).required(),
  instructions: Joi.string().required(),
  time: Joi.string().required(),
  favorite: Joi.boolean().default(false),
  ingredients: Joi.array().items(objectSchema),
});

const schemas = {
  addSchema,
};

const OwnRecipe = model("ownRecipe", ownRecipeSchema);

module.exports = { OwnRecipe, schemas };
