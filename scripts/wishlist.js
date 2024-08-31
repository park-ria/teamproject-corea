let wishItemArr;
let wishItemArrDetail = [];
let favoriteStoresArr;
let favorStoreArrDetail = [];
let favoriteBrandsArr;

// checkEmptyData
const checkEmptyData = (arr) => {
  const emptyMsg = document.querySelector(
    ".wishlistContent.active > .emptyMsg"
  );
  const siblings = document.querySelectorAll(
    ".wishlistContent.active > .emptyMsg ~ div"
  );

  if (arr.length === 0) {
    siblings.forEach((sibling) => {
      sibling.style.opacity = 0;
      sibling.style.height = 0;
    });
    emptyMsg.style.opacity = 1;
    emptyMsg.style.height = "400px";
  } else {
    siblings.forEach((sibling) => {
      sibling.style.opacity = 1;
      sibling.style.height = "auto";
    });
    emptyMsg.style.opacity = 0;
    emptyMsg.style.height = 0;
  }
};

// tab button click event
const wishlistTabButton = document.querySelectorAll(".wishlistTabButton");
wishlistTabButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    const wishlistContent = document.querySelectorAll(".wishlistContent");
    const target = document.querySelector(
      `.${this.getAttribute("data-tab-name")}-content`
    );

    // Initialize tab buttons and apply virtual class
    wishlistTabButton.forEach((sibling) => {
      if (sibling !== this) sibling.classList.remove("active");
    });
    this.classList.add("active");

    // Initialize tab contents and apply virtual class
    wishlistContent.forEach((item) => {
      if (item !== target) item.classList.remove("active");
    });
    target.classList.add("active");

    switch (this.getAttribute("data-arr-name")) {
      case "wishItem":
        checkEmptyData(wishItemArr);
        break;
      case "favoriteStores":
        checkEmptyData(favoriteStoresArr);
        break;
      case "favoriteBrands":
        checkEmptyData(favoriteBrandsArr);
        break;
    }
  });
});

// insert a count into the tab button
const chanageTabBtnCnt = () => {
  document.querySelector(".wishItems").innerText = wishItemArr.length;
  document.querySelector(".favoriteStores").innerText =
    favoriteStoresArr.length;
  document.querySelector(".favoriteBrands").innerText =
    favoriteBrandsArr.length;
};

// all select event
const allCheck = document.querySelector("#allSelection");
allCheck.addEventListener("click", function () {
  const isChecked = this.checked;
  const checkWishItem = document.querySelectorAll(
    "input[name='checkWishItem']"
  );
  checkWishItem.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
});

// deleteSeletionButton event
const deleteSeletionButton = document.querySelector("#deleteSeletionButton");
deleteSeletionButton.addEventListener("click", () => {
  const checkedItem = document.querySelectorAll(
    "input[name='checkWishItem']:checked"
  );

  if (checkedItem.length === 0) {
    alert("삭제할 상품을 선택해주세요.");
    return;
  }

  checkedItem.forEach((item) => {
    delWishItem(item.closest("li"));
  });

  allCheck.checked = false;
});

// sorting btton click event
const sortingButtons = document.querySelectorAll(".sorting-group a");
sortingButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    sortingButtons.forEach((sibling) => {
      if (sibling !== this) sibling.classList.remove("active");
    });
    this.classList.add("active");
    allCheck.checked = false;
  });
});

const addSortedItem = (sortedProducts) => {
  document.querySelector(".wishItemList").innerHTML = "";

  sortedProducts.forEach((product, index) => {
    addItemsInTheWishItemList(product, index);
  });
  wishItemButtonEvent();
};

// latestSorting
const latestSorting = document.querySelector("#latestSorting");
const sortNew = () => {
  const sortedProducts = wishItemArrDetail.sort((a, b) => {
    return new Date(b.real_time).getTime() - new Date(a.real_time).getTime();
  });

  addSortedItem(sortedProducts);
};
latestSorting.addEventListener("click", sortNew);

// popularSorting
const popularSorting = document.querySelector("#popularSorting");
const sortPopular = () => {
  const sortedProducts = wishItemArrDetail.sort((a, b) => {
    return b.detail.view - a.detail.view;
  });

  addSortedItem(sortedProducts);
};
popularSorting.addEventListener("click", sortPopular);

// lowPriceSorting
const lowPriceSorting = document.querySelector("#lowPriceSorting");
const sortLowPrice = () => {
  const sortedProducts = wishItemArrDetail.sort((a, b) => {
    return a.price.replace(/[^0-9]/g, "") - b.price.replace(/[^0-9]/g, "");
  });

  addSortedItem(sortedProducts);
};
lowPriceSorting.addEventListener("click", sortLowPrice);

// highPriceSorting
const highPriceSorting = document.querySelector("#highPriceSorting");
const sortHighPrice = () => {
  const sortedProducts = wishItemArrDetail.sort((a, b) => {
    return b.price.replace(/[^0-9]/g, "") - a.price.replace(/[^0-9]/g, "");
  });

  addSortedItem(sortedProducts);
};
highPriceSorting.addEventListener("click", sortHighPrice);

// putting items in the wishItemList
const addItemsInTheWishItemList = (product, index) => {
  const li = `
      <li>
        <input type="checkbox" name="checkWishItem" id="wishItem${
          index + 1
        }" value="${product.id}" />
        <label for="wishItem${index + 1}"></label>
        <div class="wishItem">
          <div class="wishItemImgWrapper">
            <a href="/pages/detail.html?id=${
              product.id
            }" class="wishItemViewMore">
              <img
                src="../${product.image_path}"
                alt="product_image"
              />
            </a>
            <button class="wishHeart">
              <i class="fa-solid fa-heart"></i>
            </button>
          </div>
          <div class="wishItemDescGroup">
            <div class="wishItemDesc">
              <a href="/pages/detail.html?id=${
                product.id
              }" class="wishItemViewMore">
                <span class="wishItemInfo">
                  <span class="wishItemTitleBox">
                    <p class="wishItemSellerName">${
                      product.detail.store_name
                    }</p>
                    <p class="wishItemName">
                      ${product.title}
                    </p>
                  </span>
                  <span class="wishItemPriceBox">
                    <span class="wishItemPriceInfo">
                      <p class="wishItemPrice">
                        <b>${product.price.slice(0, -1)}</b>원
                      </p>
                      ${
                        product.pay_flag > 0
                          ? "<span class='pay'>pay</span>"
                          : ""
                      }
                    </span>
                    <span class="wishItemShippingInfo">
                      <p class="wishItemShippingCharge">
                        ${
                          product.detail.delivery_charge === "-"
                            ? "직거래"
                            : `배송비 ${product.detail.delivery_charge}`
                        }
                      </p>
                      ${
                        product.point === ""
                          ? ""
                          : `<span class="wishItemPlace"><i class="fa-solid fa-location-dot"></i> ${product.point}</span>`
                      }
                      
                    </span>
                  </span>
                </span>
              </a>
              <span class="wishItemButtons">
                <button class="wishItemChatButton">채팅하기</button>
                ${
                  product.pay_flag > 0
                    ? '<button class="wishItemPurchaseButton">구매하기</button>'
                    : '<button class="wishItemProposalButton">가격제안</button>'
                }
                <button class="wishItemXButton">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </span>
            </div>
            <div class="wishItemLower">
              <p>${product.time}</p>
              <span class="wishItemCount">
                <span class="wishItemViewCount">
                  <i class="fa-regular fa-eye"></i>
                  ${product.detail.view}
                </span>
                <span class="wishItemChattingCount">
                  <i class="fa-regular fa-comment-dots"></i>
                  ${product.detail.chat}
                </span>
                <span class="wishItemLikeCount">
                  <i class="fa-regular fa-heart"></i>
                  ${product.detail.wish}
                </span>
              </span>
            </div>
          </div>
        </div>
      </li>
      `;
  document.querySelector(".wishItemList").insertAdjacentHTML("beforeend", li);
};

const wishItemChkEvnt = () => {
  let checkWishItems = document.querySelectorAll("input[name='checkWishItem']");
  checkWishItems.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      const checkCount = document.querySelectorAll(
        "input[name='checkWishItem']:checked"
      ).length;
      checkWishItems = document.querySelectorAll("input[name='checkWishItem']");
      if (checkWishItems.length === checkCount) allCheck.checked = true;
      else allCheck.checked = false;
    });
  });
};

const wishItemHover = () => {
  let wishItemViewMore = document.querySelectorAll(".wishItemViewMore");
  wishItemViewMore.forEach((info) => {
    info.addEventListener("mouseenter", function () {
      this.closest("li")
        .querySelector(".wishItemImgWrapper img")
        .classList.add("hover");
    });
    info.addEventListener("mouseleave", function () {
      this.closest("li")
        .querySelector(".wishItemImgWrapper img")
        .classList.remove("hover");
    });
  });
};

const saveWishItem = () => {
  localStorage.setItem("wishItemArr", JSON.stringify(wishItemArr));
};

const delWishItem = (target) => {
  const productId = target.querySelector("input[type='checkbox']").value;
  wishItemArr = wishItemArr.filter((item) => item !== productId);
  wishItemArrDetail = wishItemArrDetail.filter((item) => item.id !== productId);
  saveWishItem();
  target.remove();
  document.querySelector(".wishItems").innerText = wishItemArr.length;
  checkEmptyData(wishItemArr);
};

const wishItemButtonEvent = () => {
  // all select event
  wishItemChkEvnt();
  wishItemHover();

  // button event
  document.querySelectorAll(".wishHeart").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      delWishItem(e.target.closest("li"));
    });
  });

  document.querySelectorAll(".wishItemXButton").forEach((item) => {
    item.addEventListener("click", (e) => {
      delWishItem(e.target.closest("li"));
    });
  });
};

// putting items in the favoriteStores
const addItemsInTheFavoriteStores = (store) => {
  let li = `
    <li>
      <div class="favorite-store-info">
        <div class="favorite-store-shopkeeper">
          <a href="#none" class="favoriteStoresTitle">
            <img
              src="../${store.info.product_img_path}"
            />
            <p>${store.store_name}</p>
          </a>
        </div>
        <div class="favorite-store-score">
          <span class="store-score-desc">
            <span class="store-score-title">거래순환률</span>
            <span class="store-score-value">
              <b>${Math.ceil(
                store.info.product_store_confidence_index / 10
              )}</b>
              /100
              <img
                src="../images/detail/circulater.png"
                alt="circulater"
              />
            </span>
          </span>
          <div class="detail-bar">
              <div class="filling-bar" style="width:${Math.ceil(
                store.info.product_store_confidence_index / 10
              )}%"></div>
          </div>
        </div>
        <div class="favorite-store-follower">
          <ul class="favorite-store-follower-box">
            <li>
              <span class="follower-box-title">안전거래</span>
              <span class="amountOfProducts">${
                store.info.product_store_safe_deal
              }</span>
            </li>
            <li>|</li>
            <li>
              <span class="follower-box-title">팔로워</span>
              <span class="numberOfFollowers">${
                store.info.product_store_follower
              }</span>
            </li>
          </ul>
          <a href="#none" class="followButton">
            <i class="fa-solid fa-bookmark"></i>
          </a>
        </div>
      </div>
      <div class="favorite-store-products-box">
        <ul class="favorite-store-products">
          ${[...store.info.product_img_etc]
            .map(
              (img) => `
            <li>
              <a href="#none">
                <span class="favoriteStoreProductImg" style="background:url('../${img.image_url}') center/cover no-repeat"></span>
              </a>
            </li>
          `
            )
            .join("")}
        </ul>
        <div class="img-prev btn">
          <i class="fa-solid fa-chevron-left"></i>
        </div>
        <div class="img-next btn">
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </li>
  `;
  document
    .querySelector(".favoriteStoresWrap")
    .insertAdjacentHTML("beforeend", li);
};

const saveFavoriteStores = () => {
  localStorage.setItem("favoriteStoresArr", JSON.stringify(favoriteStoresArr));
};

const delFavorStores = (target) => {
  const storeNm = target.querySelector(".favoriteStoresTitle>p").innerText;
  favoriteStoresArr = favoriteStoresArr.filter((item) => item !== storeNm);
  favorStoreArrDetail = favorStoreArrDetail.filter(
    (item) => item.store_name !== storeNm
  );
  saveFavoriteStores();
  target.remove();
  document.querySelector(".favoriteStores").innerText =
    favoriteStoresArr.length;
  checkEmptyData(favoriteStoresArr);
};

const favorStoresButtonEvent = () => {
  document
    .querySelectorAll(".favorite-store-follower .followButton")
    .forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        delFavorStores(e.target.closest("div").closest("li"));
      });
    });
};

const favorStoreSlide = (slideUl) => {
  const slide = slideUl.querySelectorAll("li");
  const slideCount = slide.length;

  let currentIdx = 0;
  const moveSlide = (num) => {
    if (num < 0) return;

    const slideWidth = slideUl.querySelectorAll("li>a")[0].offsetWidth;
    const slideMargin = matchMedia("screen and (max-width: 840px)").matches
      ? 10
      : 20;
    const currentSlideWidth = (slideCount - num) * (slideWidth + slideMargin);
    const clientWidth = slideUl.parentElement.clientWidth;

    if (currentIdx > num || currentSlideWidth >= clientWidth) {
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
  };

  // button event
  const prevBtn = slideUl.parentElement.querySelector(".img-prev");
  const nextBtn = slideUl.parentElement.querySelector(".img-next");
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

const createFavorStores = () => {
  document.querySelector(".favoriteStoresWrap").innerHTML = "";
  favorStoreArrDetail.forEach((store) => {
    addItemsInTheFavoriteStores(store);
  });

  favorStoresButtonEvent();
  document.querySelectorAll(".favorite-store-products").forEach((ul) => {
    favorStoreSlide(ul);
  });
};

// putting items in the favoriteBrands
const addItemsInTheFavoriteBrands = (brand) => {
  // making favoriteBrands li
  let li = `
        <li>
          <div class="favorite-brand-info">
            <div class="favorite-brand-shopkeeper">
              <a href="#none" class="favoriteBrandsTitle">
                <img
                  src="../${brand.img}"
                  alt="store-photo"
                />
                <p>
                  ${brand.brand}
                </p>
              </a>
              <ul class="favorite-brand-follower-box">
                <li>
                  <span class="follower-box-title titleEng"
                    >${brand.brandEng}</span
                  >
                </li>
                <li>|</li>
                <li>
                  <span class="follower-box-title">상품</span>
                  <span class="amountOfProducts">${brand.products.length}</span>
                </li>
              </ul>
            </div>
            <div class="favorite-brand-follow-button">
              <a href="#none" class="followButton">
                <i class="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </div>
          <div class="favorite-brand-products-box">
            <ul class="favorite-brand-products">
            ${[...brand.products]
              .map(
                (product) => `
              <li>
                <a href="/pages/detail.html?id=${product.id}">
                  <span class="favoriteBrandProductImg" style="background:url('../${product.image_path}') center/cover no-repeat"></span>
                </a>
              </li>
            `
              )
              .join("")}
            </ul>
            <div class="img-prev btn">
              <i class="fa-solid fa-chevron-left"></i>
            </div>
            <div class="img-next btn">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </li>
      `;

  document
    .querySelector(".favoriteBrandsWrap")
    .insertAdjacentHTML("beforeend", li);
};

const saveBrandStores = () => {
  localStorage.setItem("favoriteBrandsArr", JSON.stringify(favoriteBrandsArr));
};

const delFavorBrands = (target) => {
  const brandNm = target.querySelector(".favoriteBrandsTitle > p").innerText;
  favoriteBrandsArr = favoriteBrandsArr.filter(
    (item) => item.brand !== brandNm
  );
  saveBrandStores();
  target.remove();
  document.querySelector(".favoriteBrands").innerText =
    favoriteBrandsArr.length;
  checkEmptyData(favoriteBrandsArr);
};

const favorBrandsButtonEvent = () => {
  document
    .querySelectorAll(".favorite-brand-follow-button .followButton")
    .forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        delFavorBrands(e.target.closest("div").closest("li"));
      });
    });
};

const favorBrandSlide = (slideUl) => {
  const slide = slideUl.querySelectorAll("li");
  const slideCount = slide.length;

  let currentIdx = 0;
  const moveSlide = (num) => {
    if (num < 0) return;

    const slideWidth = slideUl.querySelectorAll("li>a")[0].offsetWidth;
    const slideMargin = matchMedia("screen and (max-width: 840px)").matches
      ? 10
      : 20;
    const currentSlideWidth = (slideCount - num) * (slideWidth + slideMargin);
    const clientWidth = slideUl.parentElement.clientWidth;

    if (currentIdx > num || currentSlideWidth >= clientWidth) {
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
  };

  // button event
  const prevBtn = slideUl.parentElement.querySelector(".img-prev");
  const nextBtn = slideUl.parentElement.querySelector(".img-next");
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

const createFavorBrands = () => {
  document.querySelector(".favoriteBrandsWrap").innerHTML = "";
  favoriteBrandsArr.forEach((brand) => {
    addItemsInTheFavoriteBrands(brand);
  });

  favorBrandsButtonEvent();
  document.querySelectorAll(".favorite-brand-products").forEach((ul) => {
    favorBrandSlide(ul);
  });
};

// push the db.json data
fetch("../db.json")
  .then((response) => response.json())
  .then((jsonData) => {
    // array init
    wishItemArr = localStorage.getItem("wishItemArr")
      ? JSON.parse(localStorage.getItem("wishItemArr"))
      : jsonData.wishlist.wishItemArr
      ? jsonData.wishlist.wishItemArr
      : [];
    saveWishItem();
    checkEmptyData(wishItemArr);

    favoriteStoresArr = localStorage.getItem("favoriteStoresArr")
      ? JSON.parse(localStorage.getItem("favoriteStoresArr"))
      : jsonData.wishlist.favoriteStoresArr
      ? jsonData.wishlist.favoriteStoresArr
      : [];
    saveFavoriteStores();

    favoriteBrandsArr = localStorage.getItem("favoriteBrandsArr")
      ? JSON.parse(localStorage.getItem("favoriteBrandsArr"))
      : jsonData.wishlist.favoriteBrandsArr
      ? jsonData.wishlist.favoriteBrandsArr
      : [];
    saveBrandStores();

    // insert a count into the tab button
    chanageTabBtnCnt();

    // putting items in the wishItemList
    wishItemArr.forEach((arr) => {
      const product = jsonData.product.filter((item) => {
        return item.id.includes(arr);
      })[0];
      wishItemArrDetail.push(product);
    });
    sortNew();

    // putting items in the favoriteStores
    favoriteStoresArr.forEach((arr) => {
      const store = jsonData.store.filter((item) => {
        return item.store_name.includes(arr);
      })[0];
      favorStoreArrDetail.push(store);
    });
    createFavorStores();

    // putting items in the favoriteBrands
    favoriteBrandsArr.forEach((arr) => {
      const products = jsonData.product.filter((item) => {
        return item.title.includes(arr.brand);
      });
      arr.products = products;
    });
    createFavorBrands();
  });
