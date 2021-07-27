function showPopup(expMinutes, title) {
  //? Active and fill the reminder popup
  document.getElementById(
    "popup-text"
  ).innerHTML = `Aviso,quedan ${expMinutes} minutos para ${title}`;
  document.getElementById("popup").style.display = "block";
  var audio = new Audio("src/sound/alarm.ogg");
  audio.play();
  document.getElementById("time-up").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
  });
}

function hoveringIn(event) {
  //? toggle class & create add button in square hovered
  var btn = event.target;
  btn.classList.toggle("looking");
  if (btn.classList == "day-style looking") {
    var button = document.createElement("button");
    button.classList.add("add-button");
    button.setAttribute("id", "add-" + btn.id);
    button.innerHTML = "+";
    btn.appendChild(button);
  }
}

function hoveringOut(e) {
  //? toggle class & destroy add button in square unhovered
  let btn = e.target;
  btn.classList.toggle("looking");
  let addbtn = document.getElementById("add-" + btn.id);
  addbtn ? addbtn.remove() : false;
}
