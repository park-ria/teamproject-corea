const joonggoInfo = "../db.json";

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const auctionPrice = params.get("price");

    const product = joongoData.product.find((product) => product.id === id);

    if (product) {
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
        imgWrapper.style.cursor = "grabbing";
        startPoint = e.pageX;
      });

      imgWrapper.addEventListener("mouseup", (e) => {
        imgWrapper.style.cursor = "grab";
        endPoint = e.pageX;

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
        startPoint = e.touches[0].pageX;
      });
      imgWrapper.addEventListener("touchend", (e) => {
        endPoint = e.changedTouches[0].pageX;
        if (startPoint < endPoint) {
          let prevIndex = (currentIndex - 1) % slideCount;
          if (currentIndex === 0) prevIndex = slideCount - 1;
          moveSlide(prevIndex);
        } else if (startPoint > endPoint) {
          let nextIndex = (currentIndex + 1) % slideCount;
          if (currentIndex === slideCount - 1) currentIndex = 0;
          moveSlide(nextIndex);
        }
      });

      // picked-list 클릭 이벤트
      const loginCheck = JSON.parse(localStorage.getItem("loginCheck")) || [];

      const iconBoxs = document.querySelectorAll(".icon-box");

      iconBoxs.forEach((box) => {
        box.addEventListener("click", () => {
          if (loginCheck.length > 0) {
            if (
              box.classList.contains("follow") ||
              box.classList.contains("report")
            ) {
              box.querySelector("a").href = "#none";
            }
          }
        });
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
      if (auctionPrice) {
        headingPrice.innerHTML = `
        <span class="current-price">${auctionPrice}원</span>
        <span class="original-price">${product.price}</span>
        `;
      } else {
        headingPrice.innerHTML = `
        <span>${product.price}</span>
        `;
      }

      // Making Heading-timeinfo
      const headingTimeinfo = document.querySelector(".heading-timeinfo");
      const subDataArr = product.detail.sub_data.split("·");
      let watchInfoArr = JSON.parse(localStorage.getItem("watchInfoArr")) || [];

      // 조회수 로컬스토리지 저장
      const saveWatch = (id, watchInfo) => {
        watchInfoArr = watchInfoArr.filter((item) => item.id !== id);
        watchInfoArr.push(watchInfo);
        localStorage.setItem("watchInfoArr", JSON.stringify(watchInfoArr));
      };

      // 조회수 넘버 카운트
      subDataArr.forEach((subData, index) => {
        const watchArr = subData.split(" ");
        let watchNum = Number(watchArr[2]);

        if (index === 0 && auctionPrice) {
          subData = subData.replace(" 전 ", " 후 ");
        }

        if (index === 1) {
          if (watchInfoArr) {
            watchInfoArr.forEach((info) => {
              if (info.id === product.id) {
                watchNum = info.countNum;
              }
            });
          }
          const updateWatchNum = watchNum + 1;
          const watchInfo = {
            id: product.id,
            countNum: updateWatchNum,
          };
          saveWatch(product.id, watchInfo);
          headingTimeinfo.innerHTML += `<span>${watchArr[1]} ${updateWatchNum}</span>`;
        } else {
          headingTimeinfo.innerHTML += `<span>${subData}</span>`;
        }
      });

      // 찜한목록 click시 이벤트
      const heartBtns = document.querySelectorAll(".heart-btn");
      let wishItemArr = JSON.parse(localStorage.getItem("wishItemArr")) || [];

      // updateHeartBtns
      const updateHeartBtns = () => {
        const updateWishItem = wishItemArr.find(
          (wishItem) => wishItem.id === product.id
        );

        if (updateWishItem) {
          heartBtns.forEach((heartBtn) => {
            heartBtn.querySelector("i").classList.remove("fa-regular");
            heartBtn.querySelector("i").classList.add("fa-solid");
          });
          headingTimeinfo.querySelector(
            "span:nth-child(4)"
          ).innerText = `찜 ${updateWishItem.countNum}`;
        } else {
          heartBtns.forEach((heartBtn) => {
            heartBtn.querySelector("i").classList.remove("fa-solid");
            heartBtn.querySelector("i").classList.add("fa-regular");
          });
        }
      };

      // 찜한 상품 저장
      const saveId = () => {
        // 241008 박리아 auctionPrice 기능 추가
        if (auctionPrice) {
          wishItemArr.forEach((arr) => {
            if (arr.id === id) arr.auctionPrice = auctionPrice;
          });
        }

        localStorage.setItem("wishItemArr", JSON.stringify(wishItemArr));
      };

      // 찜한 상품 삭제
      const removeId = (id) => {
        wishItemArr = JSON.parse(localStorage.getItem("wishItemArr")) || [];
        wishItemArr = wishItemArr.filter(
          (duplicatedId) => duplicatedId.id !== id.id
        );
        saveId();
      };

      updateHeartBtns();

      const picked = subDataArr[3].split(" ");
      const pickedNum = Number(picked[2]);

      const pickedInfo = {
        id: product.id,
        countNum: pickedNum,
      };

      // heart-btn 클릭시 이벤트
      heartBtns.forEach((heartBtn) => {
        heartBtn.addEventListener("click", (e) => {
          e.preventDefault();

          if (loginCheck.length === 0) {
            location.href = "/pages/login.html";
          } else {
            wishItemArr = JSON.parse(localStorage.getItem("wishItemArr")) || [];

            if (wishItemArr.find((wishItem) => wishItem.id === pickedInfo.id)) {
              heartBtns.forEach((btn) => {
                const heart = btn.querySelector("i");
                heart.classList.remove("fa-solid");
                heart.classList.add("fa-regular");
              });
              pickedInfo.countNum = pickedInfo.countNum - 1;
              removeId(pickedInfo);
              headingTimeinfo.querySelector(
                "span:nth-child(4)"
              ).innerText = `찜 ${pickedInfo.countNum}`;
            } else {
              heartBtns.forEach((btn) => {
                const heart = btn.querySelector("i");
                heart.classList.remove("fa-regular");
                heart.classList.add("fa-solid");
              });
              pickedInfo.countNum = pickedInfo.countNum + 1;
              wishItemArr.push(pickedInfo);
              saveId();
              headingTimeinfo.querySelector(
                "span:nth-child(4)"
              ).innerText = `찜 ${pickedInfo.countNum}`;
            }
          }
        });
      });

      if (auctionPrice) {
        headingTimeinfo.classList.add("active");
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

        // time event
        const timeItems = document.createElement("div");
        const clock = document.createElement("div");
        timeItems.className = "timeEvent";
        clock.className = "clock";

        const today = new Date();

        const time = Number(product.time.replace(/[^0-9]/g, ""));
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

        document.querySelector(".desc-heading").appendChild(timeItems);
      }

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

      if (auctionPrice) {
        descConditions.classList.add("active");
      }
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
      <span class="condition">${product.detail.delivery_charge}</span>
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

      // desc-map (경매용)
      const descMap = document.querySelector(".desc-map");

      if (auctionPrice) {
        descMap.style.display = "none";
      }

      // Making Map-area
      const mapArea = document.querySelector(".map-area");
      mapArea.innerHTML = `${
        product.point === ""
          ? "-"
          : `<i class="fa-solid fa-location-dot"></i> ${product.point}`
      }`;

      // Kakao map
      const mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(
            product.detail.latitude,
            product.detail.longitude
          ),
          level: 4,
        };

      const map = new kakao.maps.Map(mapContainer, mapOption);

      const markerPosition = new kakao.maps.LatLng(
        product.detail.latitude,
        product.detail.longitude
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);

      const content = `
      <div class="customoverlay">
        <a href="https://map.kakao.com/link/map/" target="_blank">
          <span class="title">${product.point}</span>
        </a>
      </div>`;

      const position = new kakao.maps.LatLng(
        product.detail.latitude,
        product.detail.longitude
      );

      const customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 1,
      });

      const movePage = (e) => {
        e.preventDefault();

        console.log(loginCheck);
        if (loginCheck.length === 0) {
          location.href = "/pages/login.html";
        }
      };

      // desc-btns 버튼 생성
      const descBtns = document.querySelector(".desc-btns");
      const bottomBtns = document.querySelector(".btns");

      if (auctionPrice) {
        descBtns.classList.add("active");
        descBtns.innerHTML = `
        <a href="/pages/login.html" class="auction">입찰하기</a>
        <a href="#none" class="trade">채팅하기</a>
        `;

        document.querySelectorAll(".auction").forEach((btn) => {
          btn.addEventListener("click", movePage);
        });
        document.querySelectorAll(".trade").forEach((btn) => {
          btn.addEventListener("click", movePage);
        });
      } else {
        console.log();
        descBtns.innerHTML = `
        <a href="/pages/login.html" class="chat">채팅하기</a>
        <a href="#none" class="trade">${
          product.pay_flag > 0 ? "구매하기" : "가격제안"
        }</a>
        `;

        document.querySelectorAll(".chat").forEach((btn) => {
          btn.addEventListener("click", movePage);
        });
      }

      if (auctionPrice) {
        bottomBtns.classList.add("active");
        bottomBtns.innerHTML = `
        <a href="/pages/login.html" class="auction-btn">입찰하기</a>
        <a href="#none" class="trade-btn">채팅하기</a>
        `;
        document.querySelectorAll(".auction-btn").forEach((btn) => {
          btn.addEventListener("click", movePage);
        });
        document.querySelectorAll(".trade-btn").forEach((btn) => {
          btn.addEventListener("click", movePage);
        });
      } else {
        bottomBtns.innerHTML = `
        <a href="/pages/login.html" class="chat-btn">채팅하기</a>
        <a href="/pages/order.html?id=${product.id}" class="trade-btn">${
          product.pay_flag > 0 ? "구매하기" : "가격제안"
        }</a>
        `;
        document.querySelectorAll(".chat-btn").forEach((btn) => {
          btn.addEventListener("click", movePage);
        });
      }

      // trade버튼 클릭시 이벤트
      const tradeBtn = document.querySelector(".trade");

      tradeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!auctionPrice) {
          const url = `/pages/order.html?id=${product.id}`;
          window.location.href = url;
        }
      });

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

      // Making Info-desc
      const infoDesc = document.querySelector(".info-desc");
      infoDesc.innerHTML = `
      <div class="desc-box">
        <span>판매중</span>
        <span>${store.info.product_img_etc.length}</span>
      </div>
      <div class="desc-box">
        <span>거래후기</span>
        <span>${store.review.review_title.length}</span>
      </div>
      `;

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

      let startX = 0;

      let nowX = 0;

      let endX = 0;

      let listX = 0;

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

      // randomNum 생성
      let itemNum = 0;
      const showItemCount = 9;

      let recentArr = new Set();
      for (let i = 0; i <= showItemCount; i++) {
        recentArr.add(Math.floor(Math.random() * 79));
      }

      joongoData.product.forEach((item, index) => {
        // recommended 생성
        if (item.id !== product.id) {
          if (
            item.detail.page_path[1] == product.detail.page_path[1] &&
            itemNum < showItemCount
          ) {
            addProduct(item, ".recommendedUl");
            itemNum++;
          } else {
            // recet 생성
            if ([...recentArr].includes(index)) {
              addProduct(joongoData.product[index], ".recentUl");
            }
          }
        }
      });
      // productSlide run
      productSlide("#recommended");
      productSlide("#recent");
    }
  });

// add product slide item
let slideIndex = 0;
let slidesPerView = 5;

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

  slideImgWrap.className = "slideImgWrap";
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
  slideImgWrap.appendChild(slideImg);
  aTag.append(slideImgWrap, slideDesc);
  liItem.appendChild(aTag);
  ulItem.appendChild(liItem);

  slideIndex++;
};

// productSlide
const productSlide = (section) => {
  const slideSection = document.querySelector(section);
  const slideUl = slideSection.querySelector("ul");
  const slide = slideUl.querySelectorAll("li");
  const prevBtn = slideSection.querySelector(".slidePrev");
  const nextBtn = slideSection.querySelector(".slideNext");

  const slideCount = slide.length;

  prevBtn.classList.add("disabled");

  let currentIdx = 0;

  const moveSlide = (num) => {
    if (num < 0 || num >= slideCount) return;

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

// Share Click시 팝업창
const shareBtn = document.querySelector(".share");
const shaerboxFilter = document.querySelector(".sharebox-filter");

shareBtn.addEventListener("click", () => {
  document.querySelector(".share-box").classList.add("active");
  shaerboxFilter.classList.toggle("active");
});

shaerboxFilter.addEventListener("click", function () {
  document.querySelector(".share-box").classList.remove("active");
  this.classList.remove("active");
});

// URL click시 url주소
const urlBtn = document.querySelector(".url");

urlBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const urlAddress = window.location.href;
  navigator.clipboard.writeText(urlAddress).then((res) => {
    alert("주소가 복사되었습니다!");
  });
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
