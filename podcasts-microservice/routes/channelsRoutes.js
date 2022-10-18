const express = require("express");
const channelRouter = express.Router();
const multer = require("multer");
const { verifyToken, decodeToken } = require("../middleware/auth");

//setting options for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

const {
  getChannels,
  getChannelByUserId,
  getChannelById,
  addChannel,
  updateChannel,
  deleteChannel,
} = require("../controllers/channelsController");

channelRouter.get("/", getChannels);
channelRouter.get("/:id", getChannelById);
channelRouter.post("/", upload, addChannel);
channelRouter.route("/:id").delete(deleteChannel);
channelRouter.get("/chan/get", [verifyToken, decodeToken], getChannelByUserId);
channelRouter.put("/me", [upload, verifyToken, decodeToken], updateChannel);

module.exports = channelRouter;
