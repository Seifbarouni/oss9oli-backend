const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");



const addContact = asyncHandler(async (req, res) => {
  try{
    const contact = new Contact(req.body);
    await contact.save();
    return res.status(200).json({
      success: true,
      message: "message sent"
    })  
  }catch(e){
    return res.status(500).json({
      success: false,
      error: e
    })  
  }
  
});

const getContacts = asyncHandler(async (req, res) => {
  try{
    let contacts = await Contact.find();
    return res.status(200).json({
      success: true,
      data: {
        contacts
      }
    })  
  }catch(e){
    return res.status(500).json({
      success: false,
      error: e
    })  
  }
  
});

module.exports = {
  addContact,
  getContacts
};
