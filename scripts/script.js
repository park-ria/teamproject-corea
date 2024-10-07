// Testin moving to detail.html
const joonggoInfo = "../db.json";
const rankingSlides = document.querySelectorAll(".slideWrapper > li");

const mainSlideUl = document.querySelector(".mainSlideWrapper");
// add main slide item
const addMainSlide = (slide, index) => {
  const liItem = document.createElement("li");
  const aTag = document.createElement("span");
  const slideDesc = document.createElement("div");

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

  slideDesc.insertAdjacentHTML("afterbegin", desc);
  aTag.appendChild(slideDesc);
  liItem.appendChild(aTag);
  mainSlideUl.appendChild(liItem);
};

// mainSlide
const mainSlide = () => {
  const pagers = document.querySelector(".mainSlidePager");

  const preBtns = document.querySelectorAll(".mainSlidePrev");
  const nextBtns = document.querySelectorAll(".mainSlideNext");
  const pauseBtn = document.querySelector(".mainSlidePause");
  const playBtn = document.querySelector(".mainSlidePlay");

  const mainSlide = document.querySelectorAll(".mainSlideWrapper li");
  const slideWidth = 420;
  const slideMargin = 10;
  const slideCount = mainSlide.length;
  const cloneCount = 4;

  let currentIdx = 0;

  const updateWidth = () => {
    const currentSlides = document.querySelectorAll(".mainSlideWrapper li");
    const newSlideCount = currentSlides.length;

    const newWidth = `
    ${(slideWidth + slideMargin) * newSlideCount - slideMargin}px
    `;
    mainSlideUl.style.width = newWidth;
  };

  const setInitialPos = () => {
    const initialTranslateValue = -(slideWidth + slideMargin) * cloneCount;
    mainSlideUl.style.transform = `translateX(${initialTranslateValue}px)`;
  };

  const makeClone = () => {
    for (let i = 0; i < cloneCount; i++) {
      const cloneSlide = mainSlide[i].cloneNode(true);
      cloneSlide.classList.add("clone");
      mainSlideUl.appendChild(cloneSlide);
    }
    for (let i = slideCount - 1; i >= slideCount - cloneCount; i--) {
      const cloneSlide = mainSlide[i].cloneNode(true);
      cloneSlide.classList.add("clone");
      mainSlideUl.prepend(cloneSlide);
    }
    updateWidth();
    setInitialPos();
    setTimeout(() => {
      mainSlideUl.classList.add("animated");
    }, 100);
  };
  makeClone();

  const moveSlide = (num) => {
    const moveSlideCount = matchMedia("screen and (min-width: 1280px)").matches
      ? 3
      : 1;
    const pagerRate = matchMedia("screen and (min-width: 1280px)").matches
      ? 3
      : 9;
    const showIndex =
      (slideCount / moveSlideCount + num) % (slideCount / moveSlideCount);

    mainSlideUl.style.left = `${
      -num * (slideWidth + slideMargin) * moveSlideCount
    }px`;

    currentIdx = num;

    if (currentIdx === slideCount / moveSlideCount || currentIdx === -1) {
      setTimeout(() => {
        mainSlideUl.classList.remove("animated");
        mainSlideUl.style.left =
          num > 0
            ? "0px"
            : `${-showIndex * (slideWidth + slideMargin) * moveSlideCount}px`;
        currentIdx = num > 0 ? 0 : slideCount / moveSlideCount - 1;
      }, 500);

      setTimeout(() => {
        mainSlideUl.classList.add("animated");
      }, 600);
    }
    const pager = pagers.querySelector("span");
    pager.style.width = `calc(100% / ${pagerRate} * (${showIndex + 1}))`;

    pauseBtn.classList.remove("active");
    playBtn.classList.remove("active");
  };

  preBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      moveSlide(currentIdx - 1);
    });
  });
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      moveSlide(currentIdx + 1);
    });
  });

  let timer = undefined;

  const autoSlide = () => {
    if (timer === undefined) {
      timer = setInterval(() => {
        moveSlide(currentIdx + 1);
      }, 4000);
    }
  };
  autoSlide();

  const stopSlide = () => {
    clearInterval(timer);
    timer = undefined;
  };

  mainSlideUl.addEventListener("mouseenter", () => {
    stopSlide();
  });
  mainSlideUl.addEventListener("mouseleave", () => {
    autoSlide();
  });
  preBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      stopSlide();
    });
  });
  preBtns.forEach((btn) => {
    btn.addEventListener("mouseleave", () => {
      autoSlide();
    });
  });
  nextBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      stopSlide();
    });
  });
  nextBtns.forEach((btn) => {
    btn.addEventListener("mouseleave", () => {
      autoSlide();
    });
  });
  pauseBtn.addEventListener("click", function () {
    stopSlide();
    playBtn.classList.add("active");
    this.classList.add("active");
  });
  playBtn.addEventListener("click", function () {
    autoSlide();
    pauseBtn.classList.remove("active");
    this.classList.remove("active");
  });

  // mouse drag event
  let startPoint = 0;
  let endPoint = 0;

  mainSlideUl.addEventListener("mousedown", function (e) {
    this.style.cursor = "grabbing";
    startPoint = e.pageX;
  });

  mainSlideUl.addEventListener("mouseup", function (e) {
    this.style.cursor = "grab";
    endPoint = e.pageX;
    if (startPoint < endPoint) moveSlide(currentIdx - 1);
    else if (startPoint > endPoint) moveSlide(currentIdx + 1);
  });

  // mobile touch event
  mainSlideUl.addEventListener("touchstart", (e) => {
    startPoint = e.touches[0].pageX;
  });
  mainSlideUl.addEventListener("touchend", (e) => {
    endPoint = e.changedTouches[0].pageX;
    if (startPoint < endPoint) moveSlide(currentIdx - 1);
    else if (startPoint > endPoint) moveSlide(currentIdx + 1);
  });
};

// add product slide item
let slideIndex = 0;
let slidesPerView = 5;
const productSlideLimit = 10;

if (matchMedia("screen and (min-width: 1280px)").matches) {
  slidesPerView = 5;
} else if (matchMedia("screen and (min-width: 1075px)").matches) {
  slidesPerView = 4;
} else if (matchMedia("screen and (min-width: 800px)").matches) {
  slidesPerView = 3;
} else if (matchMedia("screen and (min-width: 531px)").matches) {
  slidesPerView = 2;
} else {
  slidesPerView = 1;
}

const addProduct = (product, ul) => {
  const ulItem = document.querySelector(ul);
  const liItem = document.createElement("li");
  const aTag = document.createElement("a");
  const slideImgWrap = document.createElement("div");
  const slideImg = document.createElement("div");
  const slideDesc = document.createElement("div");
  // const badge = document.createElement("span");
  // let badgeClassName = "";
  // switch (ul) {
  //   case ".bestRankingUl":
  //     badgeClassName = "badge badge-best";
  //     break;
  //   // case ".auctionUl":
  //   //   badgeClassName = "badge badge-auction";
  //   //   break;
  //   case ".recommendedUl":
  //     badgeClassName = "badge badge-new";
  //     break;
  // }
  // badge.className = badgeClassName;

  slideImgWrap.className = "slideImgWrap";
  slideImg.className = "slide-img";
  slideDesc.className = "slide-desc";

  slideImg.style.background = `url(../${product.image_path}) center/cover no-repeat`;

  if (ul === ".auctionUl") {
    // currentPrice
    const originPrice = Number(
      product.price.replace(/,/g, "").replace("원", "")
    );
    const saleNum = Math.floor(Math.random() * 31);
    const salePrice = Math.floor(originPrice * (saleNum / 100));
    const resultPrice = originPrice - salePrice;
    const currentPrice = new Intl.NumberFormat("ko-kr", {
      currency: "KRW",
    }).format(resultPrice);

    const desc = `
  <h4 class="desc-title">
    ${product.title}
  </h4>
  <strong class="desc-price">
    <span class="current">현재가</span> ${currentPrice}원
    <span class="fixed">${product.price}</span>
  </strong>
  <p class="desc-info">
    <span class="desc-time">${product.time.replace("전", "후 종료")}</span>
    <span class="desc-place">
    ${product.point ? " | " + product.point : ""}
    </span>
  </p>
`;
    slideDesc.insertAdjacentHTML("afterbegin", desc);

    aTag.setAttribute(
      "href",
      `/pages/detail.html?id=${product.id}&price=${currentPrice}`
    );
  } else {
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
    slideDesc.insertAdjacentHTML("afterbegin", desc);

    aTag.setAttribute("href", `/pages/detail.html?id=${product.id}`);
  }

  slideImgWrap.appendChild(slideImg);
  aTag.append(slideImgWrap, slideDesc);
  liItem.appendChild(aTag);
  // liItem.appendChild(badge);
  ulItem.appendChild(liItem);

  // pager
  const slidePager =
    ulItem.parentElement.nextElementSibling.querySelector(".slidePager");
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

  prevBtn.classList.add("disabled");

  const slideCount = slide.length;

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

  const moveSlide = (num) => {
    if (num < 0 || num >= slideCount) return;

    const slideWidth = slideUl.querySelectorAll("li>a")[0].offsetWidth;
    const slideMargin = 20;
    const currentSlideWidth = (slideCount - num) * (slideWidth + slideMargin);
    const clientWidth = slideUl.parentElement.clientWidth;

    if (currentIdx > num || currentSlideWidth >= clientWidth) {
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

    if (num === 0) {
      prevBtn.classList.add("disabled");
      nextBtn.classList.remove("disabled");
    } else if (
      num === slideCount - slidesPerView ||
      num > slideCount - slidesPerView
    ) {
      nextBtn.classList.add("disabled");
      prevBtn.classList.remove("disabled");
    } else {
      prevBtn.classList.remove("disabled");
      nextBtn.classList.remove("disabled");
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

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    // mainSlide
    joongoData.mainSlide.forEach((slide, index) => {
      // mainSlide add
      addMainSlide(slide, index);
    });

    // mainSlide run
    mainSlide();

    // data
    joongoData.product.forEach((product, index) => {
      // productSlide add
      if (index < productSlideLimit) {
        addProduct(product, ".bestRankingUl");
      } else if (index < productSlideLimit * 1.8) {
        addProduct(product, ".auctionUl");
      } else if (index < productSlideLimit * 3) {
        addProduct(product, ".recommendedUl");
      }

      // tab-content
      const tabContent = document.querySelectorAll(".tab-content");
      tabContent.forEach((content) => {
        if (
          content.querySelectorAll("li").length < 6 &&
          content.getAttribute("data-tab") === product.detail.page_path[1]
        ) {
          let li = `
            <li>
              <a href="/pages/detail.html?id=${product.id}">
               <div class="tab-content-img-wrap">
                  <div class="tab-content-img" style="background:url('../${
                    product.image_path
                  }') center/cover
                  no-repeat"></div>
               </div>
                <div class="tab-content-desc">
                  <h4 class="desc-title">
                    ${product.title}
                  </h4>
                  <strong class="desc-price">${product.price}</strong>
                  <p class="desc-info">
                    <span class="desc-time">${product.time}</span>
                    <span class="desc-place">${
                      product.point ? " | " + product.point : ""
                    }</span>
                  </p>
                </div>
              </a>
            </li>
          `;
          content.insertAdjacentHTML("beforeend", li);
        }
      });
    });

    // productSlide run
    productSlide("#best-ranking");
    productSlide("#auction");
    productSlide("#recommended");
  });

// auction
const timeItems = document.querySelector(".timeEvent");

const formatting = (time) => {
  let sec = Math.floor(time % 60);
  let min = Math.floor((time / 60) % 60);
  let hour = Math.floor(time / 3600);

  sec = sec < 10 ? `0${sec}` : `${sec}`;
  min = min < 10 ? `0${min}` : `${min}`;
  hour = hour < 10 ? `0${hour}` : `${hour}`;

  return { hour, min, sec };
};

const createSpan = (content, className) => {
  const span = document.createElement("span");
  span.innerText = content;
  span.classList.add(className);
  return span;
};

const updateUnit = (parent, unit, itemValue) => {
  const unitElement = parent.querySelector(`.${unit}`);

  if (unitElement) {
    const currentValue = unitElement.querySelector(".old").innerText;

    if (currentValue !== itemValue) {
      const oldSpan = unitElement.querySelector(".old");
      const newSpan = createSpan(itemValue, "new");
      unitElement.appendChild(newSpan);

      if (unit === "sec") {
        unitElement.classList.add("updating");
      }

      setTimeout(() => {
        if (oldSpan) unitElement.removeChild(oldSpan);
        newSpan.classList.replace("new", "old");
        unitElement.classList.remove("updating");
      }, 100);
    }
  } else {
    const unitContainer = document.createElement("div");
    unitContainer.classList.add("timeItem", unit);
    unitContainer.appendChild(createSpan(itemValue, "old"));
    parent.appendChild(unitContainer);
  }
};

const updateTime = () => {
  const today = new Date();

  const eventDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const gapDate = Math.floor((eventDay - today) / 1000);
  const { hour, min, sec } = formatting(gapDate);

  updateUnit(timeItems, "hour", hour);
  updateUnit(timeItems, "min", min);
  updateUnit(timeItems, "sec", sec);
};
setInterval(updateTime, 1000);

// tab-menu click event
const tabMenu = document.querySelectorAll(".tab-menu li");
tabMenu.forEach((li) => {
  li.addEventListener("click", (e) => {
    const tabContents = document.querySelectorAll(".tab-content");
    tabMenu.forEach((sibiling) => {
      if (sibiling === e.target) e.target.classList.add("active");
      else sibiling.classList.remove("active");
    });

    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    document
      .querySelector(`ul[data-tab="${e.target.dataset.tab}"]`)
      .classList.add("active");
  });
});

// event slide
const eventSlideUl = document.querySelector(".event-slide ul");
const eventSlides = [
  "images/event-banner01.png",
  "images/event-banner02.png",
  "images/event-banner03.png",
  "images/event-banner04.png",
  "images/event-banner05.png",
  "images/event-banner06.png",
];
eventSlides.forEach((slide) => {
  const liItem = document.createElement("li");
  const aTag = document.createElement("a");
  aTag.style.background = `url(../${slide}) center/cover no-repeat`;
  liItem.appendChild(aTag);
  eventSlideUl.appendChild(liItem);
});
const eventSlide = () => {
  const slideUl = document.querySelector(".event-slide ul");
  const slide = document.querySelectorAll(".event-slide li");

  const slideCount = slide.length;

  let currentIdx = 0;

  const moveSlide = (num) => {
    if (num < 0) return;

    const slideWidth = slideUl.querySelectorAll("li>a")[0].offsetWidth;
    const slideMargin = 20;
    const currentSlideWidth = (slideCount - num) * (slideWidth + slideMargin);
    const clientWidth = slideUl.parentElement.clientWidth;

    if (currentSlideWidth >= clientWidth) {
      currentIdx = num;
      slideUl.style.transform = `translateX(${
        -num * (slideWidth + slideMargin)
      }px)`;
    } else if (clientWidth - currentSlideWidth < slideWidth - slideMargin) {
      currentIdx = num;
      slideUl.style.transform = `translateX(${
        -(num - 1) * (slideWidth + slideMargin) -
        slideWidth +
        (clientWidth - currentSlideWidth)
      }px)`;
    } else {
      currentIdx = 0;
      slideUl.style.transform = "translateX(0px)";
    }
  };

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

  // autoPlay
  let timer = undefined;

  const autoSlide = () => {
    if (timer === undefined) {
      timer = setInterval(() => {
        moveSlide(currentIdx + 1);
      }, 3000);
    }
  };
  autoSlide();

  const stopSlide = () => {
    clearInterval(timer);
    timer = undefined;
  };

  slideUl.addEventListener("mouseenter", () => {
    stopSlide();
  });
  slideUl.addEventListener("mouseleave", () => {
    autoSlide();
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
eventSlide();

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
