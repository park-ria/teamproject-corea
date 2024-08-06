const JoonggoInfo = ("../db.json");

fetch(JoonggoInfo).then((response) => response.json()).then((JoongoData) => {

    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const name = params.get("name");

    const product = JoongoData.data.find((product) => 
    product.category === category && product.name === name
    )
        
    if(product) {

        // Making Img-slider
        product.detail.url_list.forEach((slide) => {
            const imgWrapper = document.querySelector(".img-wrapper");
            const imgPagers = document.querySelector(".img-pagers");
    
            const li = document.createElement("li"); 
            const img = document.createElement("img");
            const  pager = document.createElement("div");
            const src = document.createAttribute("src");
    
            src.value = data.detail.url_list;
    
            img.setAttributeNode(src);
            li.appendChild(img);
            li.className = "img-slide";
            imgWrapper.appendChild(li);
    
    
            pager.classList.add("img-pager", "pager");
            imgPagers.appendChild(pager);
        });

        // Making Heading-category
        product.page_path.forEach((path, index) => {

            const headingCategory = document.querySelector(".heading-category");
            const span = document.createElement("span");

            if(index !== product.page_path.length - 1) {
                span.innerHTML = `${product.page_path[index]}<i class="fa-solid fa-chevron-right"></i>`;
            } else {
                span.innerHTML = product.page_path[index];
            };
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
        headingTimeinfo.innerText = product.sub_data;

        // Making User-img
        const userImg = document.querySelector(".user-img");
        const img = document.createElement("img");
        const src = document.createAttribute("src")

        src.value = product.product_img_path;
        img.setAttributeNode(src);
        userImg.appendChild(img);

        // Making User-id 
        const userId = document.querySelector(".user-id");
        userId.innerText = product.product_store;

        // Making Desc-conditions
        const conditionsBox = document.querySelector(".desc-conditions");

        conditionsBox.innerHTM = 
        `
        <div class="conditions-box">
            <span>제품상태</span>
            <span>${product.status}</span>
        </div>
        <div class="conditions-box">
            <span>거래방식</span>
            <span>${product.transaction_method}</span>
        </div>
        <div class="conditions-box">
            <span>배송비</span>
            <span>${product.delivery_charged}</span>
        </div>
        <div class="conditions-box">
            <span>안전거래</span>
            <span>${product.safe_transaction}</span>
        </div>
        `;

        // Making Map-area
        const mapArea = document.querySelector(".desc-map");
        mapArea.innerText = `- ${product.point}`;
    }
        
});

// Img-slider
let currentIndex = 0;

const moveSlide = (num) => {
    const imgWrapper = document.querySelector(".img-wrapper");
    const slideWidth = document.querySelector(".img-slide").offsetWidth;
    
    imgWrapper.style.transform = `translateX(-${slideWidth * num}px)`
    currentIndex = num;
    pagerActive();
};


const slideCount = document.querySelectorAll(".img-slide").length;

const moveLeft = () => {
    let prevIndex = (currentIndex - 1) % slideCount;
    if(currentIndex === 0) prevIndex = slideCount - 1;
    moveSlide(prevIndex);
};

const moveRight = () => {
    let nextIndex = (currentIndex + 1) % slideCount;
    if(currentIndex === slideCount - 1) nextIndex = 0;
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
        pager.addEventListener("click", function() {
            pagers.forEach((sibling) => {
                if(sibling !== pager) {
                    sibling.classList.remove("active");
                }
            });
            this.classList.add("active");
        });
        pager.classList.remove("active");
    });
    pagers[currentIndex].classList.add("active");
};


// Map API
const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다 
const markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

// 마커를 생성합니다
const marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);    
