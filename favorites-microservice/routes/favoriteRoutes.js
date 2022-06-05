const express = require("express");
const router = express.Router();

const {
  getFavoriteByUserId,
  addFavorite,
  deleteFavorite,
} = require("../controllers/favoriteController");

router.route("/:id").get(getFavoriteByUserId).delete(deleteFavorite);
router.route("/").post(addFavorite);

module.exports = router;
