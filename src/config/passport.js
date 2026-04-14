const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("../db/pool");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
          );

          const user = result.rows[0];

          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const isMatch = await bcrypt.compare(
            password,
            user.password_hash
          );

          if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );

      done(null, result.rows[0]);
    } catch (err) {
      done(err);
    }
  });
};