const express = require("express");
const router = express.Router();

const {
  addContact,
  getContacts
} = require("../controllers/contactController");

router.route("/").post(addContact);
router.route("/").get(getContacts);

module.exports = router;
