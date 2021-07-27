function drawTask() {
  addReminder();
  let tasksObject = storage.getItem("taskStorage");
  tasksObject = JSON.parse(tasksObject);
  for (let i = 0; i < tasksObject.length; i++) {
    let initialDate = tasksObject[i].initialDate;
    initialDate = initialDate.split("-");
    let drawn = document.getElementById("event-" + tasksObject[i].id);
    if (mm == initialDate[1] && !drawn) {
      //seleccionamos casilla

      let toWrite = document.getElementById(initialDate[2]);

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

function addReminder() {
  let tasksObject = storage.getItem("taskStorage");
  tasksObject = JSON.parse(tasksObject);
  for (let i = 0; i < tasksObject.length; i++) {
    let title = tasksObject[i].title;
    let initialDate = tasksObject[i].initialDate;
    let initialDay = initialDate.split("-");
    if (getCurrentTime().day == initialDay[2]) {
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

      let reminderHours = fHours - getCurrentTime().hours;
      reminderMinutes -= getCurrentTime().minutes;
      let timeReminder = (reminderHours * 60 + reminderMinutes) * 60000;

      if (timeReminder != NaN && timeReminder > 0) {
        setTimeout(function () {
          showPopup(expMinutes, title);
        }, timeReminder);
        console.log(timeReminder, initialDate, getCurrentTime().day);
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
