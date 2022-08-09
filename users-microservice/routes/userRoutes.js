const express = require("express");
const router = express.Router();

const {
  updateUser,
} = require("../controllers/userController");


router.route("/:id").post(updateUser);

module.exports = router;
