// messageController.js

const pool = require("../db/pool");

// GET form
exports.getNewMessage = (req, res) => {
  res.render("new-message");
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

exports.deleteMessage = async (req, res) => {
  const messageId = req.params.id;

  try {
    await pool.query(
      "DELETE FROM messages WHERE id = $1",
      [messageId]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error deleting message");
  }
};