function saveTask() {
  let initialDate = document.getElementById("initial-date").value; //fecha incial input
  let dateSplit = initialDate.split("-"); //array fecha incial input
  let monthId = dateSplit[1] + "-" + dateSplit[0]; //creamos el identificado del mes [mes-año]
  let monthStorage = storage.getItem(monthId); //traemos el JSON [mes-año]
  let taskStorage = storage.getItem("taskStorage"); //traemos el JSON "taskStorage"
  let id = storage.getItem("id"); //traemos el JSON "id"
  let taskId; //inicializamos taskId

  if (id) {
    // si existe el JSON "id"
    taskId = parseInt(id) + 1; // taskId = valor numerico de (JSON "id")+1
    storage.setItem("id", taskId); // sobreescribimos el JSON "id" con el valor de taskId
  } else {
    // si NO existe el JSON "id"
    taskId = 0;
    storage.setItem("id", 0); // creamos el JSON "id" con el valor 0
  }

  let task = {
    //objeto task
    id: taskId,
    title: document.getElementById("title").value,
    initialDate: document.getElementById("initial-date").value,
    finalDate: document.getElementById("final-date").value,
    finalHour: document.getElementById("final-time").value,
    expTime: document.getElementById("exp-time").value,
    description: document.getElementById("description").value,
    type: document.getElementById("event-type").value,
  };
  let tasksObject = taskStorage ? JSON.parse(taskStorage) : []; // si existe el JSON "taskStorage" el array taskObject es =  "taskStorage" si no crealo
  tasksObject.push(task); //añadimos al Array tasksObject la nueva task
  storage.setItem("taskStorage", JSON.stringify(tasksObject)); //creamos o sobreescribimos taskStorage con el valor del array tasksObject

  let idList = monthStorage ? JSON.parse(monthStorage) : []; // si existe el JSON "monthStorage" el array idList es =  "monthStorage" si no crealo
  idList.push(taskId); //añadimos al Array idList la nueva task
  storage.setItem(monthId, JSON.stringify(idList)); //creamos o sobreescribimos idList con el valor del array tasksObject

  drawTask();
  cancelTask();
}

function deleteTask(e) {
  let id;
  e.target.dataset.id ? (id = e.target.dataset.id) : (id = selectTask);
  let tasksObject = storage.getItem("taskStorage");
  tasksObject = JSON.parse(tasksObject);
  let idsList = storage.getItem(mm + "-" + yyyy);
  idsList = JSON.parse(idsList);
  for (let i = 0; i < tasksObject.length; i++) {
    if (id == tasksObject[i].id) {
      let deleteIndex = tasksObject.indexOf(tasksObject[i]);
      tasksObject.splice(deleteIndex, 1);
      storage.setItem("taskStorage", JSON.stringify(tasksObject));
      let deleteIdsList = idsList.indexOf(id);
      idsList.splice(deleteIdsList, 1);
      storage.setItem(mm + "-" + yyyy, JSON.stringify(idsList));
      document.getElementById("event-" + id).remove();
      document.getElementById("info-" + id).remove();
    }
  }
}
