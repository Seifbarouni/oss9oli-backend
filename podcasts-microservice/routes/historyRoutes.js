const express = require("express");
const historyRouter = express.Router();

const { verifyToken, decodeToken } = require("../middleware/auth");

const { getHistoryByUser } = require("../controllers/historyController");

historyRouter.get("/:userId", [verifyToken, decodeToken], getHistoryByUser);

module.exports = historyRouter;
