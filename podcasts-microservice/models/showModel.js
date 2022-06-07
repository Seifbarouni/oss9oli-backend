const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 256,
    },
    image: {
      encoding: String,
      file: {
        data: Buffer,
        contentType: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Show", showSchema);
