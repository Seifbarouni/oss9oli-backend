const mongoose = require("mongoose");

const openmicSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    file: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    motivation: {
      type: String,
      required: true
    },
    nomApp: {
      type: Boolean,
      required: true
    },
    occupation: {
      type: String,
      required: true
    },
    origine:{
      type: String,
      required: true
    },
    sexe:{
      type: String,
      required: true
    },
    suj:{
      type: Boolean,
      required: true
    },
    voix:{
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Openmic", openmicSchema);
