const asyncHandler = require("express-async-handler");

const { Vote } = require("../models/postModel");
const { exists } = require("../models/userModel");
const User = require("../models/userModel");

// @desc   vote
// @route  POST /api/v1/votes
// @access Public

const Voter = asyncHandler(async (req, res) => {
  const { userId, postId, optionSelected} = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "user needs to be connected",
    });
  }
  let vote = await Vote.findById(postId);
  // check if user already voted
  let exist = false
  for(let option of vote.options){
      for(let i = 0; i<option.users.length; i++){
        if(option.users[i] == userId){
          exist = true;
          break;
        }
      }
      if(exist) break;
  }
  // if not voted -> count his vote
  if(!exist){
    for(let option of vote.options){
        if(option.option == optionSelected){
            option.users.push(userId)
        }
      }
      await vote.save();
  }
    return res.status(201).json({
      success: true,
      data: vote,
    });
 
});

module.exports = {
  Voter,
};
