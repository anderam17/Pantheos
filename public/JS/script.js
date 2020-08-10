$(document).ready(function () {
  $("#teacherSelect").on("change", function (event) {
    const teacherId = $(this).val();
    console.log(teacherId);
    const query = `/api/teacher/${teacherId}`;
    console.log(query);

    $("#studentCard").empty();
    $.get(query, (data) => {
      console.log(data);
      for (let i = 0; i < data[0].Students.length; i++) {
        const student = data[0].Students[i];
        const teacher = data[0];
        console.log(student);
        renderStudentCard(teacher, student);
      }
    });

    $("#teacherSelect").val("");
  });

  $("#gradeSelect").on("change", function (event) {
    const gradeId = $(this).val();
    console.log(gradeId);
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

  // when you search 1 student
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

  const renderStudentCard = (teacher, student) => {
    $("#studentCard").append(
      `<div data-id= "${student.id}" class="card" style="margin-top: 20px">
        <div class="card-header">
        Name: ${student.first_name} ${student.last_name}
        </div>
        <div class="card-body">
      <p class="card-text studentGrade">Grade: ${student.grade}</p>
      <p class="card-text teacher">Homeroom Teacher: ${teacher.first_name} ${teacher.last_name}</p>
      <p class="card-text studentDetention">Has Detention?: ${student.detention}</p> 

      <a href="/update.html" class="btn btn-primary" data-id=${student.id} id="edit">Edit</a>
      <a class="btn btn-warning" data-id=${student.id}>Detention</a>
      <a class="btn btn-danger" data-id=${student.id} id= "deleteBtn">Delete</a>
      
      </div>
      </div>`);
  };

  $("#studentCard").on("click", "#deleteBtn", function (event) {
    event.preventDefault();
    const studentId = $(this).data("id");

    $.ajax("api/student/" + studentId, {
      type: "DELETE",
      data: studentId
    }).then(answer => {
      $(`[data-id=${studentId}]`).remove();
    });
  });

  $("#edit").on("click", function (data) {
    const studentId = $(this).val();
    const query = `/api/student/${studentId}`;

    $.get(query, (data) => {
      console.log(data);
    });
  });

  // add clear functions
});
