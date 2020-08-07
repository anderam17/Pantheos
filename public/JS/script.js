$(document).ready(function () {

  // ------- SEARCH BY TEACHER ----------- 
  $("#teacherSelect").on("change", function (event) {
    const teacherId = $(this).val();
    console.log(teacherId);
    const query = `/api/teacher/${teacherId}`
    console.log(query);

    $("#studentCard").empty();
    $.get(query, (data) => {
      console.log(data);
      for (let i = 0; i < data[0].Students.length; i++) {
        let student = data[0].Students[i];
        let teacher = data[0];
        console.log(student);
        renderStudentCard(teacher, student);
      }
    });

    $("#teacherSelect").val("");
  });

  // ------- SEARCH BY GRADE ----------- 
  $("#gradeSelect").on("change", function (event) {
    const gradeId = $(this).val();
    console.log(gradeId);
    const query = `/api/student/${gradeId}`
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

  // ------- SINGLE STUDENT SEARCH ----------- 
  $("#student").on("change", function (event) {
    const studentId = $(this).val();
    console.log(studentId);
    const query = `/api/studentsearch/${studentId}`;
    console.log(query);
    $("#studentCard").empty();

    $.get(query, (data) => {
      console.log(data);
      const teacher = data.Teacher;
      const student = data;
      renderStudentCard(teacher, student);
    });

    $("#student").val("");
  });

  // ------- FUNCTION TO RENDER STUDENT CARDS ----------- 
  const renderStudentCard = (teacher, student) => {
    $("#studentCard").append(
      `<div data-id= "${student.id}" class="card">
        <div class="card-header">
        Name: ${student.first_name} ${student.last_name}
        </div>
        <div class="card-body">
      <p class="card-text studentGrade">Grade: ${student.grade}</p>
      <p class="card-text teacher">Teacher: ${teacher.first_name} ${teacher.last_name}</p>
      <p class="card-text studentDetention">In Detention?: ${student.detention}</p> 

      <a href="/editstudent.html" class="btn btn-primary" data-id=${student.id} id="edit">Edit</a>
      <a class="btn btn-warning" data-id=${student.id}>Detention</a>
      <a class="btn btn-danger" data-id=${student.id}>Delete</a>
      
      </div>
      </div>`);
  };

  // ------- DELETE STUDENT ----------- 
  $("#studentCard").on("click", "#deleteBtn", function (event) {
    event.preventDefault();

    const studentId = $(this).data("id")

    $.ajax("api/student/" + studentId, {
      type: "DELETE",
      data: studentId
    }).then(answer => {
      $(`[data-id=${studentId}]`).remove();
    });
  });

  // ------- EDIT STUDENT ----------- 
  $("#studentCard").on("click", "#edit", function(event) {
    const studentId = $(this).data("id");
    console.log(studentId);
    const query = `/api/student/${studentId}`;
    // $.get(query, (data) => {});
  });
});
