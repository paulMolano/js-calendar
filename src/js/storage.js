function saveTask() {
  let taskStorage = storage.getItem("taskStorage"); //traemos el JSON "taskStorage"
  let id = storage.getItem("id"); //traemos el JSON "id"
  let taskId = parseInt(id) + 1; // taskId = valor numerico de (JSON "id")+1
  storage.setItem("id", taskId); // sobreescribimos el JSON "id" con el valor de taskId

  let task = {
    //objeto task
    id: taskId,
    title: document.getElementById("title").value,
    initialDate: document.getElementById("initial-date").value,
    finalDate: document.getElementById("final-date").value,
    initialHour: document.getElementById("final-time").value,
    expTime: document.getElementById("exp-time").value,
    description: document.getElementById("description").value,
    type: document.getElementById("event-type").value,
  };
  let tasksObject = JSON.parse(taskStorage); // si existe el JSON "taskStorage" el array taskObject es =  "taskStorage" si no crealo
  tasksObject.push(task); //añadimos al Array tasksObject la nueva task
  storage.setItem("taskStorage", JSON.stringify(tasksObject)); //creamos o sobreescribimos taskStorage con el valor del array tasksObject

  drawTask();
  cancelTask();
}

function deleteTask(e) {
  mm = String(mm).padStart(2, "0");
  let id;
  e.target.dataset.id ? (id = e.target.dataset.id) : (id = selectTask);
  let tasksObject = storage.getItem("taskStorage");
  tasksObject = JSON.parse(tasksObject);
  for (let i = 0; i < tasksObject.length; i++) {
    if (id == tasksObject[i].id) {
      let deleteIndex = tasksObject.indexOf(tasksObject[i]);
      tasksObject.splice(deleteIndex, 1);
      storage.setItem("taskStorage", JSON.stringify(tasksObject));
      document.getElementById("event-" + id).remove();
      document.getElementById("info-" + id).remove();
    }
  }
}
