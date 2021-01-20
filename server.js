// Use Express
const express = require("express");
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

// Import routes and give the server access to them.
const routes = require("./routes/api-routes.js");
app.use("/", routes);

// Static directory
app.use(express.static("public"));

// // Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));
});
