let wishItemArr;
let favoriteStoresArr;
let favoriteBrandsArr;

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
  });
});

// putting items in the wishItemList
const addItemsInTheWishItemList = (product, index) => {
  wishItemArr.forEach((arr) => {
    if (arr === product.id) {
      const li = `
      <li>
        <input type="checkbox" name="checkWishItem" id="wishItem${
          index + 1
        }" value="wishItem${index + 1}" />
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
                <span class="wishItemChattingCount">
                  <i class="fa-regular fa-comment-dots"></i>
                  ${product.detail.sub_data.split(" · ")[2].split(" ")[1]}
                </span>
                <span class="wishItemLikeCount">
                  <i class="fa-regular fa-heart"></i>
                  ${product.detail.sub_data.split(" · ")[3].split(" ")[1]}
                </span>
              </span>
            </div>
          </div>
        </div>
      </li>
      `;
      document
        .querySelector(".wishItemList")
        .insertAdjacentHTML("beforeend", li);
    }
  });
};

// all select Event
const wishItemChkEvnt = () => {
  const allCheck = document.querySelector("#allSelection");
  const checkWishItem = document.querySelectorAll(
    "input[name='checkWishItem']"
  );

  allCheck.addEventListener("click", function () {
    const isChecked = this.checked;
    checkWishItem.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  });

  checkWishItem.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      const checkCount = document.querySelectorAll(
        "input[name='checkWishItem']:checked"
      ).length;
      if (checkWishItem.length === checkCount) allCheck.checked = true;
      else allCheck.checked = false;
    });
  });
};

// putting items in the favoriteStores
const addItemsInTheFavoriteStores = (store) => {
  favoriteStoresArr.forEach((arr) => {
    if (arr === store.store_name) {
      let li = `
        <li>
          <div class="favorite-store-info">
            <div class="favorite-store-shopkeeper">
              <a href="/pages/mypage.html?id=${
                store.store_name
              }" class="favoriteStoresTitle">
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
              <a href="#" class="followButton">
                <i class="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </div>
          <div class="favorite-store-products-box">
            <ul class="favorite-store-products">`;
      store.info.product_img_etc.forEach((img) => {
        li += `
          <li>
            <a href="#">
              <span class="favoriteStoreProductImg" style="background:url('../${img.image_url}') center/cover no-repeat"></span>
            </a>
          </li>
        `;
      });
      li += `
            </ul>
          </div>
        </li>
      `;
      document
        .querySelector(".favoriteStoresWrap")
        .insertAdjacentHTML("beforeend", li);
    }
  });
};

// putting items in the favoriteBrands
const addItemsInTheFavoriteBrands = () => {
  // making favoriteBrands li
  favoriteBrandsArr.forEach((arr) => {
    let li = `
        <li>
          <div class="favorite-brand-info">
            <div class="favorite-brand-shopkeeper">
              <a href="#" class="favoriteBrandsTitle">
                <img
                  src="../${arr.img}"
                  alt="store-photo"
                />
                <p>
                  ${arr.brand}
                </p>
              </a>
              <ul class="favorite-brand-follower-box">
                <li>
                  <span class="follower-box-title titleEng"
                    >${arr.brandEng}</span
                  >
                </li>
                <li>|</li>
                <li>
                  <span class="follower-box-title">상품</span>
                  <span class="amountOfProducts">${arr.count}</span>
                </li>
              </ul>
            </div>
            <div class="favorite-brand-follow-button">
              <a href="#" class="followButton">
                <i class="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </div>
          <div class="favorite-brand-products-box">
            <ul class="favorite-brand-products">`;

    arr.products.forEach((product) => {
      li += `
              <li>
                <a href="/pages/detail.html?id=${product.id}">
                  <span class="favoriteBrandProductImg" style="background:url('../${product.image_path}') center/cover no-repeat"></span>
                </a>
              </li>`;
    });

    li += `
            </ul>
          </div>
        </li>
      `;

    document
      .querySelector(".favoriteBrandsWrap")
      .insertAdjacentHTML("beforeend", li);
  });
};

// push the db.json data
fetch("../db.json")
  .then((response) => response.json())
  .then((jsonData) => {
    // insert a count into the tab button
    wishItemArr = jsonData.wishlist.wishItemArr;
    favoriteStoresArr = jsonData.wishlist.favoriteStoresArr;
    favoriteBrandsArr = jsonData.wishlist.favoriteBrandsArr;

    document.querySelector(".wishItems").innerText = wishItemArr.length;
    document.querySelector(".favoriteStores").innerText =
      favoriteStoresArr.length;
    document.querySelector(".favoriteBrands").innerText =
      favoriteBrandsArr.length;

    jsonData.product.forEach((product, index) => {
      // putting items in the wishItemList
      addItemsInTheWishItemList(product, index);

      // put data into favoriteBrandsArr
      favoriteBrandsArr.forEach((arr) => {
        if (product.title.includes(arr.brand)) {
          arr.products.push({
            id: product.id,
            image_path: product.image_path,
          });

          arr.count += 1;
        }
      });
    });

    // putting items in the favoriteBrands
    addItemsInTheFavoriteBrands();

    // all select event
    wishItemChkEvnt();

    jsonData.store.forEach((store) => {
      // putting items in the favoriteStores
      addItemsInTheFavoriteStores(store);
    });
  });

// button event
document.querySelectorAll(".wishItemViewMore").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(this);
  });
});
document.querySelectorAll(".wishHeart").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(this);
  });
});
document.querySelectorAll(".wishItemChatButton").forEach((item) => {
  item.addEventListener("click", function () {
    e.preventDefault();
    console.log(this);
  });
});
