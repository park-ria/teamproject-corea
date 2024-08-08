const JoonggoInfo = "../db.json";
const rankingSlides = document.querySelectorAll(".ranking-slide > li");

fetch(JoonggoInfo)
  .then((response) => response.json())
  .then((JoongoData) => {
    JoongoData.data.forEach((product) => {

      
      rankingSlides.forEach((rankingSlide) => {
        rankingSlide.addEventListener("click", () => {
          const url = `detail.html?id=${encodeURIComponent(179612232)}`;
          window.location.href = url;
        });
      })
    });
  });
