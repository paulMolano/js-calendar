function showPopup(expMinutes, title) {
    //? Active and fill the reminder popup
    document.getElementById(
        "popup-text"
    ).innerHTML = `Aviso,quedan ${expMinutes} minutos para ${title}`;
    document.getElementById("popup").style.display = "block";
    var audio = new Audio("src/sound/alarm.ogg");
    audio.play();
    document.getElementById("time-up").addEventListener("click", function() {
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

/*Color picker*/

const inputss = document.querySelectorAll(".personalize");

function theChange() {
    const pixels = this.dataset.sizing || "";
    document.documentElement.style.setProperty(
        `--${this.name}`,
        this.value + pixels
    );
    todayIs();
}

inputss.forEach((input) => input.addEventListener("change", theChange));

/*CLOCK*/

var secondsPalo = document.querySelector(".seconds");
var minutesPalo = document.querySelector(".mins");
var hoursPalo = document.querySelector(".hour");

function setTime() {
    var now = new Date();
    var chipiron = now.getSeconds();
    var secondChipiron = (chipiron / 60) * 360 + 90;
    secondsPalo.style.transform = `rotate(${secondChipiron}deg)`;

    var calamar = now.getMinutes();
    var minsChipiron = (calamar / 60) * 360 + 90;
    minutesPalo.style.transform = `rotate(${minsChipiron}deg)`;

    var pulpo = now.getHours();
    var hoursChipiron = (pulpo / 12) * 360 + 90;
    hoursPalo.style.transform = `rotate(${hoursChipiron}deg)`;
}

setInterval(setTime, 1000);

const clockModal = document.querySelector("#clock-container");
window.addEventListener("click", removeClock);

function checkClock() {
    clockModal.classList.replace("display-none", "modal-display-on");
}

function removeClock(e) {
    if (e.target === clockModal) {
        clockModal.classList.replace("modal-display-on", "display-none");
    }
}