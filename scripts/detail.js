const joonggoInfo = "../db.json";

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    const id = params.get("id");

    const product = joongoData.product.find((product) => product.id === id);

    if (product) {
      // Making Img-slider
      product.detail.url_list.forEach((slide, index) => {
        const imgWrapper = document.querySelector(".img-wrapper");
        const imgPagers = document.querySelector(".img-pagers");

        const li = document.createElement("li");
        //const img = document.createElement("img");
        const img = document.createElement("span");
        const pager = document.createElement("div");
        const src = document.createAttribute("src");

        src.value = `../${slide}`;

        //img.setAttributeNode(src);
        img.style = `display:inline-block;width:600px;height:600px;background:url(../${slide}) center/cover no-repeat`;
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
      const barNum = product.detail.product_store_confidence_index;
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
      mapArea.innerText = `${product.point === "" ? "-" : product.point}`;


      // Making ItemIfo-detail
      const itemIfoDetail = document.querySelector(".itemIfo-detail");
      itemIfoDetail.innerHTML = `
        <p>${product.detail.product_description}</p>
        <h6>연관 검색어</h6>
        <div class="relatedWords">
            <span>#루이비통</span>
            <span>#트랙수트</span>
            <span>#메쉬</span>
        </div>
        `;

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
      const listScrollWidth = (itemWidth * itemsCount) + (itemGap * (itemsCount - 1));

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
        // const isTouches = e.isTouches ? true : false;
        // return isTouches ? e.touches[0].clientX : e.clientX;
        return e.touches ? e.touches[0].clientX : e.clientX;
      };

      // matrix(1, 0, 0, 1, -75, 0)
      // 1 : x방향의 스케일
      // 2 : y방향의 기울기
      // 3 : x방향의 기울기
      // 4 : y방향의 스케일
      // 5 : x축을 기준으로 이동한 거리
      // 6 : y축을 기준으로 이동한 거리

      const getTranslate = () => {
        // console.log(getComputedStyle(itemsWrapper).transform.split(/[^\-0-9]+/g)[5]);
        
        return parseInt(getComputedStyle(itemsWrapper).transform.split(/[^\-0-9]+/g)[5]);
      };

      const setTranslateX = (x) => {
        itemsWrapper.style.transform = `translateX(${x}px)`
      }

      const onScrollMove = (e) => {
        nowX = getClientX(e);
        setTranslateX(listX + nowX - startX)
      };

      const onScrollEnd = (e) => {
        endX = getClientX(e);
        listX = getTranslate();
        if(listX > 0) {
          setTranslateX(0);
          itemsWrapper.style.transition = `all 0.1s ease`;
          listX = 0;
        } else if(listX < listClientWidth - listScrollWidth) {
          setTranslateX(listClientWidth - listScrollWidth);
          itemsWrapper.style.transition = `all 0.1s ease`
          listX = listClientWidth - listScrollWidth;
        }
        window.removeEventListener("touchstart", onScrollStart);
        window.removeEventListener("mousedown", onScrollStart);
        window.removeEventListener("touchmove", onScrollMove);
        window.removeEventListener("mousemove", onScrollMove);
        window.removeEventListener("touchend",onScrollEnd);
        window.removeEventListener("mouseup", onScrollEnd);
      }

      const onScrollStart = (e) => {
        startX = getClientX(e);

        window.addEventListener("touchmove", onScrollMove);
        window.addEventListener("mousemove", onScrollMove);
        window.addEventListener("touchend",onScrollEnd);
        window.addEventListener("mouseup", onScrollEnd);
      };

      itemsWrapper.addEventListener("touchstart", onScrollStart);
      itemsWrapper.addEventListener("mousedown", onScrollStart);

      // Making Reviews
      const reviewsBox = document.querySelector(".reviews-box");
      const reviews = store.review.review_title;

      if(reviews.length === 0) {
        reviewsBox.innerHTML += 
        `
        <li class="no-review">아직 구매자로부터 받은 후기가 없습니다.</li>
        `;
      } else {
        for(let i = 0; i < reviews.length; i++) {
          reviewsBox.innerHTML += 
          `
          <li>${reviews[i].title}<span><i class="fa-regular fa-user"></i>${reviews[i].cnt}</span></li>
          `;
        }
      }

    }
  });

// Map API
const mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다
const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

// 마커를 생성합니다
const marker = new kakao.maps.Marker({
  position: markerPosition,
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);

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
