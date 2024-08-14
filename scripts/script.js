// safeserviceModal
const modalBtn = document.querySelector("#modalBtn");
const closeItems = document.querySelectorAll(".closeBtn, .modal-back");

modalBtn.addEventListener("click", () => {
  const safeserviceModal = document.querySelector("#safeserviceModal");

  safeserviceModal.classList.add("active");
  closeItems[1].classList.add("active");
});

closeItems.forEach((item) => {
  item.addEventListener("click", () => {
    safeserviceModal.classList.remove("active");
    closeItems[1].classList.remove("active");
  });
});

const mainSlideInfo = "../mainslide.json";
fetch(mainSlideInfo)
  .then((response) => response.json())
  .then((mainSlideData) => {
    mainSlideData.data.forEach((slide) => {
      const mainSlideUl = document.querySelector(".mainSlideWrapper");
      const liItem = document.createElement("li");
      const aTag = document.createElement("a");
      const slideDesc = document.createElement("div");

      aTag.setAttribute("href", "#none");
      aTag.style.background = `url(../images/${slide.img}) center/cover no-repeat`;
      slideDesc.className = "main-slide-desc";

      const desc = `
                    <h2>
                    ${slide.title}
                    </h2>
                    <p>
                     ${slide.sub}
                      <i class="fa-solid fa-angle-right"></i>
                    </p>
      `;

      slideDesc.innerHTML = desc;
      aTag.appendChild(slideDesc);
      liItem.appendChild(aTag);
      mainSlideUl.appendChild(liItem);
    });
  })
  .catch((error) => {
    alert(error);
  });

// Testin moving to detail.html
const joonggoInfo = "../db.json";
const rankingSlides = document.querySelectorAll(".slideWrapper > li");

const addProduct = (product, liItem, aTag, slideImg, slideDesc) => {
  slideImg.style.background = `url(../${product.image_path}) center/cover no-repeat`;

  const desc = `
              <h4 class="desc-title">
                ${product.title}
              </h4>
              <strong class="desc-price">
                ${product.price}
              </strong>
              <p class="desc-info">
                <span class="desc-time">${product.time}</span>
                <span class="desc-place">
                ${product.point ? " | " + product.point : ""}
                </span>
              </p>
        `;

  slideDesc.innerHTML = desc;
  aTag.append(slideImg, slideDesc);
  liItem.appendChild(aTag);
};

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    joongoData.data.forEach((product, index) => {
      const liItem = document.createElement("li");
      const aTag = document.createElement("a");
      const slideImg = document.createElement("div");
      const slideDesc = document.createElement("div");

      slideImg.className = "slide-img";
      slideDesc.className = "slide-desc";
      aTag.setAttribute("href", "#none");

      //here

      if (index < 8) {
        addProduct(product, liItem, aTag, slideImg, slideDesc);
        document.querySelector(".bestRankingUl").appendChild(liItem);
      } else if (index < 14) {
        addProduct(product, liItem, aTag, slideImg, slideDesc);
        document.querySelector(".auctionUl").appendChild(liItem);
      } else if (index < 22) {
        addProduct(product, liItem, aTag, slideImg, slideDesc);
        document.querySelector(".recommendedUl").appendChild(liItem);
      }

      // 동훈님
      rankingSlides.forEach((rankingSlide) => {
        rankingSlide.addEventListener("click", () => {
          const url = `pages/detail.html?id=${encodeURIComponent(179612232)}`;
          window.location.href = url;
        });
      });
    });
  });
