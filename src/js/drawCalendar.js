function drawCalendar(firstDay, monthLength) {
  //? Draw & fill squares
  let monthDays = document.getElementById("days");
  monthDays.innerHTML = ""; //*to redraw prev./next month
  if (
    //*set how many squares have to draw
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
      square.addEventListener("click", newTaskpreDay);
      square.addEventListener("mouseover", hoveringIn);
      square.addEventListener("mouseout", hoveringOut);
      square.setAttribute("class", "day-style");
    }
    monthDays.appendChild(square);
  }
  todayIs(); //* change today square style

  document.getElementById("calendar").style.opacity = 1; //* effect for change month
}

function todayIs() {
  //? change today square style
  if (getCurrentTime().month == mm && getCurrentTime().year == yyyy) {
    document.getElementById(getCurrentTime().day).style.fontWeight = "bold";
    let color = getComputedStyle(document.documentElement).getPropertyValue(
      "--color"
    );

    document.getElementById(getCurrentTime().day).style.border =
      "solid " + color + " 4px";
  }
}
