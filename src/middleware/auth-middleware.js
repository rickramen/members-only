// authMiddleware.js

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

exports.ensureMember = (req, res, next) => {
  if (req.user && req.user.is_member) return next();
  res.status(403).send("Members only");
};

exports.ensureAdmin = (req, res, next) => {
  if (req.user && req.user.is_admin) return next();
  res.status(403).send("Admins only");
};