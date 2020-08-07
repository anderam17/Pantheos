const {
    Student,
    Teacher
} = require("../models");

module.exports = function(app) {

    app.get("/api/student", (req, res) => {
        Student.findAll({
            include: [Teacher]
        }).then((students) => {
            res.json(students);
        }).catch((err) => {
            res.json(err);
        });
    });

    // get students by grade
    app.get("/api/student/:grade", (req, res) => {
        Student.findAll({
            include: [Teacher],
            where: {
                grade: req.params.grade
            }
        }).then((students) => {
            console.log(students);
            res.json(students);
        }).catch((err) => {
            res.json(err);
        });
    });

    // create

    app.post("/api/student", (req, res) => {
        Student.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            grade: req.body.grade,
            TeacherId: req.body.TeacherId,
            detention: req.body.detention
        }).then((student) => {
            res.json(student);
        }).catch((err) => {
            res.json(err);
        });
    });

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

    // update
    app.put("/api/student/:id", (req, res) => {
        Student.update(req.body, {
            include: [Teacher],
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
