const mongoose = require("mongoose");

// Define the schema for the watchlater model
// The watchlater model is used to store the list of podcasts that the user has added to their watchlater list

const watchlaterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    podcastList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Podcast",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Watchlater", watchlaterSchema);
