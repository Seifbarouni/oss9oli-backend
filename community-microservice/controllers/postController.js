const asyncHandler = require("express-async-handler");

const { Pensee, Vote, Post } = require("../models/postModel");
const User = require("../models/userModel");

// @desc   Add Post
// @route  POST /api/v1/posts
// @access Public

const addPost = asyncHandler(async (req, res) => {
  const { userId, content, type, options, question} = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "user needs to be connected",
    });
  }
  if(type == "pensee"){
    const newPensee = await Pensee.create({
      userId,
      type,
      content,
    })
    return res.status(201).json({
      success: true,
      data: newPensee,
    });
  }else if(type == "vote"){
    let optionsMongo = []
    for(let option of options){
      optionsMongo.push({option})
    }
    const newVote = await Vote.create({
      userId,
      type,
      options: optionsMongo,
      question
    })
    return res.status(201).json({
      success: true,
      data: newVote,
    });
  }else
    return res.status(400).json({
      success: false,
      message: "type not defined",
    });
});

// @desc   get Posts
// @route  POST /api/v1/posts
// @access Public

const getPosts = asyncHandler(async (req, res) => {
  try {
   await Post.find()
      .sort("-createdAt")
      .populate("userId")
      .exec((err, posts) => {
        if (err)
          return res.status(500).json({
            success: false,
            error: err,
          });
          return res.status(201).json({
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
