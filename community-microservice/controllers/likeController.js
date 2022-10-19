const asyncHandler = require("express-async-handler");

const {Pensee} = require("../models/postModel");
const User = require("../models/userModel")

// @desc   Add Post
// @route  POST /api/v1/comments
// @access Public

const likePost = asyncHandler(async (req, res) => {
  try {
    let post = await Pensee.findById(req.params.postId)
    if(post.likes.includes(req.body.payload.userId)){
      post.likes = post.likes.filter((id)=>{
        return id == req.params.postId
      })
    }else{
      post.likes.push(req.body.payload.userId)
    }
    await post.save();
    return res.status(201).json({
      success: true,
      data: post.likes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});


module.exports = {
  likePost
};
