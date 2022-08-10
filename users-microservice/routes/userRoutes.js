const express = require("express");
const router = express.Router();
const { verifyToken, verifyProperty } = require("../middlewares/auth");

const {
  updateUser,
} = require("../controllers/userController");


router.post("/:id",[verifyToken, verifyProperty],updateUser);

module.exports = router;
