//?-------------------------------------------- static void Main(string[] args) ----------------------------------------------------\\

drawCalendar(firstDay, monthLength);
drawTask();

var dayStyle = document.querySelectorAll(".day-style");
for (const day of dayStyle) {
  day.addEventListener("mouseover", hoveringIn);
  day.addEventListener("mouseout", hoveringOut);
}

function hoveringIn(event) {
  var btn;
  if (event.target.matches(".day-style")) {
    btn = event.target;
  }

  var button = document.createElement("button");
  button.classList.add("add-button");
  button.setAttribute("id", "button-" + btn.id);
  button.innerHTML = "+";
  btn.appendChild(button);
  btn.classList.toggle("looking");
}

function hoveringOut(e) {
  let btn = e.target;
  btn.classList.toggle("looking");
  document.getElementById("button-" + btn.id).remove();
}
