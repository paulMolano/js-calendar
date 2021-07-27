function drawTask() {
    //? Draw & fill tasks stored
    addReminder(); //* add reminders of today

    let tasksObject = storage.getItem("taskStorage");
    tasksObject = JSON.parse(tasksObject);
    for (let i = 0; i < tasksObject.length; i++) {
        let initialDate = tasksObject[i].initialDate;
        initialDate = initialDate.split("-");
        let drawn = document.getElementById("event-" + tasksObject[i].id);
        if (mm == initialDate[1] && yyyy == initialDate[0] && !drawn) {
            //*select the square
            let toWrite = document.getElementById(initialDate[2]);

            //*Create div container
            let drawEvent = document.createElement("div");
            drawEvent.setAttribute("id", "event-" + tasksObject[i].id);
            drawEvent.setAttribute("data-id", tasksObject[i].id);
            drawEvent.setAttribute("class", "tasks-object");
            toWrite.appendChild(drawEvent);

            //*Paint the event title
            let drawTitle = document.createElement("div");
            drawTitle.innerHTML = tasksObject[i].title;
            drawTitle.setAttribute("id", "title-" + tasksObject[i].id);
            drawTitle.setAttribute("data-id", tasksObject[i].id);
            drawTitle.setAttribute("class", "tasks-title");
            drawEvent.appendChild(drawTitle);

            //*Paint the info modal hidden
            let drawEventInfo = document.createElement("div");
            drawEventInfo.innerHTML = "";
            drawEventInfo.setAttribute("id", "info-" + tasksObject[i].id);
            drawEventInfo.setAttribute("class", "tasks-modal");
            toWrite.appendChild(drawEventInfo);

            //*Paint delete button
            var deleteButton = document.createElement("img");
            deleteButton.classList.add("delete-button");
            deleteButton.setAttribute("id", "delete-" + tasksObject[i].id);
            deleteButton.setAttribute("src", "/src/img/bin.svg");
            deleteButton.setAttribute("data-id", tasksObject[i].id);
            drawEvent.appendChild(deleteButton);

            //*Add events
            drawTitle.addEventListener("click", editTask);
            deleteButton.addEventListener("click", deleteTask);
            drawEvent.addEventListener("mouseover", infoTask);
            drawEvent.addEventListener("mouseout", function() {
                document.getElementById("infoDiv").remove();
            });
        }
    }
}

function addReminder() {
    //? Add reminders of today
    let tasksObject = storage.getItem("taskStorage");
    tasksObject = JSON.parse(tasksObject);

    for (let i = 0; i < tasksObject.length; i++) {
        let title = tasksObject[i].title;
        let today = `${getCurrentTime().year}-${getCurrentTime().month}-${
      getCurrentTime().day
    }`;
        if (today == tasksObject[i].initialDate) {
            //*separate expiration time & inital hour by hours and minutes
            let expTime = tasksObject[i].expTime.split(":");
            let expMinutes = parseInt(expTime[1]);
            let initialHour = tasksObject[i].initialHour.split(":");
            let fHours = parseInt(initialHour[0]);
            let fMinutes = parseInt(initialHour[1]);

            //*deduct expiration minutes to initial minutes
            let reminderMinutes = fMinutes - expMinutes;

            //*calc reminder hours and minutes
            if (reminderMinutes >= 60) {
                fHours += 1;
                reminderMinutes = reminderMinutes % 60;
            } else if (reminderMinutes < 0) {
                fHours -= 1;
                reminderMinutes = 60 + reminderMinutes;
            }

            //*convert it to miliseconds
            let reminderHours = fHours - getCurrentTime().hours;
            reminderMinutes -= getCurrentTime().minutes;
            let timeReminder = (reminderHours * 60 + reminderMinutes) * 60000;

            //* set timeuot to alarms beep
            if (timeReminder != NaN && timeReminder > 0) {
                setTimeout(function() {
                    showPopup(expMinutes, title);
                }, timeReminder);
            }
        }
    }
}

function infoTask(e) {
    //? Create de info slide of all tasks
    let selectTask = e.target.dataset.id;
    let tasksObject = storage.getItem("taskStorage");
    tasksObject = JSON.parse(tasksObject);

    for (let i = 0; i < tasksObject.length; i++) {
        if (selectTask == tasksObject[i].id) {
            let title = tasksObject[i].title;
            let initialDate = tasksObject[i].initialDate;
            let finalDate = tasksObject[i].finalDate;
            let initialHour = tasksObject[i].initialHour;
            let expTime = tasksObject[i].expTime;
            let description = tasksObject[i].description;
            let eventType = tasksObject[i].type;

            let infoTask =
                //*Template of the slide
                `<template id=infoTask><div class=" info-task" id="infoDiv"> 
        <h2 id="infoTitle">${title}</h2>
        <p id="infoInitialDate">From ${initialDate} <span id="infoFinalDate">to ${finalDate} at ${initialHour} </span></p>
        <p id="infoEventType">Event type: ${eventType} <span id="remind">Reminder: ${expTime}</span></p>
        <p id="infoDescription">${description}</p>
    </div></template>`;
            let toInsertInfo = document.getElementById("info-" + selectTask); //*Select were insert template, in html
            toInsertInfo.insertAdjacentHTML("beforeend", infoTask); //*insert only read teamplate (aka Ghost Template)
            let contentTemplate = document.getElementById("infoTask").content; //*select the ghost template
            let copyContent = document.importNode(contentTemplate, true); //*import ghost template as html (as html)
            toInsertInfo.innerHTML = ""; //* delete ghost Template
            toInsertInfo.appendChild(copyContent); ////*insert  ghost template (now in the living world!!)
        }
    }
}