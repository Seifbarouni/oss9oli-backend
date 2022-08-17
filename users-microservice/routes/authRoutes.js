const express = require("express");
const router = express.Router();

const {
  authenticateUserGoogle,
  authenticateUserFacebook,
} = require("../controllers/authController");

router.route("/auth/google").get(authenticateUserGoogle);
router.route("/auth/facebook").get(authenticateUserFacebook);

module.exports = router;
