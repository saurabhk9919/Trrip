const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(

  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFile: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
    },

    itinerary: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Itinerary",
  itinerarySchema
);