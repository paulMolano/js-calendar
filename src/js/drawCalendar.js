function drawCalendar(firstDay, monthLength) {
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
}
