const bcrypt = require("bcrypt");
const pool = require("../db/pool");

// GET /signup
exports.getSignup = (req, res) => {
  res.render("signup");
};

// POST /signup
exports.postSignup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // validation
  if (password !== confirmPassword) {
    return res.send("Passwords do not match");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `
      INSERT INTO users (first_name, last_name, email, password_hash)
      VALUES ($1, $2, $3, $4)
      `,
      [firstName, lastName, email, hashedPassword]
    );

    res.send("User created successfully!");
  } catch (err) {
    console.error(err);
    res.send("Error creating user");
  }
};