const asyncHandler = require("express-async-handler");

const Comment = require("../models/commentModel");

// @desc    Get comments for a podcast
// @route   GET /api/v1/comments/:id
// @access  Public

const getCommentsByPodcastId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Podcast ID is required",
    });
  }
  try {
    const comments = await Comment.find({ podcastId: id });

    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// @desc   Add comment
// @route  POST /api/v1/comments
// @access Public

const addComment = asyncHandler(async (req, res) => {
  const { userId, podcastId, comment } = req.body;

  if (!userId || !podcastId || !comment) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const newComment = await Comment.create({
      userId,
      podcastId,
      comment,
    });

    return res.status(201).json({
      success: true,
      data: newComment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});

// @desc   Update comment
// @route  PUT /api/v1/comments/:id
// @access Public

const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { comment, visible } = req.body;

  if (!id || !comment) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const c = await Comment.findByIdAndUpdate(
      id,
      { comment, visible },
      { new: true }
    );

    if (!c) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: c,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});

// @desc   Delete comment
// @route  DELETE /api/v1/comments/:id
// @access Public

const deleteComment = asyncHandler(async (req, res) => {
  // find by id and make visible false

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Comment ID is required",
    });
  }

  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      { visible: false },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});

module.exports = {
  getCommentsByPodcastId,
  addComment,
  updateComment,
  deleteComment,
};
