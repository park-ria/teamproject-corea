// insert a count into the tab button
let wishItemArr = ["179612232", "179612037", "179611921"];
const wishItems = document.querySelector(".wishItems");
wishItems.innerText = wishItemArr.length;

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
      document.querySelector(".wishItemList").innerHTML += `
      <li>
        <input type="checkbox" name="checkWishItem" id="wishItem${
          index + 1
        }" value="wishItem${index + 1}" />
        <div class="wishItem">
          <div class="wishItemImgWrapper">
            <a href="#" class="wishItemViewMore">
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
              <a href="#" class="wishItemViewMore">
                <span class="wishItemInfo">
                  <span class="wishItemTitleBox">
                    <p class="wishItemSellerName">${
                      product.detail.product_store
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

// push the db.json data
fetch("../db.json")
  .then((response) => response.json())
  .then((jsonData) => {
    jsonData.data.forEach((product, index) => {
      // putting items in the wishItemList
      addItemsInTheWishItemList(product, index);
    });

    // all select event
    wishItemChkEvnt();
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
