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
const listArray = [
  "닌텐도",
  "아이폰",
  "화장품",
  "장난감",
  "영화티켓",
  "청바지",
  "슬리퍼",
  "운동화",
];
const popularList = document.querySelector(".popular-searchedWord ul");

listArray.forEach((item, index) => {
  const li = document.createElement("li");
  const aTag = document.createElement("a");
  const span = document.createElement("span");

  if (index === 0) {
    li.classList.add("current");
  } else if (index === 1) {
    li.classList.add("next");
  } else if (index === listArray.length - 1) {
    li.classList.add("prev");
  }

  span.innerText = `${index + 1}.`;
  aTag.innerText = item;
  aTag.prepend(span);
  li.appendChild(aTag);
  const li2 = li.cloneNode(true);
  list.appendChild(li2);
  popularList.appendChild(li);
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

// Footer category-list
const categoryUl = document.querySelector(".category-list");
const categoryBtn = document.querySelector(".footer-upper-ctg button");
const categoryList = [
  "전체",
  "수입명품",
  "패션의류",
  "패션잡화",
  "뷰티",
  "출산/유아동",
  "모바일/태블릿",
  "가전제품",
  "노트북/PC",
  "카메라/캠코더",
  "가구/인테리어",
  "리빙/생활",
  "게임",
  "반려동물/취미",
  "도서/음반/문구",
  "티켓/쿠폰",
  "스포츠",
  "레저/여행",
  "오토바이",
  "공구/산업용품",
  "무료나눔",
  "중고차",
];

categoryList.forEach((item) => {
  const liItem = document.createElement("li");
  const aTag = document.createElement("a");
  aTag.innerText = item;
  liItem.appendChild(aTag);
  categoryUl.appendChild(liItem);
});

categoryBtn.addEventListener("click", function () {
  this.classList.toggle("active");
  categoryUl.classList.toggle("active");
});
