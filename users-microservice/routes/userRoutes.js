const express = require("express");
const router = express.Router();

const {
  authenticateUserGoogle,
  authenticateUserFacebook,
  updateUser,
} = require("../controllers/userController");

router.route("/auth/google").post(authenticateUserGoogle);
router.route("/auth/facebook").post(authenticateUserFacebook);
router.route("/:id").post(updateUser);

module.exports = router;
