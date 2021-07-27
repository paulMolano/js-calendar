function drawCalendar(firstDaytoDraw, monthLength) {
  let monthDays = document.getElementById("days");
  monthDays.innerHTML = "";
  if (
    (firstDaytoDraw == 6 && monthLength == 31) ||
    (firstDaytoDraw == 7 && monthLength >= 30)
  ) {
    n = 42;
  } else if (firstDaytoDraw == 1 && monthLength == 28) {
    n = 28;
  } else {
    n = 35;
  }

  for (let i = 1; i <= n; i++) {
    var square = document.createElement("div");
    if (i >= firstDaytoDraw && i < firstDaytoDraw + monthLength) {
      var str = 1 + i - firstDaytoDraw;
      str < 10 ? (str = "0" + str) : str;
      square.setAttribute("id", str);
      square.innerHTML = 1 + i - firstDaytoDraw;
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
  if (getCurrentTime().month == mm && getCurrentTime().year == yyyy) {
    document.getElementById(getCurrentTime().day).style.fontWeight = "bold";
    let color = getComputedStyle(document.documentElement).getPropertyValue(
      "--color"
    );

    document.getElementById(getCurrentTime().day).style.border =
      "solid " + color + " 4px";
  }
}
