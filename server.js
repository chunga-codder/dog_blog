require('dotenv').config();

// Use Express
const express = require("express");
const session = require("express-session");

// Requiring passport as we've configured it
const passport = require("./config/passport");

const app = express(); // don't need to require pug (built into Express somehow?);
// // Requiring our models for syncing
const db = require("./models");
// Set Port
const PORT = process.env.PORT || 8080;

// Use Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "magic word", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Import routes and give the server access to them.
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");
app.use("/", htmlRoutes);
app.use(apiRoutes);

// // Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));
});
