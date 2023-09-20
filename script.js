const countdownElement = document.querySelector(".payment__countdown");
const hoursElement = document.querySelector(".hours");
const minutesElement = document.querySelector(".minutes");
const secondElement = document.querySelector(".seconds");

// Проверяем, есть ли уже уникальный ключ в localStorage
let pageKey = localStorage.getItem("pageKey");

// Если нет ключа, то генерируем и сохраняем его
if (!pageKey) {
  pageKey = generateUniqueKey();
  localStorage.setItem("pageKey", pageKey);
}

let timeRemaining = localStorage.getItem(pageKey) || 20 * 60; // Получаем значение из localStorage или устанавливаем 20 минут в секундах

const updateCountdown = function () {
  const hours = Math.floor((timeRemaining % 86400) / 3600);
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  hoursElement.textContent = String(hours + ":").padStart(2, "0");
  minutesElement.textContent = String(minutes + ":").padStart(2, "0");
  secondElement.textContent = String(seconds).padStart(2, "0");
};

const countdownInterval = setInterval(() => {
  if (timeRemaining > 0) {
    timeRemaining -= 1;
    updateCountdown();
    localStorage.setItem(pageKey, timeRemaining); // Сохраняем оставшееся время в localStorage с уникальным ключом
  } else {
    clearInterval(countdownInterval);
    countdownElement.textContent = "00:00:00";
    localStorage.removeItem(pageKey); // Удаляем значение из localStorage, когда время истекло
  }
}, 1000); // Интервал в миллисекундах (1 секунда)

// Функция для генерации уникального ключа
function generateUniqueKey() {
  return "timer_" + Date.now() + "_" + Math.random();
}
