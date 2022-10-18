const express = require("express");
const episodesRouter = express.Router();

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
  getEpisodes,
  addEpisode,
  updateEpisode,
  deleteEpisode,
  getEpisode,
  getEpisodesByPodcastId,
  getEpisodesByUser,
} = require("../controllers/episodesController");

episodesRouter.get("/user", [verifyToken, decodeToken], getEpisodesByUser);
episodesRouter.route("/").get(getEpisodes);
episodesRouter.post("/", [upload, verifyToken, decodeToken], addEpisode);
episodesRouter.put("/:id", upload, updateEpisode);
episodesRouter.route("/:id/:userId").get(getEpisode);
episodesRouter.route("/:id").delete(deleteEpisode);
episodesRouter.get("/podcast/find/:id", getEpisodesByPodcastId);

module.exports = episodesRouter;
