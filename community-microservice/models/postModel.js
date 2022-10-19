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

const optionSchema = new mongoose.Schema(
  {
    option: {
      type: String,
      trim: true,
    },
    users: {
      type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: []
    }
  }
);


const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["vote", "pensee"],
      trim: true,
      required: true
    },
  },
  {
    timestamps: true,
    
  }
);


 
const Post = mongoose.model("Post", postSchema);

const Pensee = Post.discriminator('Pensee',
  new mongoose.Schema({
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
    discriminatorKey: 'kind'
  }
))

const Vote = Post.discriminator('Vote',
  new mongoose.Schema({
    question: {
      type: String,
      required: true,
      trim: true, 
    },
    options: {
      type: [optionSchema],
      default: [],
      required: true,
      minlength: 2
    },
  },
  {
    discriminatorKey: 'kind'
  }
))


module.exports = {
  Vote,
  Pensee,
  Post
}