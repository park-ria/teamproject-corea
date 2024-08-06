const JoonggoInfo = ("../db.json");

fetch(JoonggoInfo).then((response) => response.json()).then((JoongoData) => {

    JoongoData.data.forEach((data) => {
        const imgWrapper = document.querySelector(".img-wrapper");
        const imgPagers = document.querySelector(".img-pagers");

        // create Img-slider
        const li = document.createElement("li"); 
        const img = document.createElement("img");
        const  pager = document.createElement("div");
        const src = document.createAttribute("src");

        src.value = data.detail.url_list;
        img.setAttributeNode = src;
        li.appendChild(img);
        li.className = "img-slide";
        imgWrapper.appendChild(li);


        pager.classList.add("img-pager", "pager");
        imgPagers.appendChild(pager);
        cosol
    })
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
