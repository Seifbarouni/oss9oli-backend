const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema(
  {
    podcastId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcast",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "actif", "refused", "deleted"],
    },
    type: {
      type: String,
      required: true,
      enum: ["Monologue", "Dialogue"],
    },
    explicit: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    episodeNumber: {
      type: Number,
      required: true,
    },
    guest: {
      type: String,
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
      required: false,
    },
    numberOfListeners: {
      type: Number,
      required: true,
      default: 0,
    },
    audio: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Episode", episodeSchema);
