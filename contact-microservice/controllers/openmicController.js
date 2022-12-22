const asyncHandler = require("express-async-handler");
const Openmic = require("../models/openmicModel");

const addOpenmic = asyncHandler(async (req, res) => {
  try{
    let openmic = new Openmic({...req.body, file: req?.file?.path, userId: req.body.payload.userId});
        await openmic.save();
        return res.status(201).json({
          success: true,
          message: "open mic added"
        })  
  }catch(e){
    console.log(e)
    return res.status(500).json({
      success: false,
      error: e
    })  
  }
  
});  

module.exports = {
  addOpenmic,
};
