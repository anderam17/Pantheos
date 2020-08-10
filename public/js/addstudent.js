$("#add-btn").on("click", event => {
  event.preventDefault();

  const newStudent = {
    first_name: $("#first_name").val().trim(),
    last_name: $("#last_name").val().trim(),
    grade: $("#grade").val().trim(),
    TeacherId: $("#teacher").val().trim(),
    detention: $("#detention").val().trim()
  };

  $.post("/api/student", newStudent)
    .then(data => {
      console.log(data);
      alert("Student has been added");
    });

  $("#first_name").val("");
  $("#last_name").val("");
  $("#grade").val("");
  $("#teacher").val("");
  $("#detention").val("");
});
