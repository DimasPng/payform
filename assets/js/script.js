const countdownElement = document.querySelector(".payment__countdown");
const hoursElement = document.querySelector(".hours");
const minutesElement = document.querySelector(".minutes");
const secondElement = document.querySelector(".seconds");

// Проверяем, есть ли уже уникальный ключ в localStorage
let pageKey = localStorage.getItem("pageKey");
let currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
let savedTime = localStorage.getItem(pageKey); // Время, сохраненное в localStorage

if (!pageKey || !savedTime) {
  pageKey = generateUniqueKey();
  localStorage.setItem("pageKey", pageKey);
  savedTime = currentTime + 20 * 60; // Устанавливаем 20 минут от текущего времени, если ключ или сохраненное время отсутствуют
} else {
  savedTime = parseInt(savedTime); // Преобразуем сохраненное время в число
}

let timeRemaining = Math.max(0, savedTime - currentTime); // Вычисляем оставшееся время

const updateCountdown = function () {
  const hours = Math.floor((timeRemaining % 86400) / 3600);
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  hoursElement.textContent = String(hours + ":").padStart(2, "0");
  minutesElement.textContent = String(minutes + ":").padStart(2, "0");
  secondElement.textContent = String(seconds).padStart(2, "0");
};

// Добавляем проверку, было ли время уже истекшим при загрузке страницы
if (timeRemaining > 0) {
  const countdownInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining -= 1;
      updateCountdown();
      localStorage.setItem(pageKey, currentTime + timeRemaining); // Сохраняем оставшееся время в localStorage с учетом текущего времени
    } else {
      clearInterval(countdownInterval);
      countdownElement.textContent = "00:00:00";
      //localStorage.removeItem(pageKey); // Если удалим запись, при обновлении странички, таймер запуститься заново
    }
  }, 1000); // Интервал в миллисекундах (1 секунда)
} else {
  countdownElement.textContent = "00:00:00"; // Устанавливаем текст "00:00:00", если время уже истекло
}

function generateUniqueKey() {
  return "timer_" + Date.now() + "_" + Math.random();
}
