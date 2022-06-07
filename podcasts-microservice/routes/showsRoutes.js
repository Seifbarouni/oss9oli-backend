const express = require("express");
const showRouter = express.Router();
const multer = require("multer");

//setting options for multer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const {
  getShowsByChannelId,
  getShowById,
  addShow,
  updateShow,
} = require("../controllers/showsController");

showRouter.post("/", upload.fields([{ name: "image", maxCount: 1 }]), addShow);
showRouter.route("/:id").get(getShowById);
showRouter.put("/:id", updateShow);
showRouter.route("/channel/:channelId").get(getShowsByChannelId);

module.exports = showRouter;
