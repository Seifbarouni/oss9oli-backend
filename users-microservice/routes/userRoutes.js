const express = require("express");
const router = express.Router();
const multer = require("multer");

const { verifyToken, verifyProperty } = require("../middlewares/auth");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");


const {
  updateUser,
  getUserUploadedImage
} = require("../controllers/userController");


router.get("/image",[verifyToken, verifyProperty],getUserUploadedImage);
router.post("/",[upload,verifyToken, verifyProperty],updateUser);

module.exports = router;
