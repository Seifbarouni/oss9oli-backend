const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyProperty,
  decodeToken,
} = require("../middlewares/auth");

const {
  updateUser,
  getUserCustomSeed,
} = require("../controllers/userController");

router.get("/seed", [verifyToken, decodeToken], getUserCustomSeed);
router.post("/:id", [verifyToken, verifyProperty, decodeToken], updateUser);

module.exports = router;
