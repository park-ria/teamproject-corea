// login 유무
let loginCheck = JSON.parse(localStorage.getItem("loginCheck")) || [];

const bannerRight = document.querySelector(".banner-right");
bannerRight.innerHTML = `
<a href="/pages/login.html" class="login">로그인</a>
<a href="#none" class="logout">로그아웃</a>
<a href="/pages/sign_in.html">회원가입</a>
<a href="/pages/faq.html">F&Q</a>
`;

const loginBtn = document.querySelector(".banner-right .login");
const logoutBtn = document.querySelector(".banner-right .logout");

if (loginCheck.length > 0) {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "block";
}

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginCheck = [];
  localStorage.setItem("loginCheck", JSON.stringify(loginCheck));
  loginBtn.style.display = "block";
  logoutBtn.style.display = "none";

  const moveURL = `${window.location.pathname}${
    new URLSearchParams(window.location.search).toString() === ""
      ? ""
      : "?" + new URLSearchParams(window.location.search).toString()
  }`;
  console.log(decodeURIComponent(moveURL));

  window.location.href = decodeURIComponent(moveURL);
});

document.querySelectorAll(".lnb li").forEach((item) => {
  item.addEventListener("click", () => {
    if (loginCheck.length === 0) location.href = "/pages/login.html";
  });
});

// AppDowload 클릭시 이벤트
const apppDownload = document.querySelector(".appDownload");
apppDownload.addEventListener("click", function () {
  this.querySelector(".download-box").classList.toggle("active");
});

// scroll 이동시 banner event
window.addEventListener("scroll", () => {
  let scrolling = window.scrollY;
  const banner = document.querySelector(".ban");
  const header = document.querySelector("#header");

  if (scrolling > 33) {
    banner.classList.add("active");
    header.style.boxShadow = "0 0 10px #ccc";
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
  "노트북",
  "캠핑의자",
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
  `<i class="fa-solid fa-sort-down"></i></i>`,
  `<i class="fa-solid fa-caret-up"></i>`,
];

// Current-time
const todday = new Date();
const year = todday.getFullYear();
let month = todday.getMonth() + 1;
let date = todday.getDate();

month = month < 10 ? `0${month}` : month;
date = date < 10 ? `0${date}` : date;

let hours = todday.getHours();
hours = hours < 10 ? `0${hours}` : hours;

const currentTimers = document.querySelectorAll(".current-time");
currentTimers.forEach((currentTimer) => {
  currentTimer.innerText = `${year}-${month}-${date} ${hours}:00 기준`;
});

let recentWords = [];

const save = () => {
  localStorage.setItem("recentWords", JSON.stringify(recentWords));
};

const recentList = document.querySelectorAll(".recent-list");

const delItem = (e) => {
  const target = e.target.parentElement.parentElement.parentElement;

  target.remove();
  recentWords = recentWords.filter(
    (recentWord) =>
      recentWord !=
      e.target.closest("li").querySelector(".recent-word").innerText
  );
  noWords(recentWords.length);
  save();

  target.remove();
};

// Recent-list 생성 및 삭제
const searchForm = document.querySelector(".search-box form");
const searchInput = document.querySelectorAll(".search-box input[type='text']");
const searchSubmit = document.querySelector(".search-box input[type='submit']");
const searchWordList = document.querySelectorAll(".searchedword-list");

// 검색창 클릭 이벤트
searchInput[0].addEventListener("click", (e) => {
  searchWordList[0].classList.add("active");
});

document.querySelector("main").addEventListener("click", (e) => {
  if (e.currentTarget == document.querySelector("main")) {
    searchWordList[0].classList.remove("active");
  }
});

// nowords display-none 이벤트
const noWords = (length) => {
  if (length > 0) {
    document.querySelectorAll(".no-words")[0].style.display = "none";
    document.querySelectorAll(".no-words")[1].style.display = "none";
  } else {
    document.querySelectorAll(".no-words")[0].style.display = "block";
    document.querySelectorAll(".no-words")[1].style.display = "block";
  }
};

const addWord = (recentWord) => {
  if (recentWord !== "") {
    const div = document.createElement("div");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const currentDate = document.createElement("span");

    currentDate.innerText = `${year}.${month}.${date}`;
    currentDate.className = "current-date";
    span.innerText = recentWord;
    span.className = "recent-word";
    button.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    // button.addEventListener("click", delItem);
    button.className = "delete-button";
    div.className = "recent-box";
    li.className = "new-word";

    div.appendChild(currentDate);
    div.appendChild(button);
    li.appendChild(span);
    li.appendChild(div);

    const li2 = li.cloneNode(true);
    recentList[0].prepend(li);
    recentList[1].prepend(li2);

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", delItem);
    });
  }
};

const handler1 = (e) => {
  e.preventDefault();

  recentWords = recentWords.filter(
    (recentWord) => recentWord != searchInput[0].value
  );
  recentWords.push(searchInput[0].value);

  noWords(recentWords.length);
  addWord(searchInput[0].value);
  save();

  searchInput[0].value = null;
};

const handler2 = (e) => {
  e.preventDefault();

  recentWords = recentWords.filter(
    (recentWord) => recentWord != searchInput[1].value
  );
  recentWords.push(searchInput[1].value);

  noWords(recentWords.length);
  addWord(searchInput[1].value);
  save();

  searchInput[1].value = null;
};

const init = () => {
  const userRecentWords = JSON.parse(localStorage.getItem(`recentWords`));

  if (userRecentWords) {
    noWords(userRecentWords.length);
    userRecentWords.forEach((recentWord) => {
      addWord(recentWord);
    });
    recentWords = userRecentWords;
  } else {
    recentWords = [];
  }
};

init();

document.hdForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (recentWords.length > 0) {
    const samewords = recentWords.find(
      (sameword) => sameword === e.target.children[0].value
    );

    recentList.forEach((duplicatedwords) => {
      duplicatedwords.querySelectorAll("li").forEach((duplicatedword) => {
        if (
          duplicatedword &&
          duplicatedword.querySelector("span").innerText === samewords
        ) {
          duplicatedword.remove();
        }
      });
    });
  }
  handler1(e);
});

document.mbForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (recentWords.length > 0) {
    const samewords = recentWords.find(
      (sameword) => sameword === e.target.children[1].value
    );

    recentList.forEach((duplicatedwords) => {
      duplicatedwords.querySelectorAll("li").forEach((duplicatedword) => {
        if (
          duplicatedword &&
          duplicatedword.querySelector("span").innerText === samewords
        ) {
          duplicatedword.remove();
        }
      });
    });
  }
  handler2(e);
});

// Ranking-list 생성
listArray1.forEach((word, index) => {
  const headerRanking = document.querySelector("#header .ranking-list");
  const mobileRanking = document.querySelector("#mobile-search .ranking-list");

  const li = document.createElement("li");
  const aTag = document.createElement("a");
  const span = document.createElement("span");
  const upDown = document.createElement("span");

  span.innerText = `${index + 1}`;
  span.style = "color: #0dcc5a; font-weight: bold; font-size: 16px";
  aTag.innerText = word;
  aTag.prepend(span);

  upDown.className = "up-down";
  upDown.innerHTML = `<i class="fa-solid fa-caret-up"></i>`;
  upDown.style = "color: #0dcc5a; font-size: 14px";

  li.style = ` grid-area: rank${index + 1}`;

  li.appendChild(aTag);
  li.appendChild(upDown);
  const li2 = li.cloneNode(true);
  headerRanking.appendChild(li);
  mobileRanking.appendChild(li2);
});

// Popular-searchedWord 리스트 생성
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
  span.style = "color: #0dcc5a; font-weight: bold; font-size: 16px";
  aTag.innerText = item;
  aTag.prepend(span);

  upDown.className = "up-down";
  upDown.style = "color: #0dcc5a; font-size: 14px";
  li.appendChild(aTag);

  const li2 = li.cloneNode(true);
  popularList.appendChild(li);
  li2.appendChild(upDown);
  list.appendChild(li2);
});

listArray2.forEach((ele, i) => {
  document.querySelectorAll(".list .up-down")[i].innerHTML = `${ele}`;
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

// Header Category 생성
const categoryData = "../db.json";

fetch(categoryData)
  .then((response) => response.json())
  .then((data) => {
    const main = document.querySelector(".main-category");

    // headercategory
    data.category.forEach((mainCategory) => {
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
      main.appendChild(mainLi);
    });

    // Barmenu mouseover
    const barMenu = document.querySelector(".barmenu");

    barMenu.addEventListener("click", () => {
      main.classList.add("active");
    });

    main.addEventListener("mouseleave", () => {
      main.classList.remove("active");
    });

    // Main-category mouseover
    const mains = document.querySelectorAll(".main-category > li");

    mains.forEach((main) => {
      main.addEventListener("mouseover", (e) => {
        if (e.target.querySelector(".sub-category1")) {
          e.target.querySelector(".sub-category1").classList.add("active");
        }
      });

      main.addEventListener("mouseleave", (e) => {
        if (e.target.querySelector(".sub-category1")) {
          e.target.querySelector(".sub-category1").classList.remove("active");
        }
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

    const mobileSearchMenu = document.querySelector(
      ".menu-box button:first-child"
    );
    const mobileMenu = document.querySelector(".menu-box button:last-child");
    const mobileMain = document.querySelector(".categroy-main");
    const mobileSearch = document.querySelector("#mobile-search");
    const mobileArea = document.querySelector("#mobile-category");

    // Mobile-search 클릭 이벤트
    mobileSearchMenu.addEventListener("click", (e) => {
      e.preventDefault();

      if (mobileArea.classList.contains("active")) {
        mobileArea.classList.remove("active");
      }

      if (mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
      }

      mobileSearchMenu.classList.add("active");
      mobileSearch.classList.add("active");
    });

    const backBtn = document.querySelector("#mobile-search form button");

    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      mobileSearchMenu.classList.remove("active");
      mobileSearch.classList.remove("active");
    });

    // MobileMenu 클릭 이벤트
    mobileMenu.addEventListener("click", (e) => {
      e.preventDefault();

      if (mobileSearch.classList.contains("active")) {
        mobileSearch.classList.remove("active");
      }

      if (mobileSearchMenu.classList.contains("active")) {
        mobileSearchMenu.classList.remove("active");
      }

      mobileArea.classList.toggle("active");
      mobileMenu.classList.toggle("active");

      const categorySubs = document.querySelectorAll(".category-sub");
      categorySubs.forEach((categorySub) => {
        if (categorySub.classList.contains("active")) {
          categorySub.classList.remove("active");
        }
      });
    });

    // Making MobileCategory
    data.category.forEach((mobileCategory, index) => {
      mobileMain.innerHTML += `
    <li>
      <div class="category-img">
        <div class="img-box">
          <img src="../images/detail/mobile-category${
            index + 1
          }.png" alt="mobile-category${index + 1}">
        </div>
        <span>${mobileCategory.main}</span>
      </div>
      <div class="category-sub">
        <ul></ul>
      </div>
    </li>
        `;

      const categorySubs = document.querySelectorAll(".category-sub");

      if (index % 5 !== 0) {
        categorySubs[index].style.transform = `translateX(-${
          (index % 5) * 20
        }%)`;
      }

      const mobileSub = document.querySelectorAll(".category-sub ul");

      mobileCategory.sub.forEach((sub) => {
        mobileSub[index].innerHTML += `
        <li>- ${sub.title}</li>
        `;
      });
    });

    // Mobile-category-img 클릭시 이벤트
    const mobileMainImgs = mobileMain.querySelectorAll(".category-img");
    mobileMainImgs.forEach((img) => {
      img.addEventListener("click", function () {
        mobileMainImgs.forEach((item) => {
          item.nextElementSibling.classList.remove("active");
        });
        img.nextElementSibling.classList.add("active");
      });
    });

    // Footer category-list
    const categoryUl = document.querySelector(".category-list");
    const categoryBtn = document.querySelector(".footer-upper-ctg button");

    data.category.forEach((category) => {
      const liItem = document.createElement("li");
      const aTag = document.createElement("a");
      aTag.innerText = category.main;
      liItem.appendChild(aTag);
      categoryUl.appendChild(liItem);
    });

    categoryBtn.addEventListener("click", function () {
      this.classList.toggle("active");
      categoryUl.classList.toggle("active");
    });
  });

// quickMenu
const quickMenu = document.querySelector(".quickMenu");
const addQuickMenu = () => {
  const quickBtns = document.createElement("ul");
  const liTrigger = document.createElement("li");
  const moveTop = document.createElement("li");

  quickMenu.className = "quickMenu";
  quickBtns.className = "quickBtns";
  liTrigger.className = "trigger";
  moveTop.className = "moveTop";

  const openMenu = `
            <button>
              <i class="fa-solid fa-plus"></i>
            </button>
            <ul class="movePages">
              <li>
                <a 
                href="#none"
                class="mypage"
                target="_blank"
                >
                마이페이지 
                </a>
              </li>
              <li>
                <a 
                href="/pages/wishlist.html" 
                class="cart"
                target="_blank"
                >
                찜한상품
                </a>
              </li>
              <li>
                <a
                  href="/pages/auction.html"
                  class="auction"
                  target="_blank"
                >
                중고경매
                </a>
              </li>
            </ul>
`;

  const moveTopBtn = `
            <a href="#">
              <i class="fa-solid fa-arrow-up"></i>
            </a>
`;

  liTrigger.insertAdjacentHTML("afterbegin", openMenu);
  moveTop.insertAdjacentHTML("afterbegin", moveTopBtn);

  quickBtns.append(liTrigger, moveTop);
  quickMenu.appendChild(quickBtns);

  liTrigger.addEventListener("click", function () {
    this.classList.toggle("active");
  });

  document.querySelector(".mypage").addEventListener("click", (e) => {
    e.preventDefault();
    if (loginCheck.length === 0) {
      location.href = "/pages/login.html";
    }
  });
};
addQuickMenu();

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) quickMenu.classList.add("active");
  else quickMenu.classList.remove("active");
});
