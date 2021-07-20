let monthDays = document.getElementById("days");

drawCalendar(firstDay, monthLength);

function drawCalendar(firstDay, monthLength) {
    firstDay == 6 && monthLength == 31 ? (n = 42) : (n = 35);
    firstDay == 7 && monthLength >= 30 ? (n = 42) : (n = 35);
    firstDay == 1 && monthLength == 28 ? (n = 28) : (n = 35); //! corregir container border

    for (let i = 1; i <= n; i++) {
        var square = document.createElement("div");
        if (i >= firstDay && i < firstDay + monthLength) {
            var str = mm + "-" + (1 + i - firstDay);
            square.setAttribute("id", str);
            square.innerHTML = 1 + i - firstDay;
        }
        square.setAttribute("class", "day-style");
        monthDays.appendChild(square);
    }
}
console.log(firstDay);
console.log(monthLength);

var btnNewAct = document
    .getElementById("addActivity")
    .addEventListener("click", newTask);

var btnCancel = document
    .getElementById("cancel")
    .addEventListener("click", cancelTask);

var modal = document.getElementById("modal-container");

function newTask() {
    modal.classList.replace("display-none", "modal-display-on");
}

var closeBtn = document
    .getElementById("close")
    .addEventListener("click", cancelTask);

var inputs = document.querySelectorAll("input");

function cancelTask() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].removeAttribute("required");
    }
    modal.classList.replace("modal-display-on", "display-none");
}