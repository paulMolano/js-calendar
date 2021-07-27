//?-------------------------------------------- static void Main(string[] args) ----------------------------------------------------\\
drawCalendar(firstDay, monthLength); //* Draw the squares and fill them according to the month
drawTask(); //* Draw all task from this month and active the reminders of today
newDay();
//* calculate how much time is left until the next day and sets the timeout for repainting and resetting reminders.
