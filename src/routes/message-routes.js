const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message-controller");
const { ensureAuthenticated } = require("../middleware/auth-middleware");

// routes
router.get("/new", ensureAuthenticated, messageController.getNewMessage);
router.post("/new", ensureAuthenticated, messageController.postNewMessage);

module.exports = router;