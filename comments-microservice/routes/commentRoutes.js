const express = require("express");
const router = express.Router();

const {
  getCommentsByPodcastId,
  addComment,
  updateComment,
  deleteComment,
  replyToComment,
} = require("../controllers/commentController");

router.route("/").post(addComment);
router
  .route("/:id")
  .get(getCommentsByPodcastId)
  .put(updateComment)
  .delete(deleteComment);
router.route("/reply").post(replyToComment);

module.exports = router;
