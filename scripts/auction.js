const joonggoInfo = "../db.json";

let slideIndex = 0;
let slidesPerView = 3;
const productSlideLimit = 10;

const addBestProduct = (product, ul) => {
  const ulItem = document.querySelector(ul);
  const liItem = document.createElement("li");
  const aTag = document.createElement("a");
  const slideImg = document.createElement("div");
  const slideDesc = document.createElement("div");
  const badge = document.createElement("span");
  let badgeClassName = "";
  switch (ul) {
    case ".bestRankingUl":
      badgeClassName = "badge badge-best";
      break;
    case ".auctionUl":
      badgeClassName = "badge badge-auction";
      break;
    case ".recommendedUl":
      badgeClassName = "badge badge-new";
      break;
  }
  badge.className = badgeClassName;

  slideImg.className = "slide-img";
  slideDesc.className = "slide-desc";
  aTag.setAttribute("href", `/pages/detail.html?id=${product.id}`);
  // aTag.style.webkitUserDrag = "none";

  // <div class="timeEvent">
  //   <div class="clock"></div>
  //   <span>16 : 49 : 20</span>
  // </div>

  slideImg.style.background = `url(../${product.image_path}) center/cover no-repeat`;

  const desc = `
              <h4 class="desc-title">
                ${product.title}
              </h4>
              <strong class="desc-price">
                <span class="current">현재가</span> 215,000원
                <span class="fixed">${product.price}</span>
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
  liItem.appendChild(badge);
  ulItem.appendChild(liItem);

  // pager
  const slidePager =
    ulItem.parentNode.nextElementSibling.querySelector(".slidePager");
  if (slideIndex % productSlideLimit >= slidesPerView - 1) {
    const spanTag = document.createElement("span");
    slidePager.appendChild(spanTag);
  }
  slideIndex++;
};

// productSlide
const productSlide = (section) => {
  const slideSection = document.querySelector(section);
  const slideUl = slideSection.querySelector("ul");
  const slide = slideUl.querySelectorAll("li");
  const prevBtn = slideSection.querySelector(".slidePrev");
  const nextBtn = slideSection.querySelector(".slideNext");
  const pagers = slideSection.querySelectorAll(".slidePager span");

  const slideCount = slide.length;
  const slideWidth = 410;
  const slideMargin = 25;

  let currentIdx = 0;
  // move pager
  pagers[0].classList.add("active");
  const movePager = (index) => {
    for (let pager of pagers) {
      pager.classList.remove("active");
    }
    pagers[index].classList.add("active");
  };

  // click pager
  pagers.forEach((pager, index) => {
    pager.addEventListener("click", function () {
      pagers.forEach((sibling) => {
        if (sibling !== pager) sibling.classList.remove("active");
      });

      this.classList.add("active");
      currentIdx = index;
      moveSlide(index);
    });
  });

  const moveSlide = (num) => {
    currentIdx = num;
    const keyIndex = slideCount - slidesPerView + 1;
    const showIndex = (keyIndex + num) % keyIndex;
    movePager(showIndex);

    slideUl.style.left = `${-num * (slideWidth + slideMargin)}px`;

    if (currentIdx === keyIndex) {
      slideUl.style.left = 0;
      currentIdx = 0;
    }
    if (currentIdx === -1) {
      slideUl.style.left = `-${
        (slideWidth + slideMargin) * (slideCount - slidesPerView)
      }px`;
      currentIdx = slideCount - slidesPerView;
    }
  };

  prevBtn.addEventListener("click", () => {
    moveSlide(currentIdx - 1);
  });
  nextBtn.addEventListener("click", () => {
    moveSlide(currentIdx + 1);
  });

  // drag event
  let startPoint = 0;
  let endPoint = 0;

  slideUl.addEventListener("mousedown", (e) => {
    slideUl.style.cursor = "grabbing";
    startPoint = e.pageX;
  });

  slideUl.addEventListener("mouseup", (e) => {
    slideUl.style.cursor = "grab";
    endPoint = e.pageX;

    if (startPoint < endPoint) {
      moveSlide(currentIdx - 1);
    } else if (startPoint > endPoint) {
      moveSlide(currentIdx + 1);
    }
  });

  // touch event
  slideUl.addEventListener("touchstart", (e) => {
    startPoint = e.touches[0].pageX;
  });
  slideUl.addEventListener("touchend", (e) => {
    endPoint = e.changedTouches[0].pageX;
    if (startPoint < endPoint) {
      moveSlide(currentIdx - 1);
    } else if (startPoint > endPoint) {
      moveSlide(currentIdx + 1);
    }
  });
};

const addProductList = (product, ul) => {
  const ulItem = document.querySelector(ul);
  const liItem = document.createElement("li");
  const aTag = document.createElement("a");
  const slideImg = document.createElement("div");
  const slideDesc = document.createElement("div");
  const badge = document.createElement("span");
  badge.className = "badge badge-auction";

  slideImg.className = "slide-img";
  slideDesc.className = "slide-desc";
  aTag.setAttribute("href", `/pages/detail.html?id=${product.id}`);

  slideImg.style.background = `url(../${product.image_path}) center/cover no-repeat`;

  const desc = `
              <h4 class="desc-title">
                ${product.title}
              </h4>
              <strong class="desc-price">
                <span class="current">현재가</span> 215,000원
                <span class="fixed">${product.price}</span>
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
  liItem.appendChild(badge);
  ulItem.appendChild(liItem);
};

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    // data
    joongoData.product.forEach((product, index) => {
      // addBestProduct
      if (index < productSlideLimit) {
        addBestProduct(product, ".bestAuction");
      }
      // addProductList
      else if (index < productSlideLimit * 3) {
        addProductList(product, ".product");
      }
    });

    // productList run
    productSlide("#best-auction");
  });
