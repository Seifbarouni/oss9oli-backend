const express = require("express");
const podcastRouter = express.Router();
const { verifyToken, decodeToken } = require("../middleware/auth");

const {
  getPodcasts,
  getPodcast,
  getPodcastsByChannelId,
  addPodcast,
  updatePodcast,
  deletePodcast,
  getPodcastsByUser,
} = require("../controllers/podcastsController");

podcastRouter.route("/").get(getPodcasts).post(addPodcast);
podcastRouter.get("/user", [verifyToken, decodeToken], getPodcastsByUser);
podcastRouter
  .route("/:id")
  .get(getPodcast)
  .put(updatePodcast)
  .delete(deletePodcast);
  podcastRouter.route("/channel/:id").get(getPodcastsByChannelId);

module.exports = podcastRouter;
