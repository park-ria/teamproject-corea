window.onload = function () {
  const stckUser = document.querySelector(".stck-user");
  stckUser.classList.add("active");
};

// 탭 버튼에 카운트 삽입
let mypageItemArr = ["19370577", "26753605", "104046947"];
const mypageItems = document.querySelector(".mypageItems");
mypageItems.innerText = mypageItemArr.length;

// 탭 버튼 클릭 이벤트
const mypageTabButton = document.querySelectorAll(".mypageTabButton");
mypageTabButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    const mypageContent = document.querySelectorAll(".mypageContent");
    const target = document.querySelector(
      `.${this.getAttribute("data-tab-name")}-content`
    );

    // 탭 버튼 초기화 및 가상클래스 적용
    mypageTabButton.forEach((sibling) => {
      if (sibling !== this) sibling.classList.remove("active");
    });
    this.classList.add("active");

    // 탭 내용 초기화 및 가상클래스 적용
    mypageContent.forEach((item) => {
      if (item !== target) item.classList.remove("active");
    });
    target.classList.add("active");
  });
});

// Putting Items in the mypageItemList
const addItemsInThemypageItemList = (product, index) => {
  mypageItemArr.forEach((arr) => {
    if (arr === product.id) {
      document.querySelector(".mypageItemList").innerHTML += `
      <li>
        <input type="checkbox" name="checkmypageItem" id="mypageItem${
          index + 1
        }" value="mypageItem${index + 1}" />
        <div class="mypageItem">
          <div class="mypageItemImgWrapper">
            <a href="#" class="mypageItemViewMore">
              <img
                src="../${product.image_path}"
                alt="product_image"
              />
            </a>
            <button class="mypageHeart">
              <i class="fa-solid fa-heart"></i>
            </button>
          </div>
          <div class="mypageItemDescGroup">
            <div class="mypageItemDesc">
              <a href="#" class="mypageItemViewMore">
                <span class="mypageItemInfo">
                  <span class="mypageItemTitleBox">
                    <p class="mypageItemSellerName">${
                      product.detail.product_store
                    }</p>
                    <p class="mypageItemName">
                      ${product.title}
                    </p>
                  </span>
                  <span class="mypageItemPriceBox">
                    <span class="mypageItemPriceInfo">
                      <p class="mypageItemPrice">
                        <b>${product.price.slice(0, -1)}</b>원
                      </p>
                      ${
                        product.pay_flag > 0
                          ? "<span class='pay'>pay</span>"
                          : ""
                      }
                    </span>
                    <span class="mypageItemShippingInfo">
                      <p class="mypageItemShippingCharge">
                        ${
                          product.detail.delivery_charge === "-"
                            ? "직거래"
                            : `배송비 ${product.detail.delivery_charge}`
                        }
                      </p>
                      ${
                        product.point === ""
                          ? ""
                          : `<span class="mypageItemPlace"><i class="fa-solid fa-location-dot"></i> ${product.point}</span>`
                      }
                      
                    </span>
                  </span>
                </span>
              </a>
              <span class="mypageItemButtons">
                <button class="mypageItemChatButton">채팅하기</button>
                ${
                  product.pay_flag > 0
                    ? '<button class="mypageItemPurchaseButton">구매하기</button>'
                    : '<button class="mypageItemProposalButton">가격제안</button>'
                }
                <button class="mypageItemXButton">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </span>
            </div>
            <div class="mypageItemLower">
              <p>${product.time}</p>
              <span class="mypageItemCount">
                <span class="mypageItemChattingCount">
                  <i class="fa-regular fa-comment-dots"></i>
                  ${product.detail.sub_data.split(" · ")[2].split(" ")[1]}
                </span>
                <span class="mypageItemLikeCount">
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

// 데이터 추가
fetch("../db.json")
  .then((response) => response.json())
  .then((jsonData) => {
    jsonData.product.forEach((product, index) => {
      addItemsInThemypageItemList(product, index);
    });
  });

// 버튼 이벤트
document.querySelectorAll(".mypageItemViewMore").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(this);
  });
});
document.querySelectorAll(".mypageHeart").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(this);
  });
});
document.querySelectorAll(".mypageItemChatButton").forEach((item) => {
  item.addEventListener("click", function () {
    e.preventDefault();
    console.log(this);
  });
});
