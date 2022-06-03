const express = require("express");
const channelRouter = express.Router();

const {
  getChannels,
  getChannelByUserId,
  addChannel,
  updateChannel,
  deleteChannel,
} = require("../controllers/channelsController");

channelRouter.route("/").get(getChannels).post(addChannel);
channelRouter
  .route("/:id")
  .get(getChannelByUserId)
  .put(updateChannel)
  .delete(deleteChannel);

module.exports = channelRouter;
