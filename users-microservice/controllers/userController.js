const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const axios = require("axios")

const User = require("../models/userModel");

// @desc    Get user uploaded image
// @route   GET /api/v1/image
// @acces   Public
const getUserUploadedImage = asyncHandler(async(req,res)=>{
  try {
   const user = await User.findById(req.body.payload.userId) 
   return res.status(200).json({
      image: user.image
    })
  } catch (error) {
   return res.status(500).json({
      error: error
    })
  }
}) 

// @desc    Update user
// @route   POST /api/v1/
// @access  Public

const updateUser = asyncHandler(async (req, res) => {
  let user;
  if (req.file){
    const image = {
      data : req.file.buffer.toString("base64"),
      contentType : req.file.mimetype
    }
    user = await User.findOneAndUpdate(
      {_id: req.body.payload.userId},
      {image, ...req.body},
      {new: true, runValidators:true}
    )
  }else{
     user = await User.findOneAndUpdate(
      {_id: req.body.payload.userId},
      req.body,
      {new: true, runValidators:true}
    )

  }
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  let isImagePresent = false
  if (user.image) isImagePresent = true
  const JWToken = jwt.sign(
  { userId: user._id, name: user.name, picture: user.avatar, pack: user.pack,description: user.description, isImagePresent},
          process.env.JWT_SECRET
  );

 
  return res.status(200).json({
    success: true,
    data: JWToken,
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
  createUser,
  getUserUploadedImage
};
