const asyncHandler = require("express-async-handler");

const History = require("../models/historyModel");

// @desc    Get history by user
// @route   GET /api/v1/history/:userId
// @access  Public
const getHistoryByUser = asyncHandler(async (req, res) => {
  try {
    const history = await History.find({ userId: req.params.userId });
    res.json(history);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

module.exports = { getHistoryByUser };
