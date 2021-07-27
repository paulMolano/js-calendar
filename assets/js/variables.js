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
var dd = getCurrentTime().day;
var mm = getCurrentTime().month;
var currentHours = getCurrentTime().hours;
var currentMinutes = getCurrentTime().minutes;
var yyyy = getCurrentTime().year;
var firstDay = getCurrentTime().fDay;
firstDay == 0 ? (firstDay = 7) : firstDay;
var monthLength = getCurrentTime().mLength;

/* SELECTOR VARIABLES */
var modal = document.getElementById("modal-container");
var inputs = document.querySelectorAll("input");
var modal2 = document.getElementById("modal-container2");

/*TODAY*/
let today = document.getElementById("todayIs");
today.innerHTML = dd + " / " + mm + " / " + yyyy;
const day = new Date();
let calendar = document.getElementById("calendarTitle");
calendar.innerHTML = monthNames[day.getMonth()] + " " + yyyy;

/* DATE VARIABLES */
function getCurrentTime() {
  const day = new Date();
  var dd = String(day.getDate());
  var mm = String(day.getMonth() + 1).padStart(2, "0");
  var currentHours = day.getHours();
  var currentMinutes = day.getMinutes();
  var yyyy = day.getFullYear();
  var firstDay = new Date(mm + " 01, " + yyyy + " 00:00:00").getDay();
  firstDay == 0 ? (firstDay = 7) : firstDay;
  var monthLength = new Date(yyyy, mm, 0).getDate();
  let date = {
    day: dd,
    month: mm,
    year: yyyy,
    hours: currentHours,
    minutes: currentMinutes,
    fDay: firstDay,
    mLength: monthLength,
  };
  return date;
}
