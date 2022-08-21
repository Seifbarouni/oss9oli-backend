const asyncHandler = require("express-async-handler");

const axios = require("axios")

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
 try{
//search if user exists
  let user = await User.findOne({
    providerId: providerId,
  });
  //if user don't exist -> create one and create a new channel
  if (!user) {
      user  = await User.create({
        providerId: providerId,
        name: name,
        avatar: avatar,
        email: email,
        pack: "free",
        role: "user",
      });
      axios.post(`${process.env.PODCAST_SERVICE_URL}/api/v1/channels`,
        {
          userId: user._id,
          name: `${user.name}'s channel`,
          description : 'change me'
        }
      ).then(res=>{
          console.log(res.data)
        }).catch(err=>{
          console.log(err)
        })
    }
    return user
  }catch(err){
    console.log(err)
  }
}
module.exports = {
  updateUser,
  createUser
};
