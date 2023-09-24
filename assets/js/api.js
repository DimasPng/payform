document.addEventListener("DOMContentLoaded", function () {
  const fetchDataButton = document.getElementById("testBtn");

  fetchDataButton.addEventListener("click", function () {
    fetch("https://online-mind.store/qiwi.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  });
});
