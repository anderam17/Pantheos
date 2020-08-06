var { Teacher }= require("../models"); 

module.exports = function(app) {
//* get works
app.get("/api/teachers", (req, res) => {
   Teacher.findAll().then((teachers) => {
    if (err) throw err;
    res.json(teachers);
}).catch((err) => {
    res.json(err);
});
});

//create
app.post("/api/teachers", (req,res) => {
    Teacher.create({
        first_name: req.first_name,
        last_name: req.last_name,
        subject: req.subject
    }).then((teacher) => {
        res.json(teacher);
    }).catch((err) => {
        res.json(err);
    });
});

//delete
app.delete("/api/teachers/:id", (req, res) => {
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



