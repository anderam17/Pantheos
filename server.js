// * DEPENDENCIES/set up express app
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// * ROUTES
require("./routes/html-routes.js")(app);
require("./routes/teacher-api-routes.js")(app);
require("./routes/student-api-routes.js")(app);

// * SYNC SEQUELIZE

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });