var btnNewAct = document
    .getElementById("addActivity")
    .addEventListener("click", newTask);

var btnCancel = document
    .getElementById("cancel")
    .addEventListener("click", cancelTask);

var closeBtn = document
    .getElementById("close")
    .addEventListener("click", cancelTask);

var saveBtn = document
    .getElementById("save")
    .addEventListener("click", validationForm);

document.addEventListener("keyup", (e) => {
    if (e.key == "Escape") {
        cancelTask();
    }
});

document.addEventListener("click", (e) => {
    if (e.target === modal) {
        cancelTask();
    }
});

document.getElementById("forward").addEventListener("click", nextMonth);
document.getElementById("backward").addEventListener("click", previousMonth);
document.getElementById("forwYear").addEventListener("click", nextYear);
document.getElementById("backYear").addEventListener("click", previousYear);

document.getElementById("clock-btn").addEventListener("click", checkClock);