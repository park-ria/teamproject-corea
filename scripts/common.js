// scroll 이동시 banner event
window.addEventListener("scroll", () => {
  let scrolling = window.scrollY;
  const banner = document.querySelector(".ban");

  if (scrolling > 33) {
    banner.classList.add("active");
  } else {
    banner.classList.remove("active");
  }
});

// list-btn click시 list event
const listBtn = document.querySelector(".list-btn");

listBtn.addEventListener("click", () => {
  const list = document.querySelector(".list");

  listBtn.classList.toggle("active");
  list.classList.toggle("active");
});

// list값 추가
const list = document.querySelector(".list");
const listArray1 = [
  "닌텐도",
  "아이폰",
  "화장품",
  "장난감",
  "영화티켓",
  "청바지",
  "슬리퍼",
  "운동화",
];
const listArray2 = [
  `<i class="fa-solid fa-caret-up"></i>`,
  `<i class="fa-solid fa-caret-up"></i>`,
  `<i class="fa-solid fa-sort-down"></i></i>`,
  `<i class="fa-solid fa-caret-up"></i>`,
  `<i class="fa-solid fa-sort-down"></i></i>`,
  `<i class="fa-solid fa-caret-up"></i>`,
  `<i class="fa-solid fa-caret-up"></i>`,
  `<i class="fa-solid fa-sort-down"></i></i>`,
];
const popularList = document.querySelector(".popular-searchedWord ul");

listArray1.forEach((item, index) => {
  const li = document.createElement("li");
  const aTag = document.createElement("a");
  const span = document.createElement("span");
  const upDown = document.createElement("span");

  if (index === 0) {
    li.classList.add("current");
  } else if (index === 1) {
    li.classList.add("next");
  } else if (index === listArray1.length - 1) {
    li.classList.add("prev");
  }

  span.innerText = `${index + 1}`;
  span.style = "color: #0dcc5a; font-weight: bold; font-size: 16px"
  aTag.innerText = item;
  aTag.prepend(span);

  upDown.className = "up-down";
  upDown.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
  upDown.style = "color: #0dcc5a; font-size: 14px"
  li.appendChild(aTag);
  
  const li2 = li.cloneNode(true);
  popularList.appendChild(li);
  li2.appendChild(upDown);
  list.appendChild(li2);
});

listArray2.forEach((ele, i) => {
  document.querySelectorAll(".up-down")[i].innerHTML = `${ele}`;
});


// popular-searchedWord event
const rollingCB = () => {
  const prevItem = document.querySelector(".prev");
  prevItem.classList.remove("prev");

  const currentItem = document.querySelector(".current");
  currentItem.classList.remove("current");
  currentItem.classList.add("prev");

  const nextItem = document.querySelector(".next");

  if (nextItem.nextElementSibling == null) {
    const firstItem = document.querySelector(
      ".popular-searchedWord ul li:first-child"
    );
    firstItem.classList.add("next");
  } else {
    nextItem.nextElementSibling.classList.add("next");
  }

  nextItem.classList.remove("next");
  nextItem.classList.add("current");
};

let interval = setInterval(rollingCB, 3000);

const items = document.querySelectorAll(".popular-searchedWord ul li a");
items.forEach((item) => {
  item.addEventListener("mouseover", () => {
    clearInterval(interval);
  });
  item.addEventListener("mouseout", () => {
    interval = setInterval(rollingCB, 3000);
  });
});

// Category
const categoryData = {
  data: [
    {
      main: "패션의류",
      sub: [
        {
          title: "여성의류",
          list: [
            "티셔츠/캐쥬얼의류",
            "니트/스웨터/가디건",
            "원피스/정장",
            "블라우스/셔츠/남방",
            "조끼/베스트",
            "바지/팬츠/청바지",
            "스커트,치마",
            "자켓/코트",
            "패딩/야상/점퍼",
            "트레이닝복",
            "언더웨어/잠옷",
            "파티복/드레스/기타",
          ],
        },
        {
          title: "남성의류",
          list: [
            "티셔츠/캐쥬얼의류",
            "니트/스웨터/가디건",
            "정장",
            "조끼/베스트",
            "셔츠/남방",
            "바지/팬츠/청바지",
            "자켓/코트",
            "패딩/야상/점퍼",
            "트레이닝복",
            "언더웨어/잠옷",
            "테마의상/기타",
          ],
        },
        {
          title: "남성의류",
          list: [
            "티셔츠/캐쥬얼의류",
            "니트/스웨터/가디건",
            "정장",
            "조끼/베스트",
            "셔츠/남방",
            "바지/팬츠/청바지",
            "자켓/코트",
            "패딩/야상/점퍼",
            "트레이닝복",
            "언더웨어/잠옷",
            "테마의상/기타",
          ],
        },
        {
          title: "클로젯셰어",
          list: ["상의/하의", "원피스", "아우터"],
        },
      ],
    },
    {
      main: "패션잡화",
      sub: [
        {
          title: "운동화",
          list: ["런닝화/워킹화", "단화/캐쥬얼화", "기타운동화/관련용품"],
        },
        {
          title: "여성신발",
          list: [
            "웨지힐/통굽",
            "펌프스/하이힐",
            "단화/로퍼",
            "워커/부츠/부티",
            "샌들/슬리퍼",
            "슬링백/뮬/블로퍼",
          ],
        },
        {
          title: "남자신발",
          list: ["단화/로퍼/구두", "워커/부츠", "샌들/슬리퍼"],
        },
        {
          title: "가방",
          list: [
            "숄더백",
            "크로스백",
            "토트백",
            "백팩",
            "힙색/세컨백",
            "파우치/클러치백",
            "서류가방",
            "여행가방",
          ],
        },
        {
          title: "지갑",
          list: ["여성용지갑", "남성용지갑", "머니클립", "명함/키지갑"],
        },
        {
          title: "악세사리",
          list: [
            "남성용시계",
            "여성용시계",
            "반지/귀걸이",
            "목걸이/팬던트",
            "팔찌/발찌",
          ],
        },
        {
          title: "선글라스",
          list: ["선글라스", "안경/안경테"],
        },
        {
          title: "모자",
          list: ["스냅백/야구모자", "패션/방한모자"],
        },
      ],
    },
    {
      main: "출산유아동",
      sub: [
        {
          title: "육아용품",
          list: [
            "모유수유용품",
            "분유수유용품",
            "튼살크림",
            "임부복",
            "물티슈/기저귀",
            "분유/이유식",
            "영유아의류",
            "목욕용품",
            "위생용품",
            "유모차/웨건",
          ],
        },
        {
          title: "유아동의류",
          list: [
            "유아용의류",
            "아동용의류",
            "잠옷/속옷",
            "패딩/자켓",
            "한복/소품",
          ],
        },
        {
          title: "유아동가구",
          list: ["침대/매트리스", "옷장/서랍장", "책상/책장", "의자/소파"],
        },
        {
          title: "유아동완구",
          list: [
            "신생아완구",
            "음악놀이",
            "자동차/핫휠",
            "로봇",
            "인형",
            "디즈니의상",
            "블록/레고",
          ],
        },
      ],
    },
    {
      main: "모바일테블릿",
      sub: [
        {
          title: "스마트폰",
          list: ["삼성", "애플", "LG"],
        },
        {
          title: "태블릿PC",
          list: ["삼성", "애플", "기타제조사"],
        },
        {
          title: "스마트워치/밴드",
        },
        {
          title: "일반/피쳐폰",
        },
        {
          title: "케이스/거치대",
        },
        {
          title: "배터리/충전기",
        },
      ],
    },
    {
      main: "가전제품",
      sub: [
        {
          title: "냉장고",
        },
        {
          title: "TV",
        },
        {
          title: "세탁기/건조기",
        },
        {
          title: "주방가전",
          list: [
            "전기밥솥",
            "가스/전기레인지",
            "오븐/제빵기",
            "정수기",
            "커피기기",
            "살균기/세척기",
            "주방소형가전",
          ],
        },
        {
          title: "스마트홈",
          list: ["인공지능스피커", "홈캠", "스마트램프"],
        },
        {
          title: "영상가전",
          list: ["영상플레이어", "프로젝터", "전자사전/PMP"],
        },
        {
          title: "음향가전",
          list: [
            "이어폰/헤드폰",
            "스피커",
            "마이크",
            "음향플레이어",
            "오디오/홈시어터",
            "LP/턴테이블",
            "리시버/앰프",
          ],
        },
        {
          title: "생활가전",
          list: [
            "청소기",
            "비데",
            "안마기/안마의자",
            "스탠드/조명",
            "다리미보풀제거기",
            "도어록",
          ],
        },
        {
          title: "미용가전",
          list: [
            "드라이기/고데기",
            "면도기/제모기/이발기",
            "구강새정기/전동칫솔",
          ],
        },
      ],
    },
    {
      main: "노트북/PC",
      sub: [
        {
          title: "노트북/넷북",
          list: ["삼성", "애플", "LG"],
        },
        {
          title: "데스크탑",
          list: ["일체형PC", "브랜드PC", "조립PC"],
        },
        {
          title: "모니터",
        },
        {
          title: "프린터/복합기",
        },
        {
          title: "키보드/마우스/스피커",
        },
        {
          title: "공유기/랜카드",
        },
      ],
    },
    {
      main: "카메라/캠코더",
      sub: [
        {
          title: "DSLR",
        },
        {
          title: "미러리스",
        },
        {
          title: "디지털카메라",
        },
        {
          title: "필름카메라",
        },
        {
          title: "캠코더/액션캠",
        },
        {
          title: "카메라용품",
        },
      ],
    },
    {
      main: "가구인테리어",
      sub: [
        {
          title: "침실가구",
          list: ["침대/매트리스", "서랍장/옷장", "화장대/협탁/거울"],
        },
        {
          title: "침실가구",
          list: ["침대/매트리스", "서랍장/옷장", "화장대/협탁/거울"],
        },
        {
          title: "거실가구",
          list: ["소파", "거실테이블/의자", "거실장/장식장"],
        },
        {
          title: "주방가구",
          list: ["식탁/식탁의자", "렌지대/수납장", "기타 주방가구"],
        },
        {
          title: "기타가구",
        },
      ],
    },
    {
      main: "게임",
      sub: [
        {
          title: "PC게임",
        },
        {
          title: "플레이스테이션",
        },
        {
          title: "PSP",
        },
        {
          title: "닌텐도",
        },
        {
          title: "Wii",
        },
        {
          title: "XBOX",
        },
      ],
    },
    {
      main: "반려동물/취미",
      sub: [
        {
          title: "반려동물",
          list: ["강아지용품", "고양이용품", "관상어용품", "기타용품"],
        },
        {
          title: "키덜트",
          list: ["피규어/브릭", "프라모델", "레고/조립/블록", "드론/헬리캠"],
        },
        {
          title: "악기",
          list: ["건반악기", "현악기", "관악기/타악기"],
        },
      ],
    },
    {
      main: "도서/음반/문구",
      sub: [
        {
          title: "유아동도서/음반",
        },
        {
          title: "학습/교육",
          list: [
            "학습/참고서",
            "수험서/자격증",
            "컴퓨터/인터넷",
            "국어/외국어",
            "기타학습서",
          ],
        },
        {
          title: "소설/만화책",
          list: ["소설책", "만화책"],
        },
        {
          title: "여행/취미/레저",
          list: ["여행/레저도서", "취미도서"],
        },
        {
          title: "문학/과학/경영",
        },
        {
          title: "예술/디자인",
        },
        {
          title: "잡지",
        },
      ],
    },
    {
      main: "티켓/쿠폰",
      sub: [
        {
          title: "티켓",
          list: ["콘서트", "스포츠", "뮤지컬/연극/클래식"],
        },
        {
          title: "상품권/쿠폰",
          list: [
            "백화점/마트/편의점",
            "영화/문화/게임",
            "외식/주유",
            "여행/숙박",
          ],
        },
      ],
    },
    {
      main: "스포츠",
      sub: [
        {
          title: "골프",
          list: [
            "드라이버",
            "우드/유틸리티",
            "아이언",
            "웨지/퍼터",
            "골프백/풀세트",
            "골프의류",
            "기타용품",
          ],
        },
        {
          title: "자전거",
          list: [
            "하이브리드/픽시",
            "로드바이크/사이클",
            "산악자전거",
            "전기자전거",
            "아동자전거",
            "자전거용품",
          ],
        },
        {
          title: "인라인/스케이트",
          list: ["인라인/스케이트", "스케이트보드", "전기/전동레저"],
        },
        {
          title: "축구",
          list: ["축구의류/축구화", "축구공/용품"],
        },
        {
          title: "야구",
          list: ["야구의류/야구화", "야구공/용품"],
        },
        {
          title: "농구",
          list: ["농구의류/농구화", "농구공/용품"],
        },
        {
          title: "수상스포츠",
          list: [
            "비키니/여성수영복",
            "남성수영복",
            "아동용의류/용품",
            "스쿠버/다이빙용품",
          ],
        },
        {
          title: "겨울스포츠",
          list: [
            "스키/보드의류",
            "남성수영복",
            "아동용의류/용품",
            "스쿠버/다이빙용품",
          ],
        },
      ],
    },
    {
      main: "레저/여행",
      sub: [
        {
          title: "등산의류/용품",
          list: [
            "남성등산의류",
            "여성등산의류",
            "등산화/배낭/장비",
            "기타등산용품",
          ],
        },
        {
          title: "캠핌용품",
          list: ["텐트/침낭", "취사용품/장비", "기타캠핑용품"],
        },
        {
          title: "낚시용품",
        },
        {
          title: "기타레저용품",
        },
      ],
    },
    {
      main: "오토바이",
      sub: [
        {
          title: "125cc이하",
        },
        {
          title: "125cc초과",
        },
        {
          title: "오토바이용품",
        },
        {
          title: "신차",
        },
      ],
    },
    {
      main: "공구/산업용품",
      sub: [
        {
          title: "드릴/전동공구",
        },
        {
          title: "작업공구",
        },
        {
          title: "측정공구",
        },
        {
          title: "전기/전자",
        },
        {
          title: "배관설비",
        },
        {
          title: "용접기자재",
        },
        {
          title: "산업/안전공구함",
        },
        {
          title: "산업자재",
        },
        {
          title: "농업용공구",
        },
      ],
    },
    {
      main: "중고차",
      sub: [
        {
          title: "국산차",
        },
        {
          title: "수입차",
        },
      ],
    },
  ],
};

const main = document.querySelector(".main-category");

categoryData.data.forEach((mainCategory) => {
  const mainA = document.createElement("a");
  const mainLi = document.createElement("li");
  const subUl = document.createElement("ul");

  mainA.innerText = mainCategory.main;
  mainLi.appendChild(mainA);
  subUl.className = "sub-category1";

  mainCategory.sub.forEach((subCategory) => {
    const subA = document.createElement("a");
    const subLi = document.createElement("li");
    const lastUl = document.createElement("ul");

    subA.innerText = subCategory.title;
    subLi.appendChild(subA);
    lastUl.className = "sub-category2";

    if (subCategory.list) {
      subCategory.list.forEach((list) => {
        //console.log(list);
        const listA = document.createElement("a");
        const listLi = document.createElement("li");

        listA.innerText = list;
        listLi.appendChild(listA);
        lastUl.appendChild(listLi);
      });
    }
    subLi.appendChild(lastUl);
    subUl.appendChild(subLi);
  });
  mainLi.appendChild(subUl);
  // main.appendChild(mainLi);
});

// Barmenu mouseover
const barMenu = document.querySelector(".barmenu");

barMenu.addEventListener("mouseover", () => {
  main.classList.add("active");
});

main.addEventListener("mouseleave", () => {
  main.classList.remove("active");
});

// Main-category mouseover
const mains = document.querySelectorAll(".main-category > li");

mains.forEach((main) => {
  main.addEventListener("mouseover", (e) => {
    e.target.querySelector(".sub-category1").classList.add("active");
  });

  main.addEventListener("mouseleave", (e) => {
    e.target.querySelector(".sub-category1").classList.remove("active");
  });
});

// Sub-categroy mouseover
const subs = document.querySelectorAll(".sub-category1 > li");

subs.forEach((sub) => {
  sub.addEventListener("mouseover", (e) => {
    if (e.target.querySelector(".sub-category2 > li")) {
      e.target.querySelector(".sub-category2").classList.add("active");
    }
  });

  sub.addEventListener("mouseleave", (e) => {
    e.target.querySelector(".sub-category2").classList.remove("active");
  });
});
