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

const mainSlideUl = document.querySelector(".mainSlideWrapper");

// add main slide item
const addMainSlide = (slide, index) => {
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
};

// mainSlide
const mainSlide = () => {
  const preBtn = document.querySelector(".mainSlidePrev");
  const nextBtn = document.querySelector(".mainSlideNext");

  const mainSlide = document.querySelectorAll(".mainSlideWrapper li");
  const slideWidth = 420;
  const slideMargin = 10;
  const slideCount = mainSlide.length;

  let currentIdx = 0;

  const updateWidth = () => {
    const currentSlides = document.querySelectorAll(".mainSlideWrapper li");
    const newSlideCount = currentSlides.length;
    const newWidth = `
    ${(slideWidth + slideMargin) * newSlideCount - slideMargin}px
    `;
  };

  const setInitialPos = () => {
    const initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
    mainSlideUl.style.transform = `translateX(${initialTranslateValue}px)`;
  };

  const makeClone = () => {
    for (let i = 0; i < slideCount; i++) {
      const cloneSlide = mainSlide[i].cloneNode(true);
      cloneSlide.classList.add("clone");
      mainSlideUl.prepend(cloneSlide);
    }
    for (let i = slideCount - 1; i >= 0; i--) {
      const cloneSlide = mainSlide[i].cloneNode(true);
      cloneSlide.classList.add("clone");
      mainSlideUl.prepend(cloneSlide);
    }
    updateWidth();
    setInitialPos();
  };
};

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

  // pager
  const slidePager =
    ulItems.parentElement.nextElementSibling.querySelector(".slidePager");
  const spanTag = document.createElement("span");
  slidePager.appendChild(spanTag);
};

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    // mainSlide add
    joongoData.mainSlide.forEach((slide, index) => {
      addMainSlide(slide, index);
    });

    // mainSlide run
    mainSlide();

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

// event slide
const eventSlideUl = document.querySelector(".event-slide ul");
const eventImgs = [
  "images/event-banner01.png",
  "images/event-banner02.png",
  "images/event-banner03.png",
  "images/event-banner04.png",
  "images/event-banner05.png",
  "images/event-banner06.png",
];
eventImgs.forEach((img) => {
  const liItem = document.createElement("li");
  const aTag = document.createElement("a");
  aTag.style.background = `url(../${img}) center/cover no-repeat`;
  liItem.appendChild(aTag);
  eventSlideUl.appendChild(liItem);
});

const listClientWidth = eventSlideUl.clientWidth;
const listScrollWidth = eventSlideUl.clientWidth + 1280;

let startX = 0;
let nowX = 0;
let endX = 0;
let listX = 0;

const getClientX = (e) => {
  return e.touches ? e.touches[0].clientX : e.clientX;
};

const getTranslateX = () => {
  return parseInt(
    getComputedStyle(eventSlideUl).transform.split(/[^\-0-9]+/g)[5]
  );
};

const setTranslateX = (x) => {
  eventSlideUl.style.transform = `translateX(${x}px)`;
};

const onScrollMove = (e) => {
  nowX = getClientX(e);

  setTranslateX(listX + nowX - startX);
};

const onScrollEnd = (e) => {
  endX = getClientX(e);

  listX = getTranslateX();

  if (listX > 0) {
    setTranslateX(0);
    eventSlideUl.style.transition = `all 0.1s ease`;
    listX = 0;
  } else if (listX < listClientWidth - listScrollWidth) {
    setTranslateX(listClientWidth - listScrollWidth);
    eventSlideUl.style.transition = `all 0.1s ease`;
    listX = listClientWidth - listScrollWidth;
  }

  window.removeEventListener("touchmove", onScrollMove);
  window.removeEventListener("mousemove", onScrollMove);
  window.removeEventListener("touchend", onScrollEnd);
  window.removeEventListener("mouseup", onScrollEnd);
  window.removeEventListener("touchstart", onscrollStart);
  window.removeEventListener("mousedown", onscrollStart);
};

const onscrollStart = (e) => {
  startX = getClientX(e);

  window.addEventListener("touchmove", onScrollMove);
  window.addEventListener("mousemove", onScrollMove);

  window.addEventListener("touchend", onScrollEnd);
  window.addEventListener("mouseup", onScrollEnd);
};

eventSlideUl.addEventListener("touchstart", onscrollStart);
eventSlideUl.addEventListener("mousedown", onscrollStart);
