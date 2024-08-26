const joonggoInfo = "../db.json";

let slideIndex = 0;
//let slidesPerView = 3;
/*let slidesPerView = matchMedia("screen and (min-width: 1280px)").matches
  ? 3
  : 2;*/

if (matchMedia("screen and (min-width: 1280px)").matches) {
  slidesPerView = 3;
} else {
  slidesPerView = 1;
}
// else if (matchMedia("screen and (min-width: 500px)").matches) {
//   slidesPerView = 2;
// } else if (matchMedia("screen and (max-width: 500px)").matches) {
//   slidesPerView = 1;
// }

const productSlideLimit = 10;

const addBestProduct = (product, ul) => {
  const ulItem = document.querySelector(ul);
  const liItem = document.createElement("li");
  const aTag = document.createElement("a");
  const slideImg = document.createElement("div");
  const slideDesc = document.createElement("div");
  const badge = document.createElement("span");
  badge.className = "badge badge-auction";

  aTag.setAttribute("href", `/pages/detail.html?id=${product.id}`);
  // aTag.style.webkitUserDrag = "none";

  slideImg.className = "slide-img";

  const timeEvent = document.createElement("div");
  timeEvent.className = "timeEvent";

  slideDesc.className = "slide-desc";

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
  slideImg.appendChild(timeEvent);
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
  // const slideWidth = 410;
  // const slideMargin = 25;

  let currentIdx = 0;
  // move pager
  pagers[0].classList.add("active");
  const movePager = (index) => {
    for (let pager of pagers) {
      pager.classList.remove("active");
    }
    pagers[index].classList.add("active");
    // console.log(index);
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

  // const moveSlide = (num) => {
  //   currentIdx = num;
  //   const keyIndex = slideCount - slidesPerView + 1;
  //   const showIndex = (keyIndex + num) % keyIndex;
  //   movePager(showIndex);

  //   slideUl.style.left = `${-num * (slideWidth + slideMargin)}px`;

  //   if (currentIdx === keyIndex) {
  //     slideUl.style.left = 0;
  //     currentIdx = 0;
  //   }
  //   if (currentIdx === -1) {
  //     slideUl.style.left = `-${
  //       (slideWidth + slideMargin) * (slideCount - slidesPerView)
  //     }px`;
  //     currentIdx = slideCount - slidesPerView;
  //   }
  // };

  const moveSlide = (num) => {
    if (num < 0 || num >= slideCount) return;

    const slideWidth = slideUl.querySelectorAll("li>a")[0].offsetWidth;
    const slideMargin = 25;
    const currentSlideWidth = (slideCount - num) * (slideWidth + slideMargin);
    const clientWidth = slideUl.parentElement.clientWidth;

    if (currentSlideWidth >= clientWidth) {
      currentIdx = num;
      movePager(currentIdx);
      slideUl.style.transform = `translateX(${
        -num * (slideWidth + slideMargin)
      }px)`;
    } else if (clientWidth - currentSlideWidth < slideWidth - slideMargin) {
      currentIdx = num;
      movePager(currentIdx);
      slideUl.style.transform = `translateX(${
        -(num - 1) * (slideWidth + slideMargin) -
        slideWidth +
        (clientWidth - currentSlideWidth)
      }px)`;
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
    // slide.querySelectorAll("a").style.cursor = "grabbing";
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

// function mediaResize() {
//   if (window.innerWidth < 450) {
// }
// }
// window.addEventListener("resize", mediaResize);

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
