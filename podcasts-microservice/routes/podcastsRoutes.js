const express = require("express");
const podcastRouter = express.Router();

const {
  getPodcasts,
  getPodcast,
  getPodcastsByShowId,
  addPodcast,
  updatePodcast,
  deletePodcast,
} = require("../controllers/podcastsController");

podcastRouter.route("/").get(getPodcasts).post(addPodcast);
podcastRouter
  .route("/:id")
  .get(getPodcast)
  .put(updatePodcast)
  .delete(deletePodcast);
podcastRouter.route("/channel/:id").get(getPodcastsByShowId);

module.exports = podcastRouter;
