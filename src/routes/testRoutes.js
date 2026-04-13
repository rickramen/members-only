const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send("DB error");
  }
});

module.exports = router;