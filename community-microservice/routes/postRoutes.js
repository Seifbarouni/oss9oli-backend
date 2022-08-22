const express = require("express");
const router = express.Router();

const {
  getPosts,
  addPost,
} = require("../controllers/postController");

router.route("/").post(addPost).get(getPosts)

module.exports = router;
