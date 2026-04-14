const bcrypt = require("bcrypt");
const pool = require("../db/pool");
const { validationResult } = require("express-validator");

// GET signup page
exports.getSignup = (req, res) => {
  res.render("signup", { 
    errors: [],
    oldInput: {}, 
  });
};

// POST signup
exports.postSignup = async (req, res) => {
  const errors = validationResult(req);

  // Handle validation errors
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const { firstName, lastName, email, password } = req.body;

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