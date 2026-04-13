const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// show signup
router.get("/signup", authController.getSignup);

// handle signup
router.post("/signup", authController.postSignup);

module.exports = router;