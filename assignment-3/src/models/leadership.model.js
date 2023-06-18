const mongoose = require("mongoose");

const DOCUMENT_NAME = "Leader";
const COLLECTION_NAME = "Leader";
const leaderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    abbr: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, leaderSchema);
