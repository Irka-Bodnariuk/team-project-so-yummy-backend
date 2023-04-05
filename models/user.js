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
      required: [true, "Verify token is required"],
    },
    subscribe: {
      type: Boolean,
      default: false,
    },
    motivations: {
      _id: false,
      type: {
        createShoppingList: {
          type: Boolean,
          default: false,
        },
        addRecipesToFavorite: {
          type: Number,
          default: 0,
        },
        addFirstOwnRecipe: {
          type: Boolean,
          default: false,
        },
      },
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

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscribeSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
