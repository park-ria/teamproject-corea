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

// Testin moving to detail.html
const joonggoInfo = "../db.json";
const rankingSlides = document.querySelectorAll(".slideWrapper > li");

// add main slide item

// add product slide item
const addProduct = (product, index, ul) => {
  const ulItems = document.querySelector(ul);
  const liItem = document.createElement("li");
  const aTag = document.createElement("a");
  const slideImg = document.createElement("div");
  const slideDesc = document.createElement("div");

  slideImg.className = "slide-img";
  slideDesc.className = "slide-desc";
  aTag.setAttribute("href", "#none");

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
  ulItems.appendChild(liItem);

  // 페이저 생성
  const slidePager =
    ulItems.parentElement.nextElementSibling.querySelector(".slidePager");
  const spanTag = document.createElement("span");
  slidePager.appendChild(spanTag);
};

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    // mainSlide
    joongoData.mainSlide.forEach((slide) => {
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

    // data
    joongoData.data.forEach((product, index) => {
      // add product slide
      if (index < 8) {
        addProduct(product, index, ".bestRankingUl");
      } else if (index < 14) {
        addProduct(product, index, ".auctionUl");
      } else if (index < 22) {
        addProduct(product, index, ".recommendedUl");
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
