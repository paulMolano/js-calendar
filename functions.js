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

let editDelTasks = document.querySelectorAll(".event-style");

//?----------------------------------------------------- FUNCTIONS ---------------------------------------------------\\
function drawCalendar(firstDay, monthLength) {
    let monthDays = document.getElementById("days");

    firstDay == 6 && monthLength == 31 ? (n = 42) : (n = 35);
    firstDay == 7 && monthLength >= 30 ? (n = 42) : (n = 35);
    firstDay == 1 && monthLength == 28 ? (n = 28) : (n = 35); //! corregir container border

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
    let idsList = storage.getItem(mm + "-" + yyyy);
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
                        let imgSpan = document.createElement("span");
                        let imgEdit = document.createElement("img");
                        let imgTrash = document.createElement("img");
                        imgEdit.setAttribute("src", "/js-calendar/assets/edit.svg");
                        imgEdit.setAttribute("class", "edit-style");
                        imgTrash.setAttribute("src", "/js-calendar/assets/trash.svg");
                        imgTrash.setAttribute("class", "trash-style");
                        drawEvent.setAttribute("id", tasksObject[i].id);
                        drawEvent.setAttribute("class", "tasks-object");
                        toWrite.appendChild(drawEvent);
                        drawEvent.appendChild(imgSpan);
                        imgSpan.appendChild(imgEdit);
                        drawEvent.appendChild(imgTrash);
                        // drawEvent.addEventListener("click", readTask);
                        drawEvent.addEventListener("mouseover", () => {
                            let trash = document.querySelector(".trash-style");
                            let pen = document.querySelector(".edit-style");
                            trash.classList.replace("trash-style", "display-block");
                            pen.classList.replace("edit-style", "display-block");
                        });
                        drawEvent.addEventListener("mouseout", () => {
                            let trash = document.querySelector(".trash-style");
                            let pen = document.querySelector(".edit-style");
                            trash.classList.replace("display-block", "trash-style");
                            pen.classList.replace("display-block", "edit-style");
                        });
                        editDelIcons();
                    }
                }
            }
        }
    }
}

function editDelIcons() {
    let trash = document.querySelector(".trash-style");
    let edit = document.querySelector(".edit-style");
    trash.addEventListener("click", deleteTask);
    edit.addEventListener("click", editTask);
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