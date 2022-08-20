const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "actif", "refused"]
    },
    explicit: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 256,
    },
    tags: {
      type: [String],
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    numberOfListeners: {
      type: Number,
      required: true,
      default: 0,
    },
    audioUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Podcast", podcastSchema);
