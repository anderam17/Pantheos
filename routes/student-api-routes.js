var {Student} = require("../models/student.js"); 

module.exports = function(app) {

    //get
    app.get("/api/student", (req, res) => {
        Student.findAll().then((students) => {
            if (err) throw err;
            res.json(students);
        }).catch((err) => {
            res.json(err);
        });
    });
    //create

    app.post("/api/student", (req, res) => {
        Student.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            grade: req.body.grade,
            detention: req.detention
        }).then((student) => {
            res.json(student);
        }).catch((err) => {
            res.json(err);
        });
    });
    //delete
    app.delete("/api/student/:id", (req, res) => {
        Student.destroy({
            where: {
                id: req.params.id
            }
        }).then((students) => {
        res.json(students);
    }).catch((err) => {
        res.json(err);
    });
    });

    //update
    app.put("/api/student/:id", (req, res) => {
        Student.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then((students) => {
            res.json(students);
        }).catch((err) => {
            res.json(err);
        });
    });
};

