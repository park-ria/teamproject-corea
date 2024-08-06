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

// iframe
function resizeIframe(iframe) {
  var doc = iframe.contentDocument || iframe.contentWindow.document;
  var height = doc.documentElement.scrollHeight || doc.body.scrollHeight;
  iframe.style.height = height + 'px';
  var wrapper = document.getElementById('wrapper');
  wrapper.style.height = height + 'px';
}