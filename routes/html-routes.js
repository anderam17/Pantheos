const path = require("path");

module.exports = function (app) {
  app.get("/student", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/addstudent.html"));
  });

  app.get("/editstudent", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/editstudent.html"));
  });
  app.get("/teacher", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/addteacher.html"));
  });
};
