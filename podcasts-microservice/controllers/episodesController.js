const asyncHandler = require("express-async-handler");

const Episode = require("../models/episodeModel");

const Channel = require("../models/channelModel");

const Podcast = require("../models/podcastModel");

const History = require("../models/historyModel");

const fs = require("fs");

const mm = require("musicmetadata");

// @desc    Get all episodes
// @route   GET /api/v1/episodes
// @access  Public

const getEpisodes = asyncHandler(async (req, res) => {
  let actifs = req.query.actifs ? JSON.parse(req.query.actifs) : [];
  let expressions = { status: "pending" };
  if (actifs.length > 0) {
    expressions = { ...expressions, tags: { $in: actifs } };
  }
  if (req.query.search) {
    expressions = {
      ...expressions,
      $or: [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ],
    };
  }
  const eps = Episode.find(expressions)
    .populate("podcastId")
    .exec(function (err, e) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err,
        });
      }
      res.status(200).json({
        success: true,
        count: e.length,
        data: e,
      });
    });
});

// @desc    Get Episodes by user
// @route   GET /api/v1/episodes/user
// @access  Public

const getEpisodesByUser = (req, res) => {
  try {
    Channel.findOne({ userId: req.body.payload.userId }).then((c) => {
      let dt = [];
      Podcast.find({ channelId: c._id })
        .then((pod) => {
          pod.forEach((p) => {
            let podcast = {
              name: p.name,
              episodes: [],
            };
            Episode.find({ podcastId: p._id })
              .populate("podcastId")
              .then((e) => {
                podcast.episodes = e;
                dt.push(podcast);
              });
          });
        })
        .then(() => {
          const timer = (ms) => new Promise((res) => setTimeout(res, ms));
          timer(1500).then((_) => {
            res.status(200).json({
              success: true,
              data: dt,
            });
          });
        });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

const getEpisodesByUser2 = asyncHandler(async (req, res) => {
  try {
    //get user's channel
    const c = await Channel.findOne({ userId: req.body.payload.userId });
    //get user's podcasts
    const podcasts = await Podcast.find({channelId: c._id});
    //extract podcast ids
    let podcastId = podcasts.map(pod=> pod._id)
    //get episodes
    const eps = await Episode.find({
      podcastId: {$in: podcastId},
      status: { $in: ["actif", "pending"] },
    }).populate("podcastId");

    res.status(200).json({
      success: true,
      count: eps.length,
      data: eps,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});

// @desc    Get single episode
// @route   GET /api/v1/episodes/:id
// @access  Public

const getEpisode = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      success: false,
      error: `Invalid ID`,
    });
  }

  if (!req.params.userId) {
    return res.status(500).json({
      success: false,
      error: `Invalid user`,
    });
  }

  try {
    const ep = await Episode.findById(req.params.id);

    if (!ep) {
      return res.status(400).json({
        success: false,
        error: `Episode not found`,
      });
    }

    // add 1 to number of listeners
    ep.numberOfListeners++;
    await ep.save();

    // add to history or update
    const h = await History.findOne({
      episodeId: ep._id,
      userId: req.params.userId,
    });
    if (!h) {
      const history = new History({
        episodeId: ep._id,
        userId: req.params.userId,
      });
      await history.save();
    }

    return res.download(ep.audio, ep.title + ".mp3");
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// @desc   Get episodes by podcasts
// @route  GET /api/v1/episodes/podcast/:id
// @access Public

const getEpisodesByPodcastId = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      success: false,
      error: `Invalid ID`,
    });
  }
  try {
    const eps = await Episode.find({
      podcastId: req.params.id,
      status: "actif",
    }).populate("podcastId");

    if (!eps) {
      return res.status(400).json({
        success: false,
        error: `Episodes not found`,
      });
    }

    return res.status(200).json({
      success: true,
      count: eps.length,
      data: eps,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// @desc   Get episodes by podcast id and show the pending ones
// @route  GET /api/v1/episodes/podcast/:id
// @access Public

const chan_getEpisodesByPodcastId = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      success: false,
      error: `Invalid ID`,
    });
  }
  try {
    const eps = await Episode.find({
      podcastId: req.params.id,
      status: { $in: ["actif", "pending"] },
    }).populate("podcastId");

    if (!eps) {
      return res.status(400).json({
        success: false,
        error: `Episodes not found`,
      });
    }

    return res.status(200).json({
      success: true,
      count: eps.length,
      data: eps,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// @desc   Add episode
// @route  POST /api/v1/episodes
// @access Public

const addEpisode = asyncHandler(async (req, res) => {
  try {
    mm(
      fs.createReadStream(req.file.path),
      { duration: true },
      async function (err, metadata) {
        if (err) throw err;
        const episode = new Episode({
          ...req.body,
          podcastId: req.body.podcastId,
          length: Math.round(metadata.duration),
          audio: req.file.path,
        });
        const ep = await Episode.create(episode);

        return res.status(201).json({
          success: true,
          data: ep,
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }
});

// @desc   Update episode
// @route  PUT /api/v1/episode/:id
// @access Public

const updateEpisode = asyncHandler(async (req, res) => {
  let ep;

  if (req.file) {
    ep = await Episode.findByIdAndUpdate(
      req.params.id,
      { ...req.body, audio: req.file.path },
      { new: true }
    );
  } else {
    ep = await Episode.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  }

  if (!ep) {
    return res.status(400).json({
      success: false,
      error: `Episode not found`,
    });
  }

  return res.status(200).json({
    success: true,
    data: ep,
  });
});

// @desc   Delete episode
// @route  DELETE /api/v1/episode/:id
// @access Public

const deleteEpisode = asyncHandler(async (req, res) => {
  // make episode status "deleted"
  const ep = await Episode.findByIdAndUpdate(
    req.params.id,
    { status: "deleted" },
    { new: true }
  );

  if (!ep) {
    return res.status(400).json({
      success: false,
      error: `Episode not found`,
    });
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});
let tags = null;
const getTags = asyncHandler(async (req, res) => {
  if(tags == null || tags.iat + (1000*60*60) < Date.now()){
    const eps = await Episode.find({status: "pending"});
    let tagArrays = eps.map(ep=>[...ep.tags])
    let tempTags = [];
    for(let arr of tagArrays){
      tempTags = tempTags.concat(arr)
    }
    tags = {tags: [...new Set(tempTags)], iat: Date.now()};
  }
  return res.status(200).json({
    success: true,
    data: tags.tags,
  });
});
module.exports = {
  getEpisodes,
  getEpisode,
  deleteEpisode,
  updateEpisode,
  addEpisode,
  getEpisodesByPodcastId,
  getEpisodesByUser,
  getEpisodesByUser2,
  chan_getEpisodesByPodcastId,
  getTags
};
