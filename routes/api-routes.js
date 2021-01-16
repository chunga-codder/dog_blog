app.get("/", (req, res) => {
  res.render("pug", { title: "Hey", message: "Hello there!" });
});
