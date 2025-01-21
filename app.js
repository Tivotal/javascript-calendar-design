/* Created by Tivotal */

let currentDate = document.querySelector(".current-date");
let navIcons = document.querySelectorAll(".cal-nav span");
let dates = document.querySelector(".dates");

let months = [
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

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

let buildCal = () => {
  currentDate.innerText = `${months[month]} ${year}`;

  //get first day of the month
  let dayFirst = new Date(year, month, 1).getDay();

  //get last date of the month
  let lastdate = new Date(year, month + 1, 0).getDate();

  //get day of the last date of the month
  let dayLast = new Date(year, month, lastdate).getDay();

  //get last date of previous month
  let prevMonthLastDate = new Date(year, month, 0).getDate();

  let liTags = "";

  //add last dates of lost month
  for (let i = dayFirst; i > 0; i--) {
    liTags += `<li class="inactive">${prevMonthLastDate - i + 1}</li>`;
  }

  //add current month dates
  for (let i = 1; i <= lastdate; i++) {
    //check for today
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "active"
        : "";

    liTags += `<li class="${isToday}">${i}</li>`;
  }

  //add first dates of next month
  for (let i = dayLast; i < 6; i++) {
    liTags += `<li class="inactive">${i - dayLast + 1}</li>`;
  }

  dates.innerHTML = liTags;
};

buildCal();

navIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    month = icon.id === "prev" ? month - 1 : month + 1;

    //check if the month is out of range
    if (month < 0 || month > 11) {
      //set date to first day of month with new year
      date = new Date(year, month, new Date().getDate());

      year = date.getFullYear();

      month = date.getMonth();
    } else {
      //set date to current date
      date = new Date();
    }

    buildCal();
  });
});
