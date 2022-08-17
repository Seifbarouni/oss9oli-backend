const express = require("express");
const podcastRouter = express.Router();
const multer = require("multer");

//setting options for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  getPodcasts,
  getPodcast,
  getPodcastsByChannelId,
  addPodcast,
  updatePodcast,
  deletePodcast,
} = require("../controllers/podcastsController");

podcastRouter.route("/").get(getPodcasts);
podcastRouter.post("/", upload.single("file"), addPodcast);
podcastRouter.put("/:id", upload.single("file"), updatePodcast);
podcastRouter.route("/:id").get(getPodcast).delete(deletePodcast);
podcastRouter.route("/channel/:id").get(getPodcastsByChannelId);

module.exports = podcastRouter;
