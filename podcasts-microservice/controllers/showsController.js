const asyncHandler = require("express-async-handler");

const Show = require("../models/showModel");

// @desc    Get all shows by channelId
// @route   GET /api/v1/shows/channel/:channelId
// @access  Public

const getShowsByChannelId = asyncHandler(async (req, res) => {
  if (!req.params.channelId) {
    return res.status(500).json({
      success: false,
      error: `Invalid ID`,
    });
  }

  try {
    const shows = await Show.find({ channelId: req.params.id });
    return res.status(200).json({
      success: true,
      count: shows.length,
      data: shows,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// @desc    Get single show by id
// @route   GET /api/v1/shows/:id
// @access  Public

const getShowById = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      success: false,
      error: `Invalid ID`,
    });
  }

  try {
    const show = await Show.findById(req.params.id);

    if (!show) {
      return res.status(400).json({
        success: false,
        error: `Show not found`,
      });
    }
    return res.status(200).json({
      success: true,
      data: show,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// @desc    Add show
// @route   POST /api/v1/shows
// @access  Private

const addShow = asyncHandler(async (req, res) => {
  try {
    channelId = req.body.channelId;
    showName = req.body.name;
    description = req.body.description;
    image = req.body.image;
    const show = new Show({
      channelId,
      name: showName,
      description,
      imageUrl: image,
    });
    await show.save();
    return res.status(201).json({
      success: true,
      data: show,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// @desc    Update show
// @route   PUT /api/v1/shows/:id
// @access  Private

const updateShow = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      success: false,
      error: `Invalid ID`,
    });
  }

  try {
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!show) {
      return res.status(400).json({
        success: false,
        error: `Show not found`,
      });
    }
    return res.status(200).json({
      success: true,
      data: show,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = {
  getShowsByChannelId,
  getShowById,
  addShow,
  updateShow,
};
