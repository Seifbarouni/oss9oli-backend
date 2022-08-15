const express = require("express");
const channelRouter = express.Router();
const multer = require("multer");

//setting options for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  getChannels,
  getChannelByUserId,
  addChannel,
  updateChannel,
  deleteChannel,
} = require("../controllers/channelsController");

channelRouter.get("/", getChannels);
channelRouter.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  addChannel
);
channelRouter.route("/:id").get(getChannelByUserId).delete(deleteChannel);
channelRouter.put("/:id", updateChannel);

module.exports = channelRouter;
