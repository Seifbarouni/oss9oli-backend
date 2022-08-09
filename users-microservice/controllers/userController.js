const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");


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

// @desc    create user if !exist
// @access  private

const createUser = async (providerId, name, avatar, email)=>{
  //search if user exists
  const user = await User.findOne({
    providerId: providerId,
  });
  //if user don't exist -> create one
  if (!user) {
      user  = await User.create({
        providerId: providerId,
        name: name,
        avatar: avatar,
        email: email,
        pack: "free",
        role: "user",
      });
    }
    return user
}

module.exports = {
  updateUser,
  createUser
};
