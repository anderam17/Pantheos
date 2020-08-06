var { Teacher }= require("../models"); 

module.exports = function(app) {
//* get works
app.get("/api/teacher", (req, res) => {
   Teacher.findAll().then((teachers) => {
    if (err) throw err;
    res.json(teachers);
}).catch((err) => {
    res.json(err);
});
});

//create
app.post("/api/teacher", (req,res) => {
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

//delete
app.delete("/api/teacher/:id", (req, res) => {
    Teacher.destroy({
        where: {
            id: req.params.id
        }
    }).then((teachers) => {
        res.json(teachers);
    }).catch((err) => {
        res.json(err);
    });
});

//update maybe later
};



