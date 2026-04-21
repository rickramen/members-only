const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth-controller");
const { validateSignup } = require("../validators/auth-validator");

// GET signup page
router.get("/signup", authController.getSignup);
// POST signup form
router.post("/signup", validateSignup, authController.postSignup);

// GET login page
router.get("/login", authController.getLogin);
// POST login
router.post("/login", authController.postLogin);

// GET logout
router.get("/logout", authController.logout);

module.exports = router;