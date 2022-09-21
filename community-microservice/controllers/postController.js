const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");
const User = require("../models/userModel")

// @desc   Add Post
// @route  POST /api/v1/posts
// @access Public

const addPost = asyncHandler(async (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const newPost = await Post.create({
      userId,
      content
    });

    return res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});

// @desc   get Posts
// @route  POST /api/v1/posts
// @access Public

const getPosts = asyncHandler(async (req, res) => {

  try {
    await Post.find().sort("-createdAt").populate("userId", ["avatar", "name"]).exec((err, posts)=>{
      if(err) 
          return res.status(500).json({
            success: false,
            error: err,
          });
       res.status(201).json({
        success: true,
        data: posts,
      });
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});

module.exports = {
  getPosts,
  addPost,
};
