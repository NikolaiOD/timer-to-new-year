// Написати таймер зворотнього відліку до Нового року який можна зупиняти при кліку на кнопку **Stop**

// Стилі і розмітку можна брати тут -

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdown

const timeEl = document.getElementById("time");
const stopBtnEl = document.getElementById("stopBtn");
const continueBtnEl = document.getElementById("continueBtn");

/*
  Новий рік - 1 січня 00:00 2024
  Сьогоднішня дата - 18 січня 20:20 2023

  будемо використовувати setInterval() для роботи лічільника

  1. від Нового року відняти поточну дату - таким чином ми отримаємо різницю в часі (будемо працювати з мілісекундами)
  2. з тих мілісекунд, що отримали у кроці 1 витягнемо кількість днів, годин, хвилин і секунд, які лишились до Нового року
  3. показати ці дані користувачу на сторінці

*/

let isTimerRun = true;
const newYearDate = new Date(`Jan 1, ${new Date().getFullYear() + 1}`);

countDownTimeToNY();
let timerId = setInterval(countDownTimeToNY, 1000);

stopBtnEl.addEventListener("click", () => {
  stopInterval();
  if (!isTimerRun) {
    continueBtnEl.disabled = false;
    continueBtnEl.addEventListener("click", continueInterval);
  }
});

function countDownTimeToNY() {
  const now = Date.now();
  const diff = newYearDate - now; // скільки мілісекунд лишилось до Нового року

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  timeEl.textContent = `${days} d. ${hours} h. ${minutes} m. ${seconds} s.`;

  if (diff <= 0) {
    stopInterval();
    timeEl.textContent = "Happy New Year!";
  }
}

function continueInterval() {
  isTimerRun = true;
  continueBtnEl.disabled = true;
  alert("Continue");
  timerId = setInterval(countDownTimeToNY, 1000);
}

function stopInterval() {
  isTimerRun = false;
  clearInterval(timerId);
  alert("The timer has been stopped!");
}
