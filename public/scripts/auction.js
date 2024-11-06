const joonggoInfo = "../db.json";

let sortedLists = [];
let slideIndex = 0;

let slidesPerView = 0;
if (matchMedia("screen and (min-width: 1280px)").matches) {
  slidesPerView = 3;
} else if (matchMedia("screen and (min-width: 901px)").matches) {
  slidesPerView = 2;
} else {
  slidesPerView = 1;
}

const productSlideLimit = 10;

// time event
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
    if (currentValue != itemValue) {
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
const today = new Date();

// product
const addProduct = (product, ul) => {
  const ulItem = document.querySelector(ul);
  const liItem = document.createElement("li");
  const aTag = document.createElement("a");
  const slideImgWrap = document.createElement("div");
  const slideImg = document.createElement("div");
  const slideDesc = document.createElement("div");

  slideImgWrap.className = "slideImgWrap";
  slideImg.className = "slide-img";
  slideDesc.className = "slide-desc";
  //aTag.setAttribute("href", `/pages/detail.html?id=${product.id}`);

  slideImg.style.background = `url(../${product.image_path}) center/cover no-repeat`;

  // currentPrice
  const originPrice = Number(product.price.replace(/,/g, "").replace("원", ""));
  const saleNum = Math.floor(Math.random() * 31);
  const salePrice = Math.floor(originPrice * (saleNum / 100));
  const resultPrice = originPrice - salePrice;
  const currentPrice = new Intl.NumberFormat("ko-kr", {
    currency: "KRW",
  }).format(resultPrice);

  aTag.setAttribute(
    "href",
    `/pages/detail.html?id=${product.id}&price=${currentPrice}`
  );

  const desc = `
              <h4 class="desc-title">
                ${product.title}
              </h4>
              <strong class="desc-price">
                <span class="current">현재가</span> ${currentPrice}원
                <span class="fixed">${product.price}</span>
              </strong>
              <p class="desc-info">
                <span class="desc-time">${product.time.replace(
                  "전",
                  "후 종료"
                )}</span>
                <span class="desc-place">
                ${product.point ? " | " + product.point : ""}
                </span>
              </p>
        `;

  slideDesc.insertAdjacentHTML("afterbegin", desc);
  slideImgWrap.appendChild(slideImg);
  aTag.append(slideImgWrap, slideDesc);
  liItem.append(aTag);

  ulItem.appendChild(liItem);

  if (ul === ".bestAuction") {
    // time event
    const timeItems = document.createElement("div");
    const clock = document.createElement("div");
    timeItems.className = "timeEvent";
    clock.className = "clock";

    const today = new Date();

    const time = Number(product.time.replace(/[^0-9]/g, ""));
    // console.log(time);
    let eventDate = today.getDate();
    let eventHrs = today.getHours();
    let eventMin = today.getMinutes();
    let eventSec = today.getSeconds();

    if (product.time.includes("일")) {
      eventDate += time;
    } else if (product.time.includes("시간")) {
      eventHrs += time;
    } else if (product.time.includes("분")) {
      eventMin += time;
    } else if (product.time.includes("초")) {
      eventSec += time;
    }

    const updateTime = () => {
      const today = new Date();
      const eventDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        eventDate,
        eventHrs,
        eventMin,
        eventSec
      );
      const gapDate = Math.floor((eventDay - today) / 1000);
      const { hour, min, sec } = formatting(gapDate);

      updateUnit(timeItems, "hour", hour);
      updateUnit(timeItems, "min", min);
      updateUnit(timeItems, "sec", sec);
    };
    setInterval(updateTime, 1000);

    timeItems.prepend(clock);
    slideImg.appendChild(timeItems);

    // slide pager
    const slidePager =
      ulItem.parentNode.nextElementSibling.querySelector(".slidePager");
    if (slideIndex % productSlideLimit >= slidesPerView - 1) {
      const spanTag = document.createElement("span");
      slidePager.appendChild(spanTag);
    }
    slideIndex++;
  }
  // else {
  //   const badge = document.createElement("span");
  //   badge.className = "badge badge-auction";
  //   liItem.append(badge);
  // }
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

// sorting
const sortingBtns = document.querySelectorAll(".sorting-group a");
sortingBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    sortingBtns.forEach((sibling) => {
      if (sibling !== this) sibling.classList.remove("active");
    });

    this.classList.add("active");

    if (this.id === "latestSorting") sortNew();
    else if (this.id === "popularSorting") sortPopular();
    else if (this.id === "lowPriceSorting") sortLowPrice();
    else sorthighPrice();
  });
});

const sortNew = () => {
  const products = sortedLists.sort((a, b) => {
    return new Date(a.real_time).getTime() - new Date(b.real_time).getTime();
  });

  document.querySelector(".product").innerHTML = "";

  products.forEach((product) => {
    addProduct(product, ".product");
  });
};
const sortPopular = () => {
  const products = sortedLists.sort((a, b) => {
    return b.detail.view - a.detail.view;
  });

  document.querySelector(".product").innerHTML = "";

  products.forEach((product) => {
    addProduct(product, ".product");
  });
};
const sortLowPrice = () => {
  const products = sortedLists.sort((a, b) => {
    return a.price.replace(/[^0-9]/g, "") - b.price.replace(/[^0-9]/g, "");
  });

  document.querySelector(".product").innerHTML = "";

  products.forEach((product) => {
    addProduct(product, ".product");
  });
};
const sorthighPrice = () => {
  const products = sortedLists.sort((a, b) => {
    return b.price.replace(/[^0-9]/g, "") - a.price.replace(/[^0-9]/g, "");
  });

  document.querySelector(".product").innerHTML = "";

  products.forEach((product) => {
    addProduct(product, ".product");
  });
};

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    joongoData.product.forEach((product, index) => {
      // addBestProduct
      if (index < productSlideLimit * 2 && product.time.includes("분")) {
        addProduct(product, ".bestAuction");
      }
      // addProductList
      else if (index < productSlideLimit * 2 + 2) {
        addProduct(product, ".product");
        sortedLists.push(product);
        sortNew();
      }
    });

    // productList run
    productSlide("#best-auction");
  });
