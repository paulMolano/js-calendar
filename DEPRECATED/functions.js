/* //?----------------------------------------------------- EVENTS ---------------------------------------------------\\
var btnNewAct = document
  .getElementById("addActivity")
  .addEventListener("click", newTask);

var btnCancel = document
  .getElementById("cancel")
  .addEventListener("click", cancelTask);

var closeBtn = document
  .getElementById("close")
  .addEventListener("click", cancelTask);

var saveBtn = document
  .getElementById("save")
  .addEventListener("click", validationForm);

document.addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    cancelTask();
  }
});

document.addEventListener("click", (e) => {
  if (e.target === modal) {
    cancelTask();
  }
});

document.getElementById("forward").addEventListener("click", nextMonth);
document.getElementById("backward").addEventListener("click", previousMonth);
document.getElementById("forwYear").addEventListener("click", nextYear);
document.getElementById("backYear").addEventListener("click", previousYear); */

//?----------------------------------------------------- Draw Calendar ---------------------------------------------------\\
/* function drawCalendar(firstDay, monthLength) {
  let monthDays = document.getElementById("days");
  monthDays.innerHTML = "";
  if (
    (firstDay == 6 && monthLength == 31) ||
    (firstDay == 7 && monthLength >= 30)
  ) {
    n = 42;
  } else if (firstDay == 1 && monthLength == 28) {
    n = 28;
  } else {
    n = 35;
  }

  for (let i = 1; i <= n; i++) {
    var square = document.createElement("div");
    if (i >= firstDay && i < firstDay + monthLength) {
      var str = 1 + i - firstDay;
      str < 10 ? (str = "0" + str) : str;
      square.setAttribute("id", str);
      square.innerHTML = 1 + i - firstDay;
      square.addEventListener("click", newTaskpreDay); // se la ponemos al boton
      square.addEventListener("mouseover", hoveringIn);
      square.addEventListener("mouseout", hoveringOut);
    }
    square.setAttribute("class", "day-style");
    monthDays.appendChild(square);
  }
  todayIs();

  document.getElementById("calendar").style.opacity = 1;
}

function todayIs() {
  const day = new Date();
  var currentDay = String(day.getDate());
  var currentMonth = String(day.getMonth() + 1).padStart(2, "0");
  var currentYear = day.getFullYear();
  if (currentMonth == mm && currentYear == yyyy) {
    document.getElementById(currentDay).style.fontWeight = "bold";
    let color = getComputedStyle(document.documentElement).getPropertyValue(
      "--color"
    );

    document.getElementById(currentDay).style.border =
      "solid " + color + " 4px";
  }
} */

//?----------------------------------------------------- Manage Tasks ---------------------------------------------------\\
/* function validationForm() {
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
} */

//?----------------------------------------------------- Storage Tasks ---------------------------------------------------\\
/* function saveTask() {
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
} */

//?----------------------------------------------------- Draw Tasks ---------------------------------------------------\\
/* function drawTask() {
  addReminder();
  let string = String(mm).padStart(2, "0");
  let idsList = storage.getItem(string + "-" + yyyy);
  idsList = JSON.parse(idsList);
  let tasksObject = storage.getItem("taskStorage");
  tasksObject = JSON.parse(tasksObject);
  if (idsList) {
    for (const id of idsList) {
      for (let i = 0; i < tasksObject.length; i++) {
        let abr = document.getElementById("event-" + tasksObject[i].id);
        if (id == tasksObject[i].id && !abr) {
          //seleccionamos casilla
          let initialDay = tasksObject[i].initialDate;
          let theinitialDay = initialDay.split("-");
          theinitialDay = theinitialDay[2];
          let toWrite = document.getElementById(theinitialDay);

          //pintamos el evento
          let drawEvent = document.createElement("div");
          drawEvent.setAttribute("id", "event-" + tasksObject[i].id);
          drawEvent.setAttribute("data-id", tasksObject[i].id);
          drawEvent.setAttribute("class", "tasks-object");
          toWrite.appendChild(drawEvent);

          //pintamos el titulo
          let drawTitle = document.createElement("div");
          drawTitle.innerHTML = tasksObject[i].title;
          drawTitle.setAttribute("id", "title-" + tasksObject[i].id);
          drawTitle.setAttribute("data-id", tasksObject[i].id);
          drawTitle.setAttribute("class", "tasks-title");
          drawEvent.appendChild(drawTitle);

          //pintamos el modal info oculto
          let drawEventInfo = document.createElement("div");
          drawEventInfo.innerHTML = "";
          drawEventInfo.setAttribute("id", "info-" + tasksObject[i].id);
          drawEventInfo.setAttribute("class", "tasks-modal");
          toWrite.appendChild(drawEventInfo);

          //pintamos el boton delete
          var deleteButton = document.createElement("div");
          deleteButton.classList.add("delete-button");
          deleteButton.setAttribute("id", "delete-" + tasksObject[i].id);
          deleteButton.setAttribute("data-id", tasksObject[i].id);
          deleteButton.innerHTML = "-";
          drawEvent.appendChild(deleteButton);

          //añadimos eventos
          drawTitle.addEventListener("click", editTask);
          deleteButton.addEventListener("click", deleteTask);
          drawEvent.addEventListener("mouseover", infoTask);
          drawEvent.addEventListener("mouseout", function () {
            document.getElementById("infoDiv").remove();
          });
        }
      }
    }
  }
}

function addReminder() {
  const day = new Date();
  let dd = String(day.getDate());
  let mm = String(day.getMonth() + 1).padStart(2, "0");
  let yyyy = day.getFullYear();
  let currentHours = day.getHours();
  let currentMinutes = day.getMinutes();
  let idsList = storage.getItem(mm + "-" + yyyy);
  idsList = JSON.parse(idsList);
  let tasksObject = storage.getItem("taskStorage");
  tasksObject = JSON.parse(tasksObject);
  if (idsList) {
    for (const id of idsList) {
      for (let i = 0; i < tasksObject.length; i++) {
        if (id == tasksObject[i].id) {
          let title = tasksObject[i].title;
          let initialDate = tasksObject[i].initialDate;
          let initialDay = initialDate.split("-");
          if (dd === initialDay[2]) {
            let expTime = tasksObject[i].expTime.split(":");
            let expMinutes = parseInt(expTime[1]);
            let finalHour = tasksObject[i].finalHour.split(":");
            let fHours = parseInt(finalHour[0]);
            let fMinutes = parseInt(finalHour[1]);

            let reminderMinutes = fMinutes - expMinutes;
            if (reminderMinutes >= 60) {
              fHours += 1;
              reminderMinutes = reminderMinutes % 60;
            } else if (reminderMinutes < 0) {
              fHours -= 1;
              reminderMinutes = 60 + reminderMinutes;
            }

            let reminderHours = fHours - currentHours;
            reminderMinutes -= currentMinutes;
            let timeReminder = (reminderHours * 60 + reminderMinutes) * 60000;
            console.log(timeReminder, initialDate, dd);
            if (timeReminder != NaN && timeReminder > 0) {
              setTimeout(function () {
                showPopup(expMinutes, title);
              }, timeReminder);
              console.log(timeReminder, initialDate, dd);
            }
          }
        }
      }
    }
  }
}

function infoTask(e) {
  let selectTask = e.target.dataset.id;
  let tasksObject = storage.getItem("taskStorage");
  tasksObject = JSON.parse(tasksObject);

  for (let i = 0; i < tasksObject.length; i++) {
    if (selectTask == tasksObject[i].id) {
      let title = tasksObject[i].title;
      let initialDate = tasksObject[i].initialDate;
      let finalDate = tasksObject[i].finalDate;
      let finalHour = tasksObject[i].finalHour;
      let expTime = tasksObject[i].expTime;
      let description = tasksObject[i].description;
      let eventType = tasksObject[i].type;

      let infoTask = `<template id=infoTask><div class=" info-task" id="infoDiv">
        <h2 id="infoTitle">${title}</h2>
        <p id="infoInitialDate">From ${initialDate} <span id="infoFinalDate">to ${finalDate} at ${finalHour} </span></p>
        <p id="infoEventType">Event type: ${eventType} <span id="remind">Reminder: ${expTime}</span></p>
        <p id="infoDescription">${description}</p>
    </div></template>`;
      let toInsertInfo = document.getElementById("info-" + selectTask);
      toInsertInfo.insertAdjacentHTML("beforeend", infoTask);
      let contentTemplate = document.getElementById("infoTask").content;
      let copyContent = document.importNode(contentTemplate, true);
      toInsertInfo.innerHTML = "";
      toInsertInfo.appendChild(copyContent);
    }
  }
}
 */
//?----------------------------------------------------- Manage Calendar ---------------------------------------------------\\
/* function newDay() {
  const day = new Date();
  let currentHours = day.getHours();
  let currentMinutes = day.getMinutes();
  let newday = ((23 - currentHours) * 3600 + (60 - currentMinutes) * 60) * 1000;
  setTimeout(function () {
    drawCalendar(firstDay, monthLength);
    drawTask();
  }, newday);
}
function nextMonth() {
  document.getElementById("calendar").style.opacity = 0;
  setTimeout(function () {
    let daysElement = document.getElementById("days");
    daysElement.innerHTML = "";
    mm = parseInt(mm) + 1;
    calendar.innerHTML = monthNames[mm - 1] + " " + yyyy;
    if (mm > 12) {
      mm = 1;
      yyyy = parseInt(yyyy) + 1;
    }

    var firstDay = new Date(mm + " 01, " + yyyy + " 00:00:00").getDay();
    firstDay == 0 ? (firstDay = 7) : firstDay;
    var monthLength = new Date(yyyy, mm, 0).getDate();

    console.log(document.getElementById("calendar").style.opacity);

    drawCalendar(firstDay, monthLength);
    drawTask();
  }, 1000);
}

function nextYear() {
  document.getElementById("calendar").style.opacity = 0;
  setTimeout(function () {
    document.getElementById("days").innerHTML = "";
    yyyy = parseInt(yyyy) + 1;
    calendar.innerHTML = monthNames[mm - 1] + " " + yyyy;
    var firstDay = new Date(mm + " 01, " + yyyy + " 00:00:00").getDay();
    firstDay == 0 ? (firstDay = 7) : firstDay;
    var monthLength = new Date(yyyy, mm, 0).getDate();
    drawCalendar(firstDay, monthLength);
    drawTask();
  }, 1000);
}

function previousMonth() {
  document.getElementById("calendar").style.opacity = 0;
  setTimeout(function () {
    document.getElementById("days").innerHTML = "";
    mm = parseInt(mm) - 1;
    calendar.innerHTML = monthNames[mm - 1] + " " + yyyy;
    if (mm < 1) {
      mm = 12;
      yyyy = parseInt(yyyy) - 1;
    }

    var firstDay = new Date(mm + " 01, " + yyyy + " 00:00:00").getDay();
    firstDay == 0 ? (firstDay = 7) : firstDay;
    var monthLength = new Date(yyyy, mm, 0).getDate();
    drawCalendar(firstDay, monthLength);
    drawTask();
  }, 1000);
}

function previousYear() {
  document.getElementById("calendar").style.opacity = 0;
  setTimeout(function () {
    document.getElementById("days").innerHTML = "";
    yyyy = parseInt(yyyy) - 1;
    calendar.innerHTML = monthNames[mm - 1] + " " + yyyy;
    var firstDay = new Date(mm + " 01, " + yyyy + " 00:00:00").getDay();
    firstDay == 0 ? (firstDay = 7) : firstDay;
    var monthLength = new Date(yyyy, mm, 0).getDate();
    drawCalendar(firstDay, monthLength);
    drawTask();
  }, 1000);
}
 */
//?----------------------------------------------------- Effects ---------------------------------------------------\\

/* function showPopup(expMinutes, title) {
  document.getElementById(
    "popup-text"
  ).innerHTML = `Aviso,quedan ${expMinutes} minutos para ${title}`;
  document.getElementById("popup").style.display = "block";
  var audio = new Audio("assets/sound/alarm.ogg");
  audio.play();
  document.getElementById("time-up").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
  });
}

function hoveringIn(event) {
  var btn = event.target;
  btn.classList.toggle("looking");
  if (btn.classList == "day-style looking") {
    var button = document.createElement("button");
    button.classList.add("add-button");
    button.setAttribute("id", "add-" + btn.id);
    button.innerHTML = "+";
    btn.appendChild(button);
  }
}

function hoveringOut(e) {
  let btn = e.target;
  btn.classList.toggle("looking");
  let addbtn = document.getElementById("add-" + btn.id);
  addbtn ? addbtn.remove() : false;
} */
