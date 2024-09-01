const joonggoInfo = "../db.json";

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    const id = params.get("id");

    const product = joongoData.product.find((product) => product.id === id);

    if (product) {
      // 찜한목록 click시 이벤트
      const heartBtns = document.querySelectorAll(".heart-btn");

      let idList = [];

      const checkId = JSON.parse(localStorage.getItem("idList"));

      console.log(checkId);

      /*  if (checkId.length > 0) {
        heartBtns.forEach((heartBtn) => {
          heartBtn.querySelector("i").classList.remove("fa-regular");
          heartBtn.querySelector("i").classList.add("fa-solid");
        });
      } else {
        heartBtns.forEach((heartBtn) => {
          heartBtn.querySelector("i").classList.remove("fa-solid");
          heartBtn.querySelector("i").classList.add("fa-regular");
        });
      }*/

      const saveId = () => {
        localStorage.setItem("idList", JSON.stringify(idList));
      };

      const removeId = (id) => {
        idList = JSON.parse(localStorage.getItem("idList"));
        idList = idList.filter((duplicatedId) => duplicatedId !== id);
        saveId();
      };

      heartBtns.forEach((heartBtn) => {
        heartBtn.addEventListener("click", (e) => {
          if (e.target.classList.contains("fa-solid")) {
            e.target.classList.remove("fa-solid");
            e.target.classList.add("fa-regular");
            removeId(product.id);
          } else {
            e.target.classList.remove("fa-regular");
            e.target.classList.add("fa-solid");
            idList.push(product.id);
            saveId();
          }
        });
      });

      // Making Img-slider
      product.detail.url_list.forEach((slide, index) => {
        const imgWrapper = document.querySelector(".img-wrapper");
        const imgPagers = document.querySelector(".img-pagers");

        const li = document.createElement("li");
        //const img = document.createElement("img");
        const img = document.createElement("img");
        const pager = document.createElement("div");
        const src = document.createAttribute("src");

        src.value = `../${slide}`;

        //img.setAttributeNode(src);
        img.style = `background:url(../${slide}) center/cover no-repeat`;
        li.appendChild(img);
        li.className = "img-slide";
        imgWrapper.appendChild(li);

        pager.classList.add("img-pager", "pager");
        if (index === 0) {
          pager.classList.add("active");
        }
        imgPagers.appendChild(pager);
      });

      // // Img-slider
      let currentIndex = 0;
      const imgWrapper = document.querySelector(".img-wrapper");

      const moveSlide = (num) => {
        const slideWidth = document.querySelector(".img-slide").offsetWidth;
        imgWrapper.style.width = slideWidth * slideCount;
        imgWrapper.style.transform = `translateX(${slideWidth * -num}px)`;
        currentIndex = num;
        pagerActive();
      };

      const slideCount = document.querySelectorAll(".img-slide").length;

      const moveLeft = () => {
        let prevIndex = (currentIndex - 1) % slideCount;
        if (currentIndex === 0) prevIndex = slideCount - 1;
        moveSlide(prevIndex);
      };

      const moveRight = () => {
        let nextIndex = (currentIndex + 1) % slideCount;
        if (currentIndex === slideCount - 1) currentIndex = 0;
        moveSlide(nextIndex);
      };

      const imgPrev = document.querySelector(".img-prev");
      const imgNext = document.querySelector(".img-next");

      imgPrev.addEventListener("click", moveLeft);
      imgNext.addEventListener("click", moveRight);

      const pagers = document.querySelectorAll(".img-pager");

      const clickPagers = () => {
        pagers.forEach((pager, index) => {
          pager.addEventListener("click", () => {
            moveSlide(index);
            pagerActive();
          });
        });
      };

      clickPagers();

      const pagerActive = () => {
        pagers.forEach((pager) => {
          pager.addEventListener("click", function () {
            pagers.forEach((sibling) => {
              if (sibling !== pager) {
                sibling.classList.remove("active");
              }
            });
            this.classList.add("active");
          });
          pager.classList.remove("active");
        });

        pagers[currentIndex].classList.add("active");
      };

      // 마우스 드래그 이벤트
      let startPoint = 0;
      let endPoint = 0;

      // PC 드래그 이벤트
      imgWrapper.addEventListener("mousedown", (e) => {
        //console.log(e);
        imgWrapper.style.cursor = "grabbing";
        startPoint = e.pageX; // 마우스 드래그 시작 위치 저장
      });

      imgWrapper.addEventListener("mouseup", (e) => {
        imgWrapper.style.cursor = "grab";
        //console.log("mouseup", e.pageX);
        endPoint = e.pageX; // 마우스 드래그 끝 위치 저장

        if (startPoint < endPoint) {
          // 마우스가 오른쪽으로 드래그 된 경우
          let prevIndex = (currentIndex - 1) % slideCount;
          if (currentIndex === 0) prevIndex = slideCount - 1;
          moveSlide(prevIndex);
        } else if (startPoint > endPoint) {
          // 마우스가 왼쪽으로 드래그 된 경우
          let nextIndex = (currentIndex + 1) % slideCount;
          if (currentIndex === slideCount - 1) currentIndex = 0;
          moveSlide(nextIndex);
        }
      });

      // 모바일 터치 이벤트 (스와이프)
      imgWrapper.addEventListener("touchstart", (e) => {
        //console.log("touchstart", e.touches[0].pageX);
        startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
      });
      imgWrapper.addEventListener("touchend", (e) => {
        //console.log("touchend", e.changedTouches[0].pageX);
        endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
        if (startPoint < endPoint) {
          // 오른쪽으로 스와이프 된 경우
          let prevIndex = (currentIndex - 1) % slideCount;
          if (currentIndex === 0) prevIndex = slideCount - 1;
          moveSlide(prevIndex);
        } else if (startPoint > endPoint) {
          let nextIndex = (currentIndex + 1) % slideCount;
          if (currentIndex === slideCount - 1) currentIndex = 0;
          moveSlide(nextIndex);
        }
      });

      // Making Heading-category
      product.detail.page_path.forEach((path, index) => {
        const headingCategory = document.querySelector(".heading-category");
        const span = document.createElement("span");

        if (index !== product.detail.page_path.length - 1) {
          span.innerHTML = `${product.detail.page_path[index]} <i class="fa-solid fa-chevron-right"></i>`;
        } else {
          span.innerHTML = product.detail.page_path[index];
        }
        headingCategory.appendChild(span);
      });

      // Making Heading-name
      const headingName = document.querySelector(".heading-name");
      headingName.innerText = product.title;

      // Making Heading-price
      const headingPrice = document.querySelector(".heading-price");
      headingPrice.innerText = product.price;

      // Making Heading-timeinfo
      const headingTimeinfo = document.querySelector(".heading-timeinfo");
      headingTimeinfo.innerText = product.detail.sub_data;

      // Making User-img
      const userImg = document.querySelector(".user-img");
      const userImgTag = document.createElement("img");
      const userImgSrc = document.createAttribute("src");

      const store = joongoData.store.find(
        (item) => item.store_name === product.detail.store_name
      );
      userImgSrc.value = `../${store.info.product_img_path}`;
      userImgTag.setAttributeNode(userImgSrc);
      userImg.appendChild(userImgTag);

      // Making User-id
      const userId = document.querySelector(".user-id");
      userId.innerText = product.detail.store_name;

      // Filling Detail-bar
      const fillingBar = document.querySelector(".filling-bar");
      const barNum = store.info.product_store_confidence_index;
      barRate = Math.floor(barNum / 10);

      fillingBar.animate(
        [
          {
            width: 0,
          },
          {
            width: `${barRate}%`,
          },
        ],
        {
          duration: 500,
          fill: "both",
        }
      );

      // Numbering Detail-value
      let number = 0;

      const startNumbering = () => {
        const percentage = document.querySelector(".percentage");
        number++;
        percentage.innerText = number;

        if (number < barRate) {
          setTimeout(startNumbering, 5);
        }
      };

      startNumbering();

      // Making Desc-conditions
      const descConditions = document.querySelector(".desc-conditions");

      descConditions.innerHTML = `
      <div class="conditions-box">
      <span>제품상태</span>
      <span class="condition">${product.detail.status}</span>
      </div>
      <div class="conditions-box">
      <span>거래방식</span>
      <span class="condition">${product.detail.transaction_method}</span>
      </div>
      <div class="conditions-box">
      <span>배송비</span>
      <span class="condition">${product.detail.delivery_charged}</span>
        </div>
        <div class="conditions-box">
        <span>안전거래</span>
        <span class="condition">${product.detail.safe_transaction}</span>
        </div>
        `;

      const conditions = document.querySelectorAll(".condition");
      conditions.forEach((condition) => {
        if (condition.innerText === "undefined") {
          condition.innerText = "-";
        }
      });

      // Making Map-area
      const mapArea = document.querySelector(".map-area");
      mapArea.innerHTML = `${
        product.point === ""
          ? "-"
          : `<i class="fa-solid fa-location-dot"></i> ${product.point}`
      }`;

      // Map API
      const mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(
            product.detail.latitude,
            product.detail.longitude
          ), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 마커가 표시될 위치입니다
      const markerPosition = new kakao.maps.LatLng(
        product.detail.latitude,
        product.detail.longitude
      );

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      const mapTypeControl = new kakao.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // Making ItemIfo-detail
      const itemIfoDetail = document.querySelector(".itemIfo-detail");
      itemIfoDetail.innerHTML = `
        <p>${product.detail.product_description}</p>
        <h6>연관 검색어</h6>
        <div class="relatedWords">
        </div>
        `;

      // Making RelatedWords
      product.detail.keywords.forEach((keyword) => {
        const relatedWords = document.querySelector(".relatedWords");
        if (keyword) {
          relatedWords.innerHTML += `
          <span>#${keyword}</span>
          `;
        }
      });

      // Making Store-info
      const storeImg = document.querySelector(".info-img");
      const storeImgTag = document.createElement("img");
      const storeImgSrc = document.createAttribute("src");

      storeImgSrc.value = `../${store.info.product_img_path}`;
      storeImgTag.setAttributeNode(storeImgSrc);
      storeImg.appendChild(storeImgTag);

      // Making Store-name
      const storeName = document.querySelector(".name");
      storeName.innerText = product.detail.store_name;

      // Making Item-info
      const productItemInfos = store.info.product_img_etc;
      const itemsWrapper = document.querySelector(".items-wrapper");

      for (let i = 0; i < productItemInfos.length; i++) {
        itemsWrapper.innerHTML += `
          <li class="item-info">
            <div class="item-img">
              <img src="../${productItemInfos[i].image_url}">
            </div>
            <div class="item-detail">
              <span class="item-name">${productItemInfos[i].name}</span>
              <span class="item-price">${productItemInfos[i].price}</span>
            </div>
          </li>
          `;
      }

      // Touch Event
      const itemWidth = itemsWrapper.querySelectorAll("li")[0].offsetWidth;
      const itemsCount = itemsWrapper.querySelectorAll("li").length;
      let itemGap = 30;

      const listClientWidth = itemsWrapper.clientWidth;
      const listScrollWidth =
        itemWidth * itemsCount + itemGap * (itemsCount - 1);

      // 최초 터치 및 마우스 다운 지점
      let startX = 0;

      // 현재 이동중인 지점
      let nowX = 0;

      // 터치 종료 지점
      let endX = 0;

      // 두번째 터치 지점
      let listX = 0;

      // clientX : 사용자가 현재 보고있는 device 매체의 너비를 의미

      const getClientX = (e) => {
        return e.touches ? e.touches[0].clientX : e.clientX;
      };

      const getTranslate = () => {
        return parseInt(
          getComputedStyle(itemsWrapper).transform.split(/[^\-0-9]+/g)[5]
        );
      };

      const setTranslateX = (x) => {
        itemsWrapper.style.transform = `translateX(${x}px)`;
      };

      const onScrollMove = (e) => {
        nowX = getClientX(e);
        setTranslateX(listX + nowX - startX);
      };

      const onScrollEnd = (e) => {
        endX = getClientX(e);
        listX = getTranslate();
        if (listX > 0) {
          setTranslateX(0);
          itemsWrapper.style.transition = `all 0.1s ease`;
          listX = 0;
        } else if (listX < listClientWidth - listScrollWidth) {
          setTranslateX(listClientWidth - listScrollWidth);
          itemsWrapper.style.transition = `all 0.1s ease`;
          listX = listClientWidth - listScrollWidth;
        }
        window.removeEventListener("touchstart", onScrollStart);
        window.removeEventListener("mousedown", onScrollStart);
        window.removeEventListener("touchmove", onScrollMove);
        window.removeEventListener("mousemove", onScrollMove);
        window.removeEventListener("touchend", onScrollEnd);
        window.removeEventListener("mouseup", onScrollEnd);
      };

      const onScrollStart = (e) => {
        startX = getClientX(e);

        window.addEventListener("touchmove", onScrollMove);
        window.addEventListener("mousemove", onScrollMove);
        window.addEventListener("touchend", onScrollEnd);
        window.addEventListener("mouseup", onScrollEnd);
      };

      itemsWrapper.addEventListener("touchstart", onScrollStart);
      itemsWrapper.addEventListener("mousedown", onScrollStart);

      // Making Reviews
      const reviewsBox = document.querySelector(".reviews-box");
      const reviews = store.review.review_title;

      if (reviews.length === 0) {
        reviewsBox.innerHTML += `
        <li class="no-review">아직 구매자로부터 받은 후기가 없습니다.</li>
        `;
      } else {
        for (let i = 0; i < reviews.length; i++) {
          reviewsBox.innerHTML += `
          <li>${reviews[i].title}<span><i class="fa-regular fa-user"></i>${reviews[i].cnt}</span></li>
          `;
        }
      }
    }
  });

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
  const slideImg = document.createElement("div");
  const slideDesc = document.createElement("div");

  slideImg.className = "slide-img";
  slideDesc.className = "slide-desc";
  aTag.setAttribute("href", `/pages/detail.html?id=${product.id}`);
  // aTag.style.webkitUserDrag = "none";

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
    } else if (num === slideCount - slidesPerView) {
      nextBtn.classList.add("disabled");
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

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    // data
    joongoData.product.forEach((product, index) => {
      // productSlide add
      if (index < productSlideLimit) {
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
                <div class="tab-content-img" style="background:url('../${
                  product.image_path
                }') center/cover
                no-repeat"></div>
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
    productSlide("#recommended");
  });

// Share Click시 팝업창
const shareBtn = document.querySelector(".share");

shareBtn.addEventListener("click", () => {
  document.querySelector(".share-box").classList.toggle("active");
});

// URL click시 url주소
const urlBtn = document.querySelector(".url");

urlBtn.addEventListener("click", () => {
  const urlAddress = window.location.href;
  prompt("Ctrl+C를 눌러 클립보드로 복사하세요", `${urlAddress}`);
});

// Store-btns active
const storeBtns = document.querySelectorAll(".store-btns button");

storeBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    storeBtns.forEach((sibling) => {
      if (sibling !== btn) {
        sibling.classList.remove("active");
      }
    });
    this.classList.add("active");
  });
});

// Store-contents active
const storeContents = document.querySelectorAll(".store-contents > div");

storeBtns.forEach((button, index) => {
  button.addEventListener("click", () => {
    storeContents.forEach((content) => {
      content.classList.remove("active");
    });
    storeContents[index].classList.add("active");
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
