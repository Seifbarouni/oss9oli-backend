const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  verifyToken,
  verifyProperty,
  decodeToken,
} = require("../middlewares/auth");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

const {
  updateUser,
  getUserUploadedImage,
} = require("../controllers/userController");

router.get("/image", [verifyToken, decodeToken], getUserUploadedImage);
router.post(
  "/:id",
  [upload, verifyToken, verifyProperty, decodeToken],
  updateUser
);

module.exports = router;
