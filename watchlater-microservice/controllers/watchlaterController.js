const asyncHandler = require("express-async-handler");

const Watchlater = require("../models/watchlaterModel");

// @desc    Get watchlater list by user id
// @route   GET /api/v1/watchlater/user/:userId
// @access  Public

const getWatchlaterListByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: "UserId is required",
    });
  }

  try {
    const watchlater = await Watchlater.find({ userId: userId });
    return res.status(200).json({
      success: true,
      data: watchlater,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc  get watchlater by id
// @route GET /api/v1/watchlater/:id
// @access Public

const getWatchlaterById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Id is required",
    });
  }

  try {
    const watchlater = await Watchlater.findById(id);
    return res.status(200).json({
      success: true,
      data: watchlater,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc  create watchlater
// @route POST /api/v1/watchlater
// @access Private

const createWatchlater = asyncHandler(async (req, res) => {
  const { userId, podcastList } = req.body;
  if (!userId || !podcastList) {
    return res.status(400).json({
      success: false,
      error: "UserId and podcastList are required",
    });
  }

  try {
    const watchlater = await Watchlater.create(req.body);
    return res.status(201).json({
      success: true,
      data: watchlater,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc add podcast to watchlater
// @route PUT /api/v1/watchlater/:id
// @access Private

const addPodcastToWatchlater = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Id is required",
    });
  }

  try {
    const watchlater = await Watchlater.findById(id);
    watchlater.podcastList.push(req.body.podcastId);
    await watchlater.save();
    return res.status(200).json({
      success: true,
      data: watchlater,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc remove podcast from watchlater
// @route DELETE /api/v1/watchlater/:id
// @access Private

const removePodcastFromWatchlater = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Id is required",
    });
  }

  try {
    const watchlater = await Watchlater.findById(id);
    // Remove podcast from watchlater
    watchlater.podcastList = watchlater.podcastList.filter(
      (podcast) => podcast.toString() !== req.body.podcastId
    );
    await watchlater.save();
    return res.status(200).json({
      success: true,
      data: watchlater,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = {
  getWatchlaterListByUserId,
  getWatchlaterById,
  createWatchlater,
  addPodcastToWatchlater,
  removePodcastFromWatchlater,
};
