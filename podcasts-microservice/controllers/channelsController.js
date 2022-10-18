const asyncHandler = require("express-async-handler");

const Channel = require("../models/channelModel");

// @desc    Get all channels
// @route   GET /api/v1/channels
// @access  Public

const getChannels = asyncHandler(async (req, res) => {
  const channels = await Channel.find();

  res.status(200).json({
    success: true,
    count: channels.length,
    data: channels,
  });
});

// @desc    Get single channel by userId
// @route   GET /api/v1/channels/:id
// @access  Public

const getChannelByUserId = asyncHandler(async (req, res) => {
  try {
    const channel = await Channel.findOne({ userId: req.body.payload.userId });

    if (!channel) {
      return res.status(400).json({
        success: false,
        error: `Channel not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: channel,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// @desc  Add channel
// @route POST /api/v1/channels
// @access Private

const addChannel = asyncHandler(async (req, res) => {
  try {
    const image = req.file;
    const name = req.body.name;
    const userId = req.body.userId;
    const description = req.body.description;

    let channel;
    if (image) {
      channel = new Channel({
        name,
        description,
        userId,
        image: {
          data: image.buffer.toString("base64"),
          contentType: image.mimetype,
        },
      });
    } else {
      channel = new Channel({
        name,
        description,
        userId,
        image: {
          data: "",
          contentType: "",
        },
      });
    }
    const createdChannel = await Channel.create(channel);

    return res.status(201).json({
      success: true,
      data: createdChannel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc  Update channel
// @route PUT /api/v1/channels/:id
// @access Private

const updateChannel = asyncHandler(async (req, res) => {
  // const channel = await Channel.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  let channel;
  if (req.file) {
    // find by id and update with image
    const image = {
      data: req.file.buffer.toString("base64"),
      contentType: req.file.mimetype,
    };
    channel = await Channel.findOneAndUpdate(
      { userId: req.body.payload.userId },
      { image, ...req.body },
      { new: true, runValidators: true }
    );
  } else {
    // find by id and update without image
    channel = await Channel.findOneAndUpdate(
      { userId: req.body.payload.userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
  }
  if (!channel) {
    return res.status(400).json({
      success: false,
      error: `Channel not found`,
    });
  }

  return res.status(200).json({
    success: true,
    data: channel,
  });
});

// @desc  Delete channel
// @route DELETE /api/v1/channels/:id
// @access Private

const deleteChannel = asyncHandler(async (req, res) => {
  const channel = await Channel.findByIdAndDelete(req.params.id);

  if (!channel) {
    return res.status(400).json({
      success: false,
      error: `Channel not found`,
    });
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc  Get channel by id
// @route GET /api/v1/channels/:id
// @access Private

const getChannelById = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      success: false,
      error: `Channel not found`,
    });
  }
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(400).json({
        success: false,
        error: `Channel not found`,
      });
    }
    return res.status(200).json({
      success: true,
      data: channel,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = {
  getChannels,
  getChannelByUserId,
  getChannelById,
  addChannel,
  updateChannel,
  deleteChannel,
};
