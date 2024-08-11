const joonggoInfo = "../db.json";

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    const id = params.get("id");

    const product = joongoData.data.find((product) => product.id === id);

    if (product) {
      // Making Img-slider
      product.detail.url_list.forEach((slide, index) => {
        const imgWrapper = document.querySelector(".img-wrapper");
        const imgPagers = document.querySelector(".img-pagers");

        const li = document.createElement("li");
        const img = document.createElement("img");
        const pager = document.createElement("div");
        const src = document.createAttribute("src");

        src.value = `../${slide}`;

        img.setAttributeNode(src);
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

      const moveSlide = (num) => {
        const imgWrapper = document.querySelector(".img-wrapper");
        const slideWidth = document.querySelector(".img-slide").offsetWidth;

        imgWrapper.style.width = slideWidth * slideCount;

        imgWrapper.style.transform = `translateX(-${slideWidth * num}px)`;
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
        if (currentIndex === slideCount - 1) nextIndex = 0;
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

      userImgSrc.value = `../${product.detail.product_img_path}`;
      userImgTag.setAttributeNode(userImgSrc);
      userImg.appendChild(userImgTag);

      // Making User-id
      const userId = document.querySelector(".user-id");
      userId.innerText = product.detail.product_store;

      // Filling Detail-bar
      const fillingBar = document.querySelector(".filling-bar");

      fillingBar.animate([
        {
          width: 0
        },
        {
          width: "26%"
        }
      ], {
        duration: 500,
        fill: 'both'
      })
      // Numbering Detail-value
      let number = 0;
      
      const startNumbering = () => {
        const percentage = document.querySelector(".percentage");
        number++;
        percentage.innerText = number;

        if (number < 27) {
          setTimeout(startNumbering, 20);
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
      mapArea.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${product.point}`;

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

      storeImgSrc.value = `../${product.detail.product_img_path}`;
      storeImgTag.setAttributeNode(storeImgSrc);
      storeImg.appendChild(storeImgTag);

      // Making Store-name
      const storeName = document.querySelector(".name");
      storeName.innerText = product.detail.product_store;

      // Making Item-info
      const productItemInfos = product.detail.product_img_etc;
      const itemsWrapper = document.querySelector(".items-wrapper");

      for (let i = 0; i < productItemInfos.length; i++) {
        itemsWrapper.innerHTML += 
          `
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

      // Making Reviews
      const reviewsBox = document.querySelector(".reviews-box");

      reviewsBox.innerHTML = 
      `
        <li>친절/매너가 좋아요.<span><i class="fa-regular fa-user"></i>51</span></li>
        <li>응답이 빨라요.<span><i class="fa-regular fa-user"></i>26</span></li>
        <li>상품 상태가 좋아요.<span><i class="fa-regular fa-user"></i>38</span></li>
        <li>택배 거래가 수월했어요.(포장, 협조적)<span><i class="fa-regular fa-user"></i>17</span></li>
      `;
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
  btn.addEventListener("click", function() {
    storeBtns.forEach((sibling) => {
      if(sibling !== btn) {
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
