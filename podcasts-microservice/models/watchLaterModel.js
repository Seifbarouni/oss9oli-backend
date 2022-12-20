const mongoose = require("mongoose");

const watchLaterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    episodes: {
      type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("watchLater", watchLaterSchema);

