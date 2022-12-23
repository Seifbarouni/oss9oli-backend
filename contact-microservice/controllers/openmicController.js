const asyncHandler = require("express-async-handler");
const Openmic = require("../models/openmicModel");
const fs = require("fs");

const mm = require("musicmetadata");
const addOpenmic = asyncHandler(async (req, res) => {
  try{
    mm(
      fs.createReadStream(req.file.path),
      { duration: true },
      async function (err, metadata) {
        if (err) throw err;
        let openmic = new Openmic({...req.body, file: req.file.path, userId: req.body.payload.userId});
        await openmic.save();
        return res.status(201).json({
          success: true,
          message: "open mic added"
        })
      }
    );
    
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
