const asyncHandler = require("express-async-handler");

const Podcast = require("../models/podcastModel");

const Channel = require("../models/channelModel");

const fs = require("fs");

const mm = require('musicmetadata');

// @desc    Get all podcasts
// @route   GET /api/v1/podcasts
// @access  Public

const getPodcasts = asyncHandler(async (req, res) => {
  let actifs = req.query.actifs? JSON.parse(req.query.actifs): []
  let expressions = {status: "actif"}
  if(actifs.length > 0){
    expressions = {...expressions , tags: { $in: actifs }}
  }
  if(req.query.search){
    expressions = {...expressions , $or : [{title: { $regex: req.query.search, $options: 'i' }}, {description: { $regex: req.query.search, $options: 'i'  } } ] }
  }
  const pods = await Podcast.find(expressions).populate('channelId').
  exec(function (err, podcasts) {
    if (err) return handleError(err);
    res.status(200).json({
      success: true,
      count: podcasts.length,
      data: podcasts,
    });
  });;

  
});

// @desc    Get podcasts for specific user
// @route   GET /api/v1/podcasts
// @access  Public

const getPodcastsByUser = asyncHandler(async (req, res) => {
  const channel = await Channel.findOne({userId: req.body.payload.userId})
  if (channel == null){
    return res.status(400).json({
      success: false,
      error: "user don't own a channel"
    });
  }

  const pods = await Podcast.find({channelId: channel._id});

  res.status(200).json({
    success: true,
    count: pods.length,
    data: {
      pods: pods,
      channel: channel
    },
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

    return res.download(pod.audio, pod.title+".mp3")
    
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
     mm(fs.createReadStream(req.file.path), { duration: true },async function (err, metadata) {
      if (err) throw err;
      const channel = await Channel.findOne({userId: req.body.payload.userId});
    const podcast = new Podcast({
      ...req.body,
      channelId: channel._id,
      length: Math.round(metadata.duration),
      audio: req.file.path,
    });
      const pod = await Podcast.create(podcast);

      return res.status(201).json({
        success: true,
        data: pod,
      });
      });
    
  } catch (err) {
    console.log(err);
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
    pod = await Podcast.findByIdAndUpdate(
      req.params.id,
      { ...req.body, audio: req.file.path },
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
  getPodcastsByUser,
};
