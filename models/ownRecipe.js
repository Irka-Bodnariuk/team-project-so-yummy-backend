const { Schema, model, isValidObjectId } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const categoryList = require("../recipesCategory/categoryList");

const ownRecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set name for recipe"],
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
    thumb: {
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
    ingredients: {
      _id: false,
      type: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: "ingredient",
            required: true,
          },
          measure: {
            type: String,
            default: "",
          },
        },
      ],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

ownRecipeSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  category: Joi.string()
    .valid(...categoryList)
    .required(),
  description: Joi.string().min(2).max(600).required(),
  instructions: Joi.string().min(2).max(2000).required(),
  time: Joi.string().required(),
  favorite: Joi.boolean().default(false),
  ingredients: Joi.array().items(
    Joi.object({
      id: Joi.string().custom((value, helpers) => {
        if (isValidObjectId(value)) {
          return value;
        } else {
          return helpers.message("Invalid ID");
        }
      }),
      measure: Joi.string().max(200).required(),
    })
  ),
});

const schemas = {
  addSchema,
};

const OwnRecipe = model("ownRecipe", ownRecipeSchema);

module.exports = { OwnRecipe, schemas };
