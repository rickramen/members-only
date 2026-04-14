const express = require("express");
const router = express.Router();

const memberController = require("../controllers/member-controller");
const { ensureAuthenticated } = require("../middleware/auth-middleware");

router.get("/join-club", ensureAuthenticated, memberController.getJoinClub);

router.post("/join-club", ensureAuthenticated, memberController.postJoinClub);

module.exports = router;