const mongoose = require("mongoose");

const DOCUMENT_NAME = "Dishes";
const COLLECTION_NAME = "Dishes";
const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
    comments: {
        type: Array,
        required: false,
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, dishSchema);
