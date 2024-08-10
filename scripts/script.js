// safeserviceModal
const safeService = document.querySelector("#safe-service");

safeService.addEventListener("click", () => {
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
    JoongoData.data.forEach((product) => {

      
      rankingSlides.forEach((rankingSlide) => {
        rankingSlide.addEventListener("click", () => {
          const url = `pages/detail.html?id=${encodeURIComponent(179612261)}`;
          window.location.href = url;
        });
      })
    });
  });

