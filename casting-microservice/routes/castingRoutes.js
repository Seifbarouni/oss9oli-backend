const express = require("express");
const router = express.Router();

const {
  getCastings,
  getCasting,
  addCasting,
  updateCasting,
  deleteCasting,
} = require("../controllers/castingController");

router.route("/").get(getCastings).post(addCasting);
router
  .route("/:id")
  .get(getCasting)
  .put(updateCasting)
  .delete(deleteCasting);

module.exports = router;
