// homeController.js

const pool = require("../db/pool");

exports.getHome = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT messages.*, users.first_name, users.last_name
      FROM messages
      JOIN users ON messages.user_id = users.id
      ORDER BY messages.created_at DESC
    `);

    res.render("index", {
      messages: result.rows
    });

  } catch (err) {
    console.error(err);
    res.send("Error loading homepage");
  }
};