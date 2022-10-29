const express = require("express");
const router = express.Router();

const {
  likePost,
  dislikePost
} = require("../controllers/likeController");

const {
  verifyToken,
  decodeToken
} = require("../middleware/auth");


router.put("/like/:postId", [verifyToken, decodeToken],likePost)
router.put("/dislike/:postId", [verifyToken, decodeToken],dislikePost)

module.exports = router;
