// Requiring path to so we can use relative routes to our HTML files
const express = require("express");
const router = express.Router();

// Requiring our custom middleware for checking if a user is logged in
var authenticated = require("../config/middleware/authenticated");

// Rendering home page on launch
router.get("/", (req, res) => {
  res.render("index", {});
});

// Rendering sign-in page
router.get("/signin", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  // res.sendFile(path.join(__dirname, "../public/signup.html"));
  res.render("accounts");
});

router.get("/signup", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.render("signup");
});

// Here we've add our authenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/members", authenticated, function(req, res) {
  res.render("members");
});

module.exports = router;
