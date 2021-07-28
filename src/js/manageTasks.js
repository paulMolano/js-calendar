function validationForm() {
  //? validates form imput data
  let inputs = document.querySelectorAll(".required");
  let count = 0;
  for (const input of inputs) {
    input.value != "" ? count++ : false; //personalizar alert
  }
  count == 4 ? saveTask() : alert("You must fill all the fields ");
}
function newTask() {
  //? Opens modal form
  modal.classList.replace("display-none", "modal-display-on");
}

function newTaskpreDay(e) {
  //? Opens modal with preset initial date
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
  //? Close modal form
  document.getElementById("myForm").reset();
  modal.classList.replace("modal-display-on", "display-none");
}

function editTask(e) {
  //? Opens modal with preset initial data
  let selectTask = e.target.dataset.id;
  let tasksObject = storage.getItem("taskStorage");
  tasksObject = JSON.parse(tasksObject);
  let taskMatch = [];
  for (let i = 0; i < tasksObject.length; i++) {
    console.log(taskMatch, tasksObject[i].id, selectTask);
    if (selectTask == tasksObject[i].id) {
      taskMatch.push(tasksObject[i]);
    }
  }
  let fDate;
  taskMatch.length > 1
    ? (fDate = taskMatch[taskMatch.length - 1].finalDate)
    : (fDate = taskMatch[0].finalDate);

  modal.classList.replace("display-none", "modal-display-on");
  document.getElementById("taskId").value = taskMatch[0].id;
  document.getElementById("title").value = taskMatch[0].title;
  document.getElementById("initial-date").value = taskMatch[0].initialDate;
  document.getElementById("final-date").value = fDate;
  document.getElementById("final-time").value = taskMatch[0].initialHour;
  document.getElementById("exp-time").value = taskMatch[0].expTime;
  document.getElementById("description").value = taskMatch[0].description;
  document.getElementById("event-type").value = taskMatch[0].type;
  document.getElementById("save").setAttribute("data-id", taskMatch[0].id);

  document.getElementById("save").addEventListener("click", function save(e) {
    deleteTask(e);
  });
  document.getElementById("save").removeEventListener("click", save);
}
