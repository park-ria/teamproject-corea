// safeserviceModal
const modalBtn = document.querySelector("#modalBtn");

modalBtn.addEventListener("click", () => {
  const safeserviceModal = document.querySelector("#safeserviceModal");
  const closeBtn = safeserviceModal.querySelector(".closeBtn");

  safeserviceModal.classList.add("active");

  closeBtn.addEventListener("click", () => {
    safeserviceModal.classList.remove("active");
  });
});

// Testin moving to detail.html
const JoonggoInfo = "../db.json";
const rankingSlides = document.querySelectorAll(".slideWrapper > li");

fetch(JoonggoInfo)
  .then((response) => response.json())
  .then((JoongoData) => {
    JoongoData.product.forEach((product) => {
      rankingSlides.forEach((rankingSlide) => {
        rankingSlide.addEventListener("click", () => {
          const url = `pages/detail.html?id=${encodeURIComponent(181267888)}`;
          window.location.href = url;
        });
      });
    });
  });
