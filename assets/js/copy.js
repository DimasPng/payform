// Получаем ссылки на элементы
const copyButton = document.getElementById("copy");
const inputField = document.getElementById("wallet");
const copiedMessage = document.getElementById("copied");

// Добавляем обработчик события клика на кнопку "Копировать"
copyButton.addEventListener("click", function () {
  // Выбираем текст в поле ввода
  inputField.select();

  try {
    // Копируем текст в буфер обмена с использованием Clipboard API
    navigator.clipboard
      .writeText(inputField.value)
      .then(function () {
        // Показываем сообщение "Скопировано"
        copiedMessage.style.display = "block";

        // Скрываем сообщение через некоторое время (например, через 2 секунды)
        setTimeout(function () {
          copiedMessage.style.display = "none";
        }, 3000);
      })
      .catch(function (err) {
        // В случае ошибки
        console.error("Копирование не удалось: ", err);
      });
  } catch (err) {
    // В случае ошибки, например, если браузер не поддерживает Clipboard API
    console.error("Копирование не удалось: ", err);
  }
});
