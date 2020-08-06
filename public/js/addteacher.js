$("#add-btn").on("click", event => {
    event.preventDefault();

    const newTeacher = {
      first_name: $("#first_name").val().trim(),
      last_name: $("#last_name").val().trim(),
      subject: $("#subject").val().trim()
    };
  
  $.post("/api/teacher", newTeacher)
    .then(data => {
      console.log(data);
      alert("Teacher has been added");
    });

  $("#first_name").val("");
  $("#last_name").val("");
  $("#subject").val("");

});
  