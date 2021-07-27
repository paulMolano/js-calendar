function validationForm() {
  let inputs = document.querySelectorAll(".required");
  let count = 0;
  for (const input of inputs) {
    input.value != "" ? count++ : false; //personalizar alert
  }
  count == 4 ? saveTask() : alert("You must fill all the fields ");
}
function newTask() {
  modal.classList.replace("display-none", "modal-display-on");
}

function newTaskpreDay(e) {
  if (e.target.classList == "day-style looking") {
    newTask();
    let daytotask = e.target.id;
    let initialDate = document.getElementById("initial-date");
    mm = String(mm).padStart(2, "0");
    initialDate.value = `${yyyy}-${mm}-${daytotask}`;
    let initialHour = document.getElementById("final-time");
    currentHours < 10 ? (currentHours = "0" + currentHours) : currentHours;
    currentMinutes < 10
      ? (currentMinutes = "0" + currentMinutes)
      : currentMinutes;
    initialHour.value = `${currentHours}:${currentMinutes}`;
  }
}

function cancelTask() {
  document.getElementById("myForm").reset();
  modal.classList.replace("modal-display-on", "display-none");
}

function editTask(e) {
  //! checked
  mm = String(mm).padStart(2, "0");
  let selectTask = e.target.dataset.id;
  let tasksObject = storage.getItem("taskStorage");
  tasksObject = JSON.parse(tasksObject);

  for (let i = 0; i < tasksObject.length; i++) {
    if (selectTask == tasksObject[i].id) {
      modal.classList.replace("display-none", "modal-display-on");
      document.getElementById("taskId").value = tasksObject[i].id;
      document.getElementById("title").value = tasksObject[i].title;
      document.getElementById("initial-date").value =
        tasksObject[i].initialDate;
      document.getElementById("final-date").value = tasksObject[i].finalDate;
      document.getElementById("final-time").value = tasksObject[i].finalHour;
      document.getElementById("exp-time").value = tasksObject[i].expTime;
      document.getElementById("description").value = tasksObject[i].description;
      document.getElementById("event-type").value = tasksObject[i].type;
      document
        .getElementById("save")
        .setAttribute("data-id", tasksObject[i].id);
    }
  }

  document.getElementById("save").addEventListener("click", function save(e) {
    deleteTask(e);
  });
  document.getElementById("save").removeEventListener("click", save);
}
