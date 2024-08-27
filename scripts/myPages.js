window.onload = function () {
  const stckUser = document.querySelector(".stck-user");
  stckUser.classList.add("active");
};

// 탭 버튼에 카운트 삽입
let mypagePurchaseArr = ["19370577", "26753605", "104046947"];
const mypagePurchases = document.querySelector(".mypagePurchases");
mypagePurchases.innerText = mypagePurchaseArr.length;

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

// Putting Items in the mypagePurchaseList
const addMypagePurchaseList = (product, index) => {
  mypagePurchaseArr.forEach((arr) => {
    if (arr === product.id) {
      document.querySelector(".mypagePurchaseList").innerHTML += `
      <li>
        <input type="checkbox" name="checkmypagePurchase" id="mypagePurchase${
          index + 1
        }" value="mypagePurchase${index + 1}" />
        <div class="mypagePurchase">
          <div class="mypagePurchaseImgWrapper">
            <a href="#" class="mypagePurchaseViewMore">
              <img
                src="../${product.image_path}"
                alt="product_image"
              />
            </a>
            <button class="mypageHeart">
              <i class="fa-solid fa-heart"></i>
            </button>
          </div>
          <div class="mypagePurchaseDescGroup">
            <div class="mypagePurchaseDesc">
              <a href="#" class="mypagePurchaseViewMore">
                <span class="mypagePurchaseInfo">
                  <span class="mypagePurchaseTitleBox">
                    <p class="mypagePurchaseSellerName">${
                      product.detail.product_store
                    }</p>
                    <p class="mypagePurchaseName">
                      ${product.title}
                    </p>
                  </span>
                  <span class="mypagePurchasePriceBox">
                    <span class="mypagePurchasePriceInfo">
                      <p class="mypagePurchasePrice">
                        <b>${product.price.slice(0, -1)}</b>원
                      </p>
                      ${
                        product.pay_flag > 0
                          ? "<span class='pay'>pay</span>"
                          : ""
                      }
                    </span>
                    <span class="mypagePurchaseShippingInfo">
                      <p class="mypagePurchaseShippingCharge">
                        ${
                          product.detail.delivery_charge === "-"
                            ? "직거래"
                            : `배송비 ${product.detail.delivery_charge}`
                        }
                      </p>
                      ${
                        product.point === ""
                          ? ""
                          : `<span class="mypagePurchasePlace"><i class="fa-solid fa-location-dot"></i> ${product.point}</span>`
                      }
                      
                    </span>
                  </span>
                </span>
              </a>
              <span class="mypagePurchaseButtons">
                <button class="mypagePurchaseChatButton">채팅하기</button>
                ${
                  product.pay_flag > 0
                    ? '<button class="mypagePurchasePurchaseButton">구매하기</button>'
                    : '<button class="mypagePurchaseProposalButton">가격제안</button>'
                }
                <button class="mypagePurchaseXButton">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </span>
            </div>
            <div class="mypagePurchaseLower">
              <p>${product.time}</p>
              <span class="mypagePurchaseCount">
                <span class="mypagePurchaseChattingCount">
                  <i class="fa-regular fa-comment-dots"></i>
                  ${product.detail.sub_data.split(" · ")[2].split(" ")[1]}
                </span>
                <span class="mypagePurchaseLikeCount">
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

// putting Items in the mypageSellList
const addMypageSellWrap = (product, index) => {
  mypageSellArr.forEach((arr) => {
    if (arr === product.id) {
      document.querySelector(".mypageSellList").innerHTML += `
      <li>
        <input type="checkbox" name="checkmypageSell" id="mypageSell${
          index + 1
        }" value="mypageSell${index + 1}" />
        <div class="mypageSell">
          <div class="mypageSellImgWrapper">
            <a href="#" class="mypageSellViewMore">
              <img
                src="../${product.image_path}"
                alt="product_image"
              />
            </a>
            <button class="mypageHeart">
              <i class="fa-solid fa-heart"></i>
            </button>
          </div>
          <div class="mypageSellDescGroup">
            <div class="mypageSellDesc">
              <a href="#" class="mypageSellViewMore">
                <span class="mypageSellInfo">
                  <span class="mypageSellTitleBox">
                    <p class="mypageSellSellerName">${
                      product.detail.product_store
                    }</p>
                    <p class="mypageSellName">
                      ${product.title}
                    </p>
                  </span>
                  <span class="mypageSellPriceBox">
                    <span class="mypageSellPriceInfo">
                      <p class="mypageSellPrice">
                        <b>${product.price.slice(0, -1)}</b>원
                      </p>
                      ${
                        product.pay_flag > 0
                          ? "<span class='pay'>pay</span>"
                          : ""
                      }
                    </span>
                    <span class="mypageSellShippingInfo">
                      <p class="mypageSellShippingCharge">
                        ${
                          product.detail.delivery_charge === "-"
                            ? "직거래"
                            : `배송비 ${product.detail.delivery_charge}`
                        }
                      </p>
                      ${
                        product.point === ""
                          ? ""
                          : `<span class="mypageSellPlace"><i class="fa-solid fa-location-dot"></i> ${product.point}</span>`
                      }
                      
                    </span>
                  </span>
                </span>
              </a>
              <span class="mypageSellButtons">
                <button class="mypageSellChatButton">채팅하기</button>
                ${
                  product.pay_flag > 0
                    ? '<button class="mypageSellButton">구매하기</button>'
                    : '<button class="mypageSellProposalButton">가격제안</button>'
                }
                <button class="mypageSellXButton">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </span>
            </div>
            <div class="mypageSellLower">
              <p>${product.time}</p>
              <span class="mypageSellCount">
                <span class="mypageSellChattingCount">
                  <i class="fa-regular fa-comment-dots"></i>
                  ${product.detail.sub_data.split(" · ")[2].split(" ")[1]}
                </span>
                <span class="mypageSellLikeCount">
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
      addMypagePurchaseList(product, index);
      addMypageSellWrap();
    });
  });

// 버튼 이벤트
document.querySelectorAll(".mypagePurchaseViewMore").forEach((item) => {
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
document.querySelectorAll(".mypagePurchaseChatButton").forEach((item) => {
  item.addEventListener("click", function () {
    e.preventDefault();
    console.log(this);
  });
});
