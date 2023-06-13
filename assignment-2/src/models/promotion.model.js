const mongoose = require("mongoose");

require("mongoose-currency").loadType(mongoose);

const Currency = mongoose.Schema.Types.Decimal128;

const DOCUMENT_NAME = "Pormotion";
const COLLECTION_NAME = "Pormotion";

const promotionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    price: {
      type: Currency,
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

module.exports = mongoose.model(DOCUMENT_NAME, promotionSchema);
