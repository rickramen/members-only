// controllers/messageController.js

const pool = require("../db/pool");

// GET form
exports.getNewMessage = (req, res) => {
  res.render("newMessage");
};

// POST create message
exports.postNewMessage = async (req, res) => {
  const { title, text } = req.body;

  try {
    await pool.query(
      `
      INSERT INTO messages (title, text, user_id)
      VALUES ($1, $2, $3)
      `,
      [title, text, req.user.id]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error creating message");
  }
};