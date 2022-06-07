const express = require("express");
const router = express.Router();

const {
  getWatchlaterListByUserId,
  getWatchlaterById,
  createWatchlater,
  addPodcastToWatchlater,
  removePodcastFromWatchlater,
} = require("../controllers/watchlaterController");

router.route("/user/:userId").get(getWatchlaterListByUserId);
router
  .route("/:id")
  .get(getWatchlaterById)
  .put(addPodcastToWatchlater)
  .delete(removePodcastFromWatchlater);
router.post("/", createWatchlater);

module.exports = router;
