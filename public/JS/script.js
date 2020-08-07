$(document).ready(function () {
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

  $("#stuSearch").on("click", function (event) {
    event.preventDefault();


  })

  const renderStudentCard = (teacher, student) => {

    $("#studentCard").append(
      `<div class="card">
        <div class="card-header">
        Name: ${student.first_name} ${student.last_name}
        </div>
        <div class="card-body">
      <p class="card-text studentGrade">Grade: ${student.grade}</p>
      <p class="card-text teacher">Teacher: ${teacher.first_name} ${teacher.last_name}</p>
      <p class="card-text studentDetention">In Detention?: ${student.detention}</p> 

      <a href="#" class="btn btn-primary">Edit</a>
      <a href="#" class="btn btn-warning">Detention</a>
      <a href="#" class="btn btn-danger">Delete</a>
      
      </div>
      </div>`);
  }

  // add clear functions

});
