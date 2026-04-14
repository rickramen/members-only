require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const authRoutes = require("./routes/authRoutes");

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || "dev_secret",
  resave: false,
  saveUninitialized: false,
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// Make user available in views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h1>Home</h1>
    <p>${req.user ? "Logged in" : "Not logged in"}</p>
  `);
});

// 404
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});