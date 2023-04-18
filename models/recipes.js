const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const recipeSchema = new Schema(
  {
    originalId: String,
    title: {
      type: String,
      required: [true, "Set name for recipe"],
    },
    category: {
      type: String,
      enum: [
        "Beef",
        "Breakfast",
        "Chicken",
        "Dessert",
        "Goat",
        "Lamb",
        "Miscellaneous",
        "Pasta",
        "Pork",
        "Seafood",
        "Side",
        "Starter",
        "Vegan",
        "Vegetarian",
      ],
      required: [true, "Set name for category"],
    },
    area: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
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
    popularity: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
    youtube: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
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
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post("save", handleMongooseError);

const addSchema = Joi.object({});

const schemas = {
  addSchema,
};

const Recipe = model("recipe", recipeSchema);

module.exports = {
  Recipe,
  schemas,
};
