/* GLOBAL VARIABLES */
let storage = window.localStorage;
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* DATE VARIABLES */
const day = new Date();
var dd = String(day.getDate());
var mm = String(day.getMonth() + 1).padStart(2, "0");
var yyyy = day.getFullYear();
var firstDay = new Date(mm + " 01, " + yyyy + " 00:00:00").getDay();
firstDay == 0 ? (firstDay = 7) : firstDay;
var monthLength = new Date(yyyy, mm, 0).getDate();

/* SELECTOR VARIABLES */
var modal = document.getElementById("modal-container");
var inputs = document.querySelectorAll("input");
var modal2 = document.getElementById("modal-container2");

/*TODAY*/
let today = document.getElementById("todayIs");
today.innerHTML = dd + " / " + mm + " / " + yyyy;

let calendar = document.getElementById("calendarTitle");
calendar.innerHTML = monthNames[day.getMonth()] + " " + yyyy;
