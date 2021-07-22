//?----------------------------------------------------- EVENTS ---------------------------------------------------\\
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
    .addEventListener("click", saveTask);

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
document.getElementById("backYear").addEventListener("click", previousYear);

let editDelTasks = document.querySelectorAll(".event-style");

//?----------------------------------------------------- FUNCTIONS ---------------------------------------------------\\
function drawCalendar(firstDay, monthLength) {
    let monthDays = document.getElementById("days");
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
        }
        square.setAttribute("class", "day-style");
        monthDays.appendChild(square);
    }
}

// function MonthSquareCalc() {}

function newTask() {
    modal.classList.replace("display-none", "modal-display-on");
}

function cancelTask() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].removeAttribute("required");
    }
    modal.classList.replace("modal-display-on", "display-none");
    document.getElementById("title").value = "";
    document.getElementById("initial-date").value = "";
    document.getElementById("final-date").value = "";
    document.getElementById("exp-time").value = "";
    document.getElementById("description").value = "";
    document.getElementById("event-type").value = "";
}

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

function drawTask() {
    //! se podria eliminar el idsList???
    let string = String(mm).padStart(2, "0");
    let idsList = storage.getItem(string + "-" + yyyy);
    idsList = JSON.parse(idsList);
    let tasksObject = storage.getItem("taskStorage");
    tasksObject = JSON.parse(tasksObject);
    if (idsList) {
        for (const id of idsList) {
            for (let i = 0; i < tasksObject.length; i++) {
                if (id == tasksObject[i].id) {
                    let abr = document.getElementById(tasksObject[i].id);
                    if (!abr) {
                        let initialDay = tasksObject[i].initialDate;
                        let theinitialDay = initialDay.split("-");
                        theinitialDay = theinitialDay[2];
                        let toWrite = document.getElementById(theinitialDay);
                        let drawEvent = document.createElement("div");
                        drawEvent.innerHTML = tasksObject[i].title;
                        drawEvent.setAttribute("class", "event-style");
                        drawEvent.setAttribute("id", tasksObject[i].id);
                        drawEvent.setAttribute("class", "tasks-object");
                        toWrite.appendChild(drawEvent);
                        let drawEventInfo = document.createElement("div");
                        drawEventInfo.innerHTML = "";
                        drawEventInfo.setAttribute("id", "info-" + tasksObject[i].id);
                        drawEventInfo.setAttribute("class", "tasks-modal");
                        toWrite.appendChild(drawEventInfo);
                        drawEvent.addEventListener("mouseover", infoTask);
                        drawEvent.addEventListener("mouseout", function() {
                            document.getElementById("infoDiv").remove();
                        });
                    }
                }
            }
        }
    }
}

function readTask(e) {
    let selectTask = e.target.id;
    let tasksObject = storage.getItem("taskStorage");
    tasksObject = JSON.parse(tasksObject);

    for (let i = 0; i < tasksObject.length; i++) {
        if (selectTask == tasksObject[i].id) {
            modal.classList.replace("display-none", "modal-display-on");
            document.getElementById("title").value = tasksObject[i].title;
            document.getElementById("initial-date").value =
                tasksObject[i].initialDate;
            document.getElementById("final-date").value = tasksObject[i].finalDate;
            document.getElementById("exp-time").value = tasksObject[i].expTime;
            document.getElementById("description").value = tasksObject[i].description;
            document.getElementById("event-type").value = tasksObject[i].type;
        }
    }
}

function deleteTask(e) {
    alert("hola");
    let id = e.target.id;
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
            document.getElementById(id).remove();
        }
    }
}

function editTask(e) {
    alert("jolin");
    //* ORCO poner edit
    let selectTask = e.target.id;
    let tasksObject = storage.getItem("taskStorage");
    tasksObject = JSON.parse(tasksObject);

    for (let i = 0; i < tasksObject.length; i++) {
        if (selectTask == tasksObject[i].id) {
            modal.classList.replace("display-none", "modal-display-on");
            document.getElementById("title").value = tasksObject[i].title;
            document.getElementById("initial-date").value =
                tasksObject[i].initialDate;
            document.getElementById("final-date").value = tasksObject[i].finalDate;
            document.getElementById("exp-time").value = tasksObject[i].expTime;
            document.getElementById("description").value = tasksObject[i].description;
            document.getElementById("event-type").value = tasksObject[i].type;
        }
    }
}

function editDelTask() {
    console.log("Hello");
}

function infoTask(e) {
    let selectTask = e.target.id;
    let tasksObject = storage.getItem("taskStorage");
    tasksObject = JSON.parse(tasksObject);

    for (let i = 0; i < tasksObject.length; i++) {
        if (selectTask == tasksObject[i].id) {
            let title = tasksObject[i].title;
            let initialDate = tasksObject[i].initialDate;
            let finalDate = tasksObject[i].finalDate;
            let expTime = tasksObject[i].expTime;
            let description = tasksObject[i].description;
            let eventType = tasksObject[i].type;
            let infoTask = `<template id=infoTask><div class=" info-task" id="infoDiv">
        <h2 id="infoTitle">${title}</h2>
        <p id="infoInitialDate">From ${initialDate} <span id="infoFinalDate">to ${finalDate}</span></p>
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

function nextMonth() {
    console.log(firstDay, monthLength);
    document.getElementById("days").innerHTML = "";
    mm = parseInt(mm) + 1;
    if (mm > 12) {
        mm = 1;
        yyyy = parseInt(yyyy) + 1;
    }

    var firstDay = new Date(mm + " 01, " + yyyy + " 00:00:00").getDay();
    firstDay == 0 ? (firstDay = 7) : firstDay;
    var monthLength = new Date(yyyy, mm, 0).getDate();
    drawCalendar(firstDay, monthLength);
    drawTask();
    let today = document.getElementById("todayIs");
    today.innerHTML = dd + " / " + mm + " / " + yyyy;
}

function nextYear() {
    document.getElementById("days").innerHTML = "";
    yyyy = parseInt(yyyy) + 1;
    var firstDay = new Date(mm + " 01, " + yyyy + " 00:00:00").getDay();
    firstDay == 0 ? (firstDay = 7) : firstDay;
    var monthLength = new Date(yyyy, mm, 0).getDate();
    drawCalendar(firstDay, monthLength);
    drawTask();
    let today = document.getElementById("todayIs");
    today.innerHTML = dd + " / " + mm + " / " + yyyy;
}

function previousMonth() {
    document.getElementById("days").innerHTML = "";
    mm = parseInt(mm) - 1;
    if (mm < 1) {
        mm = 12;
        yyyy = parseInt(yyyy) - 1;
    }

    var firstDay = new Date(mm + " 01, " + yyyy + " 00:00:00").getDay();
    firstDay == 0 ? (firstDay = 7) : firstDay;
    var monthLength = new Date(yyyy, mm, 0).getDate();
    let today = document.getElementById("todayIs");
    today.innerHTML = dd + " / " + mm + " / " + yyyy;
    drawCalendar(firstDay, monthLength);
    drawTask();
}

function previousYear() {
    document.getElementById("days").innerHTML = "";
    yyyy = parseInt(yyyy) - 1;
    var firstDay = new Date(mm + " 01, " + yyyy + " 00:00:00").getDay();
    firstDay == 0 ? (firstDay = 7) : firstDay;
    var monthLength = new Date(yyyy, mm, 0).getDate();
    drawCalendar(firstDay, monthLength);
    drawTask();
    let today = document.getElementById("todayIs");
    today.innerHTML = dd + " / " + mm + " / " + yyyy;
}