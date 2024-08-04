// Img-slider
const moveSlide = (num) => {
    const imgWrapper = document.querySelector(".img-wrapper");
    const slideWidth = document.querySelector(".img-slide").offsetWidth;

    imgWrapper.style.transform = `translateX(-${slideWidth * num}px)`
    currentIndex = num;
    pagerActive();
};

const slideCount = document.querySelectorAll(".img-slide").length;

let currentIndex = 0;

const moveLeft = () => {
    let prevIndex = (currentIndex - 1) % slideCount;
    if(currentIndex === 0) prevIndex = slideCount - 1;
    moveSlide(prevIndex);
};

const moveRight = () => {
    let nextIndex = (currentIndex + 1) % slideCount;
    if(currentIndex === slideCount - 1) nextIndex = 0;
    moveSlide(nextIndex);
}

const imgPrev = document.querySelector(".img-prev");
const imgNext = document.querySelector(".img-next");

imgPrev.addEventListener("click", moveLeft);
imgNext.addEventListener("click", moveRight);

const pagers = document.querySelectorAll(".img-pager");

pagers.forEach((pager, index) => {
    pager.addEventListener("click", () => {
        moveSlide(index);
        pagerActive();
    });
});

const pagerActive = () => {
    pagers.forEach((item) => {
        item.addEventListener("click", function() {
            pagers.forEach((sibling) => {
                if(sibling !== item) {
                    sibling.classList.remove("active");
                }
            });
            this.classList.add("active");
        });
    });
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
