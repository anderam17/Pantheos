var { Teacher, Student } = require("../models");

module.exports = function (app) {
// ------- LOAD INDEX/GENERATE TEACHER DROPDOWN----------- 
  app.get("/", (req, res) => {
    Teacher.findAll({
      raw: true
    }).then((teachers) => {
      const hbsObject = {
        teachers: teachers
      };
      res.render("index", hbsObject);
    }).catch((err) => {
      res.json(err);
    });
  });

  // ------- FIND ALL TEACHERS ----------- 
  app.get("/api/teacher", (req, res) => {
    Teacher.findAll({
      include: [Student]
    }).then((teachers) => {
      res.json(teachers);
    }).catch((err) => {
      res.json(err);
    });
  });

  // ------- FIND TEACHER BY ID ----------- 
  app.get("/api/teacher/:id", (req, res) => {
    Teacher.findAll({
      include: [Student],
      where: {
        id: req.params.id
      }
    }).then((dbTeacher) => {
      res.json(dbTeacher);
    }).catch((err) => {
      res.json(err);
    });
  });

  // ------- CREATE TEACHER ----------- 
  app.post("/api/teacher", (req, res) => {
    Teacher.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      subject: req.body.subject
    }).then((teacher) => {
      res.json(teacher);
    }).catch((err) => {
      res.json(err);
    });
  });

  // ------- DELETE TEACHER ----------- 
  app.delete("/api/teacher/:id", (req, res) => {
    Teacher.destroy({
      include: [Student],
      where: {
        id: req.params.id
      }
    }).then((teachers) => {
      res.json(teachers);
    }).catch((err) => {
      res.json(err);
    });
  });

  // update maybe later
};
