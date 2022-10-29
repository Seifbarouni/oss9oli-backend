const asyncHandler = require("express-async-handler");

const {Pensee} = require("../models/postModel");
const User = require("../models/userModel")

// @desc   Add Post
// @route  POST /api/v1/comments
// @access Public

const likePost = asyncHandler(async (req, res) => {
  try {
    let post = await Pensee.findById(req.params.postId)
    if(post.dislikes.includes(req.body.payload.userId)){
      post.dislikes = post.dislikes.filter((id)=>{
        return id+"" != req.body.payload.userId
      })
      post.likes.push(req.body.payload.userId)
    }
    else if(post.likes.includes(req.body.payload.userId)){
      post.likes = post.likes.filter((id)=>{
        return id+"" != req.body.payload.userId
      })
    }else{
      post.likes.push(req.body.payload.userId)
    }
    await post.save();
    return res.status(201).json({
      success: true,
      data: {
        likes: post.likes,
        dislikes: post.dislikes
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});

const dislikePost = asyncHandler(async (req, res) => {
  try {
    let post = await Pensee.findById(req.params.postId)
    if(post.likes.includes(req.body.payload.userId)){
      post.likes = post.likes.filter((id)=>{
        return id+"" != req.body.payload.userId
      })
      post.dislikes.push(req.body.payload.userId)
    }
    else if(post.dislikes.includes(req.body.payload.userId)){
      post.dislikes = post.dislikes.filter((id)=>{
        return id+"" != req.body.payload.userId
      })
    }else{
      post.dislikes.push(req.body.payload.userId)
    }
    await post.save();
    return res.status(201).json({
      success: true,
      data:  {
        likes: post.likes,
        dislikes: post.dislikes
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});


module.exports = {
  likePost,
  dislikePost
};
