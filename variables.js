const day = new Date();
var dd = String(day.getDate()).padStart(2, "0");
var mm = String(day.getMonth() + 1).padStart(2, "0");
var yyyy = day.getFullYear();
var firstDay = new Date(mm + " 01, " + yyyy + " 00:00:00").getDay();
var monthLength = new Date(yyyy, mm, 0).getDate();
