const asyncHandler = require("express-async-handler");

const Favorite = require("../models/favoriteModel");

// @desc    Get favorites by userId
// @route   GET /api/v1/favorites/:id
// @access  Public

const getFavoriteByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: "UserId is required",
    });
  }

  try {
    const favorites = await Favorite.find({ userId: userId });
    return res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Add favorite
// @route   POST /api/v1/favorites
// @access  Public

const addFavorite = asyncHandler(async (req, res) => {
  const { podcastId, userId } = req.body;
  if (!podcastId || !userId) {
    return res.status(400).json({
      success: false,
      error: "PodcastId and UserId are required",
    });
  }

  try {
    const favorite = await Favorite.findOne({
      podcastId: podcastId,
      userId: userId,
    });
    if (favorite) {
      return res.status(400).json({
        success: false,
        error: "Podcast already in favorites",
      });
    }

    const newFavorite = await Favorite.create(req.body);
    return res.status(201).json({
      success: true,
      data: newFavorite,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Delete favorite
// @route   DELETE /api/v1/favorites/:id
// @access  Public

const deleteFavorite = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Id is required",
    });
  }
  // make the favorite visible to false if it exists
  try {
    const favorite = await Favorite.findByIdAndUpdate(id, { visible: false });
    if (!favorite) {
      return res.status(400).json({
        success: false,
        error: "Favorite does not exist",
      });
    }
    return res.status(200).json({
      success: true,
      data: favorite,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = {
  getFavoriteByUserId,
  addFavorite,
  deleteFavorite,
};
