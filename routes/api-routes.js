const express = require("express");

const router = express.Router();

const db = require("../models");

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

module.exports = router;
