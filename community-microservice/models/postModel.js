const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
      trim: true
    }
  },
  {
    timestamps: true,
  }
);


const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true, 
    },
    comments: {
      type: [commentSchema],
      default: [],
      required: true

    },
    likes: {
      type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
