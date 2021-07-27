function newDay() {
  const day = new Date();
  let currentHours = day.getHours();
  let currentMinutes = day.getMinutes();
  console.log(currentHours, currentMinutes);
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
