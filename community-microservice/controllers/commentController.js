const asyncHandler = require("express-async-handler");

const {Pensee} = require("../models/postModel");
const User = require("../models/userModel");

// @desc   Add Post
// @route  POST /api/v1/comments
// @access Public

const addComment = asyncHandler(async (req, res) => {
  const { postId, comment } = req.body;

  if (!postId || !comment) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    let post = await Pensee.findById(postId);
    console.log(post)
    post.comments = [
      ...post.comments,
      { comment: comment, userId: req.body.payload.userId },
    ];
    await post.save();
    Pensee.populate(
      post,
      { path: "comments." + (post.comments.length - 1) + ".userId" },
      (err, post) => {
        if (err) {
          res.status(500).json({
            success: false,
            error: err,
          });
        } else {
          return res.status(201).json({
            success: true,
            data: post.comments[post.comments.length - 1],
          });
        }
      }
    );
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});

const getComments = asyncHandler(async (req, res) => {
  try {
    await Pensee.findById(req.params.postId)
      .populate("comments.userId", ["customSeed", "name"])
      .exec((err, post) => {
        if (err) {
          res.status(500).json({
            success: false,
            error: err,
          });
        } else {
          return res.status(201).json({
            success: true,
            data: post.comments,
          });
        }
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});
module.exports = {
  addComment,
  getComments,
};
