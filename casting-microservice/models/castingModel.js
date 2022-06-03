const mongoose = require("mongoose");

const castingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      maxlength: 256,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Casting", castingSchema);
