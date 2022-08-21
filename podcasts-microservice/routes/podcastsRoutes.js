const express = require("express");
const podcastRouter = express.Router();

const { verifyToken, decodeToken } = require("../middleware/auth");

const multer = require("multer");
const crypto = require("crypto");

//setting options for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./pods/");
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomUUID() + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");


const {
  getPodcasts,
  getPodcast,
  getPodcastsByChannelId,
  addPodcast,
  updatePodcast,
  deletePodcast,
  getPodcastsByUser,
} = require("../controllers/podcastsController");


podcastRouter.get("/user", [verifyToken, decodeToken], getPodcastsByUser);
podcastRouter.route("/").get(getPodcasts);
podcastRouter.post("/", [upload, verifyToken, decodeToken], addPodcast);
podcastRouter.put("/:id", upload, updatePodcast);
podcastRouter.route("/:id").get(getPodcast).delete(deletePodcast);
podcastRouter.route("/channel/:id").get(getPodcastsByChannelId);


module.exports = podcastRouter;
