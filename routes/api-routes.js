const express = require("express");

const router = express.Router();

const db = require("../models");

const passport = require("../config/passport");

router.get("/", (req, res) => {
  res.render("pug");
});

router.get("/api/blog", (req, res) => {
  db.Blog.findAll({}).then((dbBlog) => res.json(dbBlog));
});

router.get("/api/blog/category/:category", (req, res) => {
  db.Blog.findAll({
    where: {
      category: req.params.category,
    },
  }).then((dbBlog) => {
    res.json(dbBlog);
  });
});

router.get("/api/blog/user/:user", (req, res) => {
  db.Blog.findAll({
    where: {
      category: req.params.user,
    },
  }).then((dbBlog) => {
    res.json(dbBlog);
  });
});

router.post("/api/blog", (req, res) => {
  db.Blog.create({
    username: req.body.username,
    title: req.body.title,
    body: req.body.body,
    category: req.body.category,
  }).then((dbBlog) => res.json(dbBlog));
});

router.delete("/api/blog/:id", (req, res) => {
  db.Blog.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.send("Successfully Deleted"));
});

router.patch("/api/blog", (req, res) => {
  db.Blog.update(
    {
      body: req.body.body,
    },
    {
      where: { id: req.body.id },
    }
  ).then(() => res.send("Successfully Updated"));
});

// Routes related to login credentials
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page, leave them logged in, and every blog post or any post should have their user id associated with it.
// Otherwise the blog posts will not have a user id associated with it.
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  res.json(req.user);
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function(req, res) {
  db.User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(function() {
      res.redirect(307, "/api/login");
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({status: "not logged in"});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;
