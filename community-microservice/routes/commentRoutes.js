const express = require("express");
const router = express.Router();

const {
  addComment, getComments,
} = require("../controllers/commentController");

const {
  verifyToken,
  decodeToken
} = require("../middleware/auth");


router.post("/", [verifyToken, decodeToken],addComment)
router.get("/:postId",getComments)

module.exports = router;
