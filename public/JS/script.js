$(document).ready(function () {
  let grade;
  let studentId;

  const getTeacher = (list) => {
    $.ajax({
      method: "GET",
      url: "/api/teacher"
    }).then(teachers => {
      for (const teacher of teachers) {
        $(list).append(`<option value=${teacher.id}>${teacher.first_name} ${teacher.last_name}</option>`)
      }
    })
  };

  $("#studentModal").on("shown.bs.modal", (event) => {
    getTeacher("#teacher-student");
  });

  

  // ------- SEARCH BY TEACHER ----------- 
  $("#teacher").on("change", function (event) {
    event.stopImmediatePropagation();
    const teacherId = $(this).val();
    console.log(teacherId);
    const query = `/api/teacher/${teacherId}`;
    console.log(query);

    $("#studentCard").empty();
    event.stopImmediatePropagation();
    $.get(query, (data) => {
      console.log(data);
      if (data[0].Students.length) {
        for (let i = 0; i < data[0].Students.length; i++) {
          const student = data[0].Students[i];
          const teacher = data[0];
          console.log(student);
          renderStudentCard(teacher, student);
        }
      } else {
        $("#studentCard").append("<h4>This teacher has no students assigned to them.</h4>");
      }
    });

    $("#teacher").val("");
  });

  // ------- SEARCH BY GRADE ----------- 
  $("#gradeSelect").on("change", function (event) {
    event.stopImmediatePropagation();
    const gradeId = $(this).val();
    console.log(gradeId);
    event.stopImmediatePropagation();
    const query = `/api/student/${gradeId}`;
    console.log(query);
    $("#studentCard").empty();
    $.get(query, (data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const teacher = data[i].Teacher;
        const student = data[i];
        renderStudentCard(teacher, student);

      }
    });

    $("#gradeSelect").val("");
  });

  // ------- SEARCH BY DETENTION STATUS-----------
  $("#detentionSelect").on("change", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const detention = event.target.value;
    const query = `/student/detention/${detention}`;
    $("#studentCard").empty();
    queryStu(query);
    $("#detentionSelect").val("");
  });

  // ------- SINGLE STUDENT SEARCH ----------- 
  $("#stuSearch").on("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const firstName = $("#search-first-name").val().trim();
    const lastName = $("#search-last-name").val().trim();

    if (firstName != "" && lastName != "") {
      $("#studentCard").empty();
      const query = `/student/${firstName}/${lastName}`;
      queryStu(query);
      $("#search-first-name").val("");
      $("#search-last-name").val("");
    } else if (firstName === "" && lastName != "") {
      $("#studentCard").empty();
      const query = `/student/last/${lastName}`;
      queryStu(query);
      $("#search-first-name").val("");
      $("#search-last-name").val("");
    } else if (lastName === "" && firstName != "") {
      $("#studentCard").empty();
      const query = `/student/first/${firstName}`;
      queryStu(query);
      $("#search-first-name").val("");
      $("#search-last-name").val("");
    } else {
      alert("You must enter either a first or last name to search.");
    }
  });

  const queryStu = function (query) {
    $.get(query, (data) => {
      data.forEach((stu) => {
        const student = stu;
        const teacher = stu.Teacher;
        renderStudentCard(teacher, student);
      });
    });
  };

  // ------- FUNCTION TO RENDER STUDENT CARDS ----------- 
  const renderStudentCard = (teacher, student) => {

    if (student.grade === 6) {
      grade = "blue"
    } else if (student.grade === 7) {
      grade = "red"
    } else {
      grade = "eighth"
    }

    $("#studentCard").append(
      `<div data-id= "${student.id}" class="card mt-3 col-md-4">
        <div class="card-header text-center">
        <h5 class="student-name">${student.first_name} ${student.last_name}</h5>
        </div>
        <div class="card-body ${grade}" id="cardBody">
      <p class="card-text studentGrade">Grade: <span class="stuGrade">${student.grade} </span> </p>
      <p class="card-text teacher">Homeroom Teacher: <br> <span class="hrTeacher"> ${teacher.first_name} ${teacher.last_name} </span> </p>
      <p class="card-text studentDetention">Detention: <span class="hasDetention"> ${student.detention? "Yes" : "No"}</span> </p> 
      </div>

      <div class="card-footer mx-auto">
      <div class="btn-group" role="group">

      <button type="button"class="btn darkblue" data-id=${student.id} data-toggle="modal" data-target="#updateModal" id="edit">Edit</button>

      <button type="button" class="btn yellow" data-id=${student.id} data-detention=${student.detention} id="detentionBtn">Detention</button>

      <button type="button" class="btn red" id = "deleteBtn" data-id=${student.id}>Delete</button>
      </div>

      </div>
      </div>`);
  };

  // ------- DELETE STUDENT ----------- 
  $("#studentCard").on("click", "#deleteBtn", function (event) {
    event.preventDefault();
    studentId = $(this).data("id");

    $.ajax("api/student/" + studentId, {
      type: "DELETE",
      data: studentId
    }).then(answer => {
      $(`[data-id=${studentId}]`).remove();
    });
  });

  // ------- TOGGLE DETENTION ----------- 
  $("#studentCard").on("click", "#detentionBtn", function (event) {
    event.preventDefault();

    let studentId = $(this).data("id");
    let hasDetention = $(this).data("detention");

    if (!hasDetention) {
      hasDetention = true
    } else {
      hasDetention = false
    };

    let hasDetentionState = {
      detention: hasDetention
    };

    $.ajax("/api/student/" + studentId, {
      type: "PUT",
      data: hasDetentionState
    }).then(student => {
      $(this).data("detention", hasDetention);

      $(`[data-id=${studentId}] .hasDetention`).text(student.detention ? "Yes" : "No");
    });
  });


  // ------- ADD STUDENT  -----------
  $("#addStudent").on("click", event => {
    event.preventDefault();
    if (!studentFirst.val().trim() || !studentLast.val().trim() || !studentGrade.val() || !teacher.val().trim() || !studentDetention.val().trim()) {
      return;
    }

    const newStudent = {
      first_name: $("#student_first_name").val().trim(),
      last_name: $("#student_last_name").val().trim(),
      grade: $("#grade").val().trim(),
      TeacherId: $("#teacher-student").val().trim(),
      detention: $("#detention").val().trim()
    };

    $.post("/api/student", newStudent)
      .then(data => {
        console.log(data);
      });

    $("#student_first_name").val("");
    $("#student_last_name").val("");
    $("#grade").val("");
    $("#teacher-student").val("");
    $("#detention").val("");
  });

  // ------- ADD TEACHER  -----------
  $("#addTeacher").on("click", event => {

    event.preventDefault();
    if (!studentFirst.val().trim() || !studentLast.val().trim() || !studentGrade.val() || !teacher.val().trim() || !studentDetention.val().trim()) {
      return;
    }

    const newTeacher = {
      first_name: $("#teacher_first_name").val().trim(),
      last_name: $("#teacher_last_name").val().trim(),
      subject: $("#subject").val().trim()
    };

    $.post("/api/teacher", newTeacher)
      .then(data => {
        console.log(data);
        $("#teacher").empty();
        getTeacher("#teacher");
      });

    $("#teacher_first_name").val("");
    $("#teacher_last_name").val("");
    $("#subject").val("");

  });

  // ------- UPDATE STUDENT  -----------
  const studentFirst = $("#update_first_name");
  const studentLast = $("#update_last_name");
  const studentGrade = $("#update_grade");
  const teacher = $("#update-teacher");
  const studentDetention = $("#update-detention");


  const getStudentData = (id) => {
    const queryUrl = "/api/studentsearch/" + id;

    $.get(queryUrl, (student) => {
      const {
        first_name,
        last_name,
        grade,
        detention,
        TeacherId
      } = student;

      studentFirst.val(first_name);
      studentLast.val(last_name);
      studentGrade.val(grade);
      teacher.val(TeacherId);

      if (detention) {
        studentDetention.val("true");
      } else {
          studentDetention.val("false");
      }
    });
  };

  const handleFormSubmit = () => {
    if (!studentFirst.val().trim() || !studentLast.val().trim() || !studentGrade.val() || !teacher.val().trim() || !studentDetention.val().trim()) {
      return;
    }

    const newStudent = {
      first_name: studentFirst.val().trim(),
      last_name: studentLast.val().trim(),
      grade: studentGrade.val(),
      TeacherId: teacher.val(),
      detention: studentDetention.val()
    };

    newStudent.id = studentId;
    updateStudent(newStudent);
  };

  const updateStudent = (student) => {
    $.ajax({
        method: "PUT",
        url: "/api/student/" + studentId,
        data: student
      })
      .then((dbstudent) => {
        console.log(dbstudent);
        const teach = dbstudent.Teacher;
        const stu = dbstudent;
    
        $(`[data-id=${studentId}] .hasDetention`).text(stu.detention ? "Yes" : "No");
        $(`[data-id=${studentId}] .stuGrade`).text(stu.grade);
        $(`[data-id=${studentId}] .student-name`).text(stu.first_name + " " + stu.last_name);
        $(`[data-id=${studentId}] .hrTeacher`).text(teach.first_name + " " + teach.last_name);
        
        if (stu.grade === 6) {
          $(`[data-id=${studentId}] #cardBody`).removeClass().addClass("card-body blue");
        } else if (stu.grade === 7) {
          $(`[data-id=${studentId}] #cardBody`).removeClass().addClass("card-body red");
        } else if (stu.grade === 8) {
          $(`[data-id=${studentId}] #cardBody`).removeClass().addClass("card-body eighth");
        }
      });
  };

  $("#updateModal").on("shown.bs.modal", (event) => {
    $("#update-teacher").empty();
    getTeacher("#update-teacher");
    getStudentData(studentId);
  });

  // ------- EDIT STUDENT CLICK EVENT----------- 

  $("#studentCard").on("click", "#edit", function (event) {
    event.preventDefault();
    studentId = $(this).data("id");
    

    console.log(studentId);
  });

  $("#updateStudent").on("click", (event) => {
    event.preventDefault();
    handleFormSubmit();

  });

  getTeacher("#teacher");
});