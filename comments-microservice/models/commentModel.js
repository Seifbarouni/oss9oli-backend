const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    podcastId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcast",
    },
    comment: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
