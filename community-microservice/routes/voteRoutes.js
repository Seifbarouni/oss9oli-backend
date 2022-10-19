const express = require("express");
const router = express.Router();

const {
  Voter
} = require("../controllers/voteController");

router.post("/", Voter)

module.exports = router;
