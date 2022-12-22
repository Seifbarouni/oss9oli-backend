const express = require("express");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const { verifyToken, decodeToken } = require("../middleware/auth");

//setting options for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./openmic/");
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomUUID() + file.originalname);
  },
});const upload = multer({ storage: storage }).single("file");

const {
  addOpenmic
} = require("../controllers/openmicController");

router.post("/", [upload, verifyToken, decodeToken] , addOpenmic)

module.exports = router;
