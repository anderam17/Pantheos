const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));

app.set("view engine", "handlebars");

// * ROUTES
require("./routes/html-routes")(app);
require("./routes/teacher-api-routes")(app);
require("./routes/student-api-routes")(app);

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
