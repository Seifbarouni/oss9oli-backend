const express = require("express");
const showRouter = express.Router();

const {
  getShowsByChannelId,
  getShowById,
  addShow,
  updateShow,
} = require("../controllers/showsController");

showRouter.route("/").post(addShow);
showRouter.route("/:id").get(getShowById).put(updateShow);
showRouter.route("/channel/:channelId").get(getShowsByChannelId);

module.exports = showRouter;
