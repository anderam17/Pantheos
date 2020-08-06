const path = require("path");

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/main.html"));
    });
    app.get("/student", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/addstudent.html"));
    });
    app.get("/teacher", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/addteacher.html"));
    })
};