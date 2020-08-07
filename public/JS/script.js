$(document).ready(function() {
  $("#teacherSelect").on("change", function(event) {
    const teacherId = $(this).val();
    console.log(teacherId);
    const query = `/api/teacher/${teacherId}`
    console.log(query);
    
    
    $.get(query, (data) => {
      console.log(data);
    });
  });
});