const { Schema, model } = require("mongoose");


const { handleMongooseError } = require("../helpers");

const ingredientsSchema = new Schema({

    ttl: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    thb: {
      type: String,
      required: true,
    },

    t: String,

}, { versionKey: false, timestamps: true });


ingredientsSchema.post('save', handleMongooseError);

const Ingredients = model('ingredient', ingredientsSchema);

module.exports = Ingredients;