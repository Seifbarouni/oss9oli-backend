const asyncHandler = require("express-async-handler");

const Casting = require("../models/castingModel");

// @desc    Get all castings
// @route   GET /api/v1/castings
// @access  Public

const getCastings = asyncHandler(async (req, res) => {
  const castings = await Casting.find();

  res.status(200).json({
    success: true,
    count: castings.length,
    data: castings,
  });
});

// @desc    Get single casting
// @route   GET /api/v1/castings/:id
// @access  Public

const getCasting = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      success: false,
      error: `Invalid ID`,
    });
  }

  try {
    const casting = await Casting.findById(req.params.id);
  
    if (!casting) {
      return res.status(400).json({
        success: false,
        error: `Casting not found`,
      });
    }
  
    return res.status(200).json({
      success: true,
      data: casting,
    });
  }catch(err){
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// @desc   Add casting
// @route  POST /api/v1/castings
// @access Public

const addCasting = asyncHandler(async (req, res) => {
  // check if body is valid
  if (
    req.body.name === "" ||
    req.body.title === "" ||
    req.body.type === "" ||
    req.body.content === "" ||
    req.body.userId === ""
  ) {
    return res.status(400).json({
      success: false,
      error: `Please fill in all fields`,
    });
  }

  try{
    const casting = await Casting.create(req.body);
  
    return res.status(201).json({
      success: true,
      data: casting,
    });
  }catch(err){
    return res.status(400).json({
      success: false,
      errors:err.errors,
    })
  }
});

// @desc   Update casting
// @route  PUT /api/v1/castings/:id
// @access Public

const updateCasting = asyncHandler(async (req, res) => {
  const casting = await Casting.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!casting) {
    return res.status(400).json({
      success: false,
      error: `Casting not found`,
    });
  }

  return res.status(200).json({
    success: true,
    data: casting,
  });
});

// @desc   Delete casting
// @route  DELETE /api/v1/castings/:id
// @access Public

const deleteCasting = asyncHandler(async (req, res) => {
  const casting = await Casting.findByIdAndDelete(req.params.id);

  if (!casting) {
    return res.status(400).json({
      success: false,
      error: `Casting not found`,
    });
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  getCastings,
  getCasting,
  addCasting,
  updateCasting,
  deleteCasting,
};
