const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    providerId: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    pack: {
      type: String,
      enum: [
        "free",
        "consumer_pack",
        "community_pack",
        "producer_pack",
        "brand_pack",
      ],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    interests: {
      type: [String],
    },
    minutesListened: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
