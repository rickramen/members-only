const pool = require("../db/pool");

// GET /join-club
exports.getJoinClub = (req, res) => {
  res.render("join-club", {
    error: null
  });
};

// POST /join-club
exports.postJoinClub = async (req, res) => {
  const { passcode } = req.body;

  try {
    // check secret code
    if (passcode !== process.env.CLUB_CODE) {
      return res.render("join-club", {
        error: "Wrong passcode"
      });
    }

    // update user in DB
    await pool.query(
      "UPDATE users SET is_member = true WHERE id = $1",
      [req.user.id]
    );

    res.redirect("/");

  } catch (err) {
    console.error(err);
    res.send("Error joining club");
  }
};