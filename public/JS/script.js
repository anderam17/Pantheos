$(document).ready(function () {
  $("addStudent").on("click", (event) => {
    window.location.href = "/student";
  });

  // ------- SEARCH BY TEACHER -----------
  $("#teacherSelect").on("change", function (event) {
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
          let grade= $(".studentGrade").data("grade");
          console.log(grade);
          gradeClass(grade);
        }
      } else {
        $("#studentCard").append("<h4>This teacher has no students assigned to them.</h4>");
      }
    });

    $("#teacherSelect").val("");
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

    $("#studentCard").append(
      `<div data-id= "${student.id}" class="card mt-3">
        <div class="card-header">
        <h5>Student: ${student.first_name} ${student.last_name}</h5>
        </div>
        <div class="card-body" id="cardBody">
      <p class="card-text studentGrade" data-grade=${student.grade}>Grade: ${student.grade}</p>
      <p class="card-text teacher">Teacher: ${teacher.first_name} ${teacher.last_name}</p>
      <p class="card-text studentDetention"> Detention: ${student.detention? "Yes" : "No"}</p> 

      <a class="btn btn-primary" data-id=${student.id} id="edit">Edit</a>
      <a class="btn btn-warning" data-id=${student.id} data-detention=${student.detention} id="detentionBtn" >Detention</a>
      <a class="btn btn-danger" id = "deleteBtn" data-id=${student.id}>Delete</a>
      
      </div>
      </div>`);
      
  };

  // ------- DELETE STUDENT -----------
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

  // ------- EDIT STUDENT CLICK EVENT-----------

  $("#studentCard").on("click", "#edit", function (event) {
    const studentId = $(this).data("id");
    console.log(studentId);
    window.location.href = "/editstudent?student_id=" + studentId;
  });

  // ------- HAS DETENTION ----------- 
  $("#studentCard").on("click", "#detentionBtn", function (event) {
    event.preventDefault();

    let studentId = $(this).data("id");
    let hasDetention = $(this).data("detention");
    console.log(hasDetention);

   if (!hasDetention) {
     hasDetention = true
   } else {
     hasDetention = false
   };
   console.log(hasDetention);

   let hasDetentionState = {
     detention: hasDetention
   };

    $.ajax("api/student/" + studentId, {
      type: "PUT",
      data: hasDetentionState
    }).then(answer => {
      // $(`[data-id=${studentId}]`).update();
    });
  });

  const gradeClass = () => {
    if (grade === 6) {
      $("#cardBody").addClass("sixth")
    } else if (grade === 7) {
      $("#cardBody").addClass("seventh")
    } else {
      $("#cardBody").addClass("eighth")
    }

  }
 
});
