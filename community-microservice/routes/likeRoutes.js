const express = require("express");
const router = express.Router();

const {
  likePost,
} = require("../controllers/likeController");

const {
  verifyToken,
  decodeToken
} = require("../middleware/auth");


router.put("/:postId", [verifyToken, decodeToken],likePost)

module.exports = router;
