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

    req.session.message = "Account created successfully. Please log in.";
    res.redirect("/auth/login");

  } catch (err) {
    // handle existing email
    if (err.code === "23505") {
      return res.status(400).render("signup", {
        errors: [{ msg: "Email already in use" }],
        oldInput: req.body,
      });
    }

    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.redirect("/auth/login");
    });
  });
};