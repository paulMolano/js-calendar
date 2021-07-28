function saveTask() {
  console.log("save");
  let task = {
    //objeto task
    id: 00,
    title: document.getElementById("title").value,
    initialDate: document.getElementById("initial-date").value,
    finalDate: document.getElementById("final-date").value,
    initialHour: document.getElementById("final-time").value,
    expTime: document.getElementById("exp-time").value,
    description: document.getElementById("description").value,
    type: document.getElementById("event-type").value,
  };
  storageTasks(task);
  drawTask();
  cancelTask();
}

function storageTasks(task) {
  let id = storage.getItem("id"); //traemos el JSON "id"
  let taskId = parseInt(id) + 1; // taskId = valor numerico de (JSON "id")+1
  storage.setItem("id", taskId); // sobreescribimos el JSON "id" con el valor de taskI
  let taskStorage = storage.getItem("taskStorage");
  let iDate = task.initialDate.split("-");
  let fDate = task.finalDate.split("-");
  let tasksObject = JSON.parse(taskStorage);

  if (fDate != "" && iDate[1] != fDate[1]) {
    for (let n = 0; n <= fDate[1] - iDate[1]; n++) {
      if (n == 0) {
        let task1 = {
          //objeto task1
          id: taskId,
          title: task.title,
          initialDate: task.initialDate,
          finalDate: `${iDate[0]}-${iDate[1]}-${monthLength}`,
          initialHour: task.initialHour,
          expTime: task.expTime,
          description: task.description,
          type: task.type,
        };
        tasksObject.push(task1);
      } else if (n == fDate[1] - iDate[1]) {
        let task2 = {
          //objeto task2
          id: taskId,
          title: task.title,
          initialDate: `${fDate[0]}-${fDate[1]}-01`,
          finalDate: task.finalDate,
          initialHour: task.initialHour,
          expTime: task.expTime,
          description: task.description,
          type: task.type,
        };
        tasksObject.push(task2);
      } else {
        let monthNumber = parseInt(iDate[1]) + n;
        monthNumber > 10 ? (monthNumber = "0" + monthNumber) : monthNumber;
        let task3 = {
          //objeto task1
          id: taskId,
          title: task.title,
          initialDate: `${iDate[0]}-${monthNumber}-01`,
          finalDate: `${fDate[0]}-${monthNumber}-${monthLength}`,
          initialHour: task.initialHour,
          expTime: task.expTime,
          description: task.description,
          type: task.type,
        };
        tasksObject.push(task3);
      }
    }
    storage.setItem("taskStorage", JSON.stringify(tasksObject));
  } else {
    console.log("1mes");
    task.id = taskId;
    tasksObject.push(task);
    storage.setItem("taskStorage", JSON.stringify(tasksObject));
  }
}

function deleteTask(e) {
  mm = String(mm).padStart(2, "0");
  let id;
  e.target.dataset.id ? (id = e.target.dataset.id) : (id = selectTask);
  let tasksObject = storage.getItem("taskStorage");
  tasksObject = JSON.parse(tasksObject);
  for (let i = 1; i < tasksObject.length; i++) {
    let finalDate = tasksObject[i].finalDate;
    while (tasksObject[i].id == id) {
      let deleteIndex = tasksObject.indexOf(tasksObject[i]);
      tasksObject.splice(deleteIndex, 1);
      storage.setItem("taskStorage", JSON.stringify(tasksObject));
      clearCalendar(id, finalDate);
    }
  }
}

function clearCalendar(id, finalDate) {
  if (finalDate != "") {
    let tasks = document.querySelectorAll("#event-" + id);
    for (const task of tasks) {
      task.remove();
    }
  } else {
    document.getElementById("event-" + id).remove();
  }
  let infoTask = document.getElementById("info-" + id);
  infoTask ? infoTask.remove() : false;
}
