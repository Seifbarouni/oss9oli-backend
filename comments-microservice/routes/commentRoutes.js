const express = require("express");
const router = express.Router();

const {
  getCommentsByPodcastId,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

router.route("/").post(addComment);
router
  .route("/:id")
  .get(getCommentsByPodcastId)
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
