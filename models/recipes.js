const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
// const Joi = require("joi");

const resipiesSchema = new Schema(
  {
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
    },
    instructions: {
      type: String,
      minlength: 30,
      required: true,
      unique: true,
    },
    description: {
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
      required: true,
    },
    popularity: {
      type: Number,
    },
    favorites: {
      type: Array,
    },
    likes: {
      type: Array,
    },
    youtube: {
      type: String,
    },
    tags: {
      type: Array,
    },
    ingredients: [
      {
        id: Schema.Types.ObjectId,
        measure: String,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

resipiesSchema.post("save", handleMongooseError);

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
//   favorite: Joi.boolean(),
// });

// const updateFavoriteSchems = Joi.object({
//   favorite: Joi.boolean().required(),
// });

// const schemas = {
//   addSchema,
//   updateFavoriteSchems,
// };

const Recipe = model("recipe", resipiesSchema);

module.exports = {
  Recipe,
};
