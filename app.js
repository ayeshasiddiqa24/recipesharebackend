const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(cors());
app.options('*', cors()); // Handle preflight requests
app.use(express.json());
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For URL-encoded form submissions

require("./routes/auth.routes")(app);
require("./routes/recipe.routes")(app);

// Sync DB
db.sequelize.sync().then(() => {
  console.log("Synced db.");
});

module.exports = app;
