// routes/messageRoutes.js

const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

// routes
router.get("/new", ensureAuthenticated, messageController.getNewMessage);
router.post("/new", ensureAuthenticated, messageController.postNewMessage);

module.exports = router;