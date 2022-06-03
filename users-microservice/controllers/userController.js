const asyncHandler = require("express-async-handler");
const OAuth2Client = require("google-auth-library").OAuth2Client;

const User = require("../models/userModel");

const googleClient = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
});

// @desc    Authenticate user using google oauth
// @route   POST /api/v1/auth/google
// @access  Public

const authenticateUserGoogle = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({
      success: false,
      error: "Token is required",
    });
  }
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const user = await User.findOne({
    email: payload.email,
    name: payload.name,
    avatar: payload.picture,
  });

  if (!user) {
    try {
      const newUser = await User.create({
        providerId: payload.sub,
        name: payload.name,
        avatar: payload.picture,
        email: payload.email,
        pack: "free",
        role: "user",
      });
      return res.status(201).json({
        success: true,
        data: newUser,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  } else {
    return res.status(200).json({
      success: true,
      data: user,
    });
  }
});

// @desc    Authenticate user using facebook oauth
// @route   POST /api/v1/auth/facebook
// @access  Public

const authenticateUserFacebook = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({
    providerId: token,
  });

  if (!user) {
    try {
      const newUser = await User.create({
        providerId: token,
        name: req.body.name,
        avatar: req.body.picture,
        email: req.body.email,
        pack: "free",
        role: "user",
      });
      return res.status(201).json({
        success: true,
        data: newUser,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  } else {
    return res.status(200).json({
      success: true,
      data: user,
    });
  }
});

// @desc    Update user
// @route   POST /api/v1/
// @access  Public

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = {
  authenticateUserGoogle,
  authenticateUserFacebook,
  updateUser,
};
