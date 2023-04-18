const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      // required: [true, "Verify token is required"],
    },
    favorites: {
      type: Array,
      default: [],
    },
    subscribe: {
      type: Boolean,
      default: false,
    },
    shoppingList: {
      _id: false,
      type: [
        {
          productId: {
            type: String,
            ref: "ingredient",
          },
          measure: {
            type: [String],
            default: [],
          },
          ttl: {
            type: String,
            default: "",
          },
          thb: {
            type: String,
            default: "",
          },
        },
      ],
      default: [],
    },
    ownRecipesNumber: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscribeSchema = Joi.object({
  subscribe: Joi.boolean().required("missing field subscribe"),
});

const addShoppingListSchema = Joi.object({
  productId: Joi.string().required(),
  measure: Joi.string().max(200).required(),
});

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscribeSchema,
  addShoppingListSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
