// let monthDays = document.getElementById("days");

// drawCalendar(firstDay, monthLength);

// function drawCalendar(firstDay, monthLength) {
//   firstDay == 6 && monthLength == 31 ? (n = 42) : (n = 35);
//   firstDay == 7 && monthLength >= 30 ? (n = 42) : (n = 35);
//   firstDay == 1 && monthLength == 28 ? (n = 28) : (n = 35); //! corregir container border

//   for (let i = 1; i <= n; i++) {
//     var square = document.createElement("div");
//     if (i >= firstDay && i < firstDay + monthLength) {
//       var str = mm + "-" + (1 + i - firstDay);
//       square.setAttribute("id", str);
//       square.innerHTML = 1 + i - firstDay;
//     }
//     square.setAttribute("class", "day-style");
//     monthDays.appendChild(square);
//   }
// }
// console.log(firstDay);
// console.log(monthLength);

const calendar = document.getElementById("days");

let $date = new Date();
let dia = $date.getDate();
let mes = $date.getMonth() + 1;
let anno = $date.getUTCFullYear();

let firstWeekDay = new Date(mes + " 01, " + anno + " 00:00:00");
let firstMonthDay = firstWeekDay.getDay();
let lastDayMonth = new Date(anno, mes, 0);
let daysPerMonth = lastDayMonth.getDate();

console.log(firstMonthDay);
console.log(daysPerMonth);
console.log(mes);

for (let i = 1; i < firstMonthDay + daysPerMonth; i++) {
    let day = document.createElement("div");
    if (i >= firstMonthDay) {
        day.innerHTML = 1 + i - firstMonthDay;
    }
    calendar.appendChild(day);
}

var btnNewAct = document
    .getElementById("addActivity")
    .addEventListener("click", newTask);

var btnCancel = document
    .getElementById("cancel")
    .addEventListener("click", cancelTask);

function newTask() {
    var modal = document.getElementById("modal-container");
    // var inputs = document.querySelectorAll("input");
    // for (let i = 0; i < inputs.length; i++) {
    //     inputs[i].setAttribute("required");
    // }
    modal.classList.replace("display-none", "modal-display-on");
}

function cancelTask() {
    var inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].removeAttribute("required");
    }
    modal.classList.replace("modal-display-on", "display-none");
}