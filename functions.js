function drawCalendar(firstDay, monthLength) {
  //*funcion que pinta el calendario
  firstDay == 6 && monthLength == 31 ? (n = 42) : (n = 35); // si el dia 1 es Sábado y el mes tiene 31 pinta 42 casillas
  firstDay == 7 && monthLength >= 30 ? (n = 42) : (n = 35); // si el dia 1 es Dmingo y el mes tiene 30 o 31 pinta 42 casillas
  firstDay == 1 && monthLength == 28 ? (n = 28) : (n = 35); // si el dia 1 es Lunes y el mes tiene 28 pinta 42 casillas
  //! en este caso, corregir container border
  for (let i = 1; i <= n; i++) {
    var square = document.createElement("div"); //creamos un div
    if (i >= firstDay && i < firstDay + monthLength) {
      //si esta entre el primero del mes y  el primero del mes + dias del mes
      square.setAttribute("id", mm + "-" + (1 + i - firstDay)); //le añadimos el id para despues manejarlo
      square.innerHTML = 1 + i - firstDay; //pintamos el número de día
    }
    square.setAttribute("class", "day-style"); // le damos una clase para el CSS
    monthDays.appendChild(square); //lo añadimos.
  }
}
