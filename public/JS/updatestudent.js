$(document).ready(function () {
  const studentFirst = $("#first_name");
  const studentLast = $("#last_name");
  const studentGrade = $("#grade");
  const teacher = $("#teacher");
  const studentDetention = $("#detention");

  const url = window.location.search;
  let studentId;

  function handleFormSubmit () {
    if (!studentFirst.val().trim() || !studentLast.val().trim() || !studentGrade.val() || !teacher.val().trim() || !studentDetention.val().trim()) {
      return;
    }

    const newStudent = {
      first_name: $("#first_name").val().trim(),
      last_name: $("#last_name").val().trim(),
      grade: $("#grade").val(),
      TeacherId: $("#teacher").val(),
      detention: $("#detention").val()
    };

    newStudent.id = studentId;
    updateStudent(newStudent);
  }

  const getStudentData = (id) => {
    const queryUrl = "/api/studentsearch/" + id;

    $.get(queryUrl, (student) => {
      console.log(student);
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
        (
          studentDetention.val("false")
        );
      }
    });
  };

  const updateStudent = (student) => {
    $.ajax({
      method: "PUT",
      url: "/api/student/" + studentId,
      data: student
    })
      .then(function () {
        window.location.href = "/";
      });
  };

  if (url.indexOf("?student_id=") !== -1) {
    studentId = url.split("=")[1];
    // getTeachers();
    getStudentData(studentId);
  }

  $("#updateStudent").on("click", "#add-btn", (event) => {
    event.preventDefault();
    handleFormSubmit();
  });
});
