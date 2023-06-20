const mongoose = require("mongoose");

const DOCUMENT_NAME = "Comments";
const COLLECTION_NAME = "Comments";
const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, commentSchema);
