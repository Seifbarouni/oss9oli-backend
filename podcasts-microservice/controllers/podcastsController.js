const asyncHandler = require("express-async-handler");

const Podcast = require("../models/podcastModel");

// @desc    Get all podcasts
// @route   GET /api/v1/podcasts
// @access  Public

const getPodcasts = asyncHandler(async (req, res) => {
  const pods = await Podcast.find();

  res.status(200).json({
    success: true,
    count: pods.length,
    data: pods,
  });
});

// @desc    Get single podcast
// @route   GET /api/v1/podcasts/:id
// @access  Public

const getPodcast = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      success: false,
      error: `Invalid ID`,
    });
  }

  try {
    const pod = await Podcast.findById(req.params.id);

    if (!pod) {
      return res.status(400).json({
        success: false,
        error: `Podcast not found`,
      });
    }

    // add 1 to number of listeners
    pod.numberOfListeners++;
    await pod.save();

    return res.status(200).json({
      success: true,
      data: pod,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// @desc   Get podcasts by channel
// @route  GET /api/v1/podcasts/channel/:id
// @access Public

const getPodcastsByChannelId = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      success: false,
      error: `Invalid ID`,
    });
  }

  try {
    const pods = await Podcast.find({ channelId: req.params.id });

    if (!pods) {
      return res.status(400).json({
        success: false,
        error: `Podcasts not found`,
      });
    }

    return res.status(200).json({
      success: true,
      count: pods.length,
      data: pods,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// @desc   Add podcast
// @route  POST /api/v1/podcasts
// @access Public

const addPodcast = asyncHandler(async (req, res) => {
  try {
    const audio = req.file;
    const podcast = new Podcast({
      ...req.body,
      audio,
    });

    const pod = await Podcast.create(podcast);

    return res.status(201).json({
      success: true,
      data: pod,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }
});

// @desc   Update podcast
// @route  PUT /api/v1/podcasts/:id
// @access Public

const updatePodcast = asyncHandler(async (req, res) => {
  let pod;

  if (req.file) {
    const audio = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    pod = await Podcast.findByIdAndUpdate(
      req.params.id,
      { ...req.body, audio },
      { new: true }
    );
  } else {
    pod = await Podcast.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  }

  if (!pod) {
    return res.status(400).json({
      success: false,
      error: `Podcast not found`,
    });
  }

  return res.status(200).json({
    success: true,
    data: pod,
  });
});

// @desc   Delete podcast
// @route  DELETE /api/v1/podcasts/:id
// @access Public

const deletePodcast = asyncHandler(async (req, res) => {
  const pod = await Podcast.findByIdAndDelete(req.params.id);

  if (!pod) {
    return res.status(400).json({
      success: false,
      error: `Podcast not found`,
    });
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  getPodcasts,
  getPodcast,
  getPodcastsByChannelId,
  addPodcast,
  updatePodcast,
  deletePodcast,
};
