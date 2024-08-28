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
const addItemsInTheMypagePurchaseList = (product, index) => {
  const li = `
      <li class="soldOut">
        <input type="checkbox" name="checkMypagePurchase" id="mypagePurchase${
          index + 1
        }" value="${product.id}" />
        <label for="mypagePurchase${index + 1}"></label>
        <div class="mypagePurchase">
          <div class="mypagePurchaseImgWrapper">
            <a href="/pages/detail.html?id=${
              product.id
            }" class="mypagePurchaseViewMore ">
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
              <a href="/pages/detail.html?id=${
                product.id
              }" class="mypagePurchaseViewMore">
                <span class="mypagePurchaseInfo">
                  <span class="mypagePurchaseTitleBox">
                    <p class="mypagePurchaseSellerName">${
                      product.detail.store_name
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
                <span class="mypagePurchaseViewCount">
                  <i class="fa-regular fa-eye"></i>
                  ${product.detail.view}
                </span>
                <span class="mypagePurchaseChattingCount">
                  <i class="fa-regular fa-comment-dots"></i>
                  ${product.detail.chat}
                </span>
                <span class="mypagePurchaseLikeCount">
                  <i class="fa-regular fa-heart"></i>
                  ${product.detail.wish}
                </span>
              </span>
            </div>
          </div>
        </div>
      </li>
      `;
  document
    .querySelector(".mypagePurchaseList")
    .insertAdjacentHTML("beforeend", li);
};

const mypagePurchaseChkEvnt = () => {
  let checkMypagePurchases = document.querySelectorAll(
    "input[name='checkMypagePurchase']"
  );
  checkMypagePurchases.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      const checkCount = document.querySelectorAll(
        "input[name='checkMypagePurchase']:checked"
      ).length;
      checkMypagePurchases = document.querySelectorAll(
        "input[name='checkMypagePurchase']"
      );
      if (checkMypagePurchases.length === checkCount) allCheck.checked = true;
      else allCheck.checked = false;
    });
  });
};

const saveMypagePurchase = () => {
  localStorage.setPurchase(
    "mypagePurchaseArr",
    JSON.stringify([...mypagePurchaseArr])
  );
};

const delMypagePurchaseByHeart = (target) => {
  const productId = target.querySelector("input[type='checkbox']").value;
  mypagePurchaseArr = new Set(
    [...mypagePurchaseArr].filter((item) => item !== productId)
  );
  mypagePurchaseArrDetail = mypagePurchaseArrDetail.filter(
    (item) => item.id !== productId
  );
  saveMypagePurchase();
  target.remove();
};

const mypagePurchaseButtonEvent = () => {
  // all select event
  mypagePurchaseChkEvnt();

  // button event
  document.querySelectorAll(".mypageHeart").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      delMypagePurchaseByHeart(e.target.closest("li"));
    });
  });

  document.querySelectorAll(".mypagePurchaseXButton").forEach((item) => {
    item.addEventListener("click", (e) => {
      delMypagePurchaseByHeart(e.target.closest("li"));
    });
  });
};

// putting Items in the mypageSellList
const addItemsInTheMypageSellList = (product, index) => {
  const li = `
      <li>
        <input type="checkbox" name="checkMypageSell" id="mypageSell${
          index + 1
        }" value="${product.id}" />
        <label for="mypageSell${index + 1}"></label>
        <div class="mypageSell">
          <div class="mypageSellImgWrapper">
            <a href="/pages/detail.html?id=${
              product.id
            }" class="mypageSellViewMore">
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
              <a href="/pages/detail.html?id=${
                product.id
              }" class="mypageSellViewMore">
                <span class="mypageSellInfo">
                  <span class="mypageSellTitleBox">
                    <p class="mypageSellSellerName">${
                      product.detail.store_name
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
                    ? '<button class="mypageSellPurchaseButton">구매하기</button>'
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
                <span class="mypageSellViewCount">
                  <i class="fa-regular fa-eye"></i>
                  ${product.detail.view}
                </span>
                <span class="mypageSellChattingCount">
                  <i class="fa-regular fa-comment-dots"></i>
                  ${product.detail.chat}
                </span>
                <span class="mypageSellLikeCount">
                  <i class="fa-regular fa-heart"></i>
                  ${product.detail.wish}
                </span>
              </span>
            </div>
          </div>
        </div>
      </li>
      `;

  document.querySelector(".mypageSellWrap").insertAdjacentHTML("beforeend", li);
};

const mypageSellChkEvnt = () => {
  let checkWishItems = document.querySelectorAll(
    "input[name='checkMypageSell']"
  );
  checkMypageSells.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      const checkCount = document.querySelectorAll(
        "input[name='checkMypageSell']:checked"
      ).length;
      checkWishItems = document.querySelectorAll(
        "input[name='checkMypageSell']"
      );
      if (checkMypageSells.length === checkCount) allCheck.checked = true;
      else allCheck.checked = false;
    });
  });
};

const saveMypageSell = () => {
  localStorage.setItem("mypageSellArr", JSON.stringify([...mypageSellArr]));
};

const delMypageSellByHeart = (target) => {
  const productId = target.querySelector("input[type='checkbox']").value;
  mypageSellArr = new Set(
    [...mypageSellArr].filter((item) => item !== productId)
  );
  mypageSellArrDetail = mypageSellArrDetail.filter(
    (item) => item.id !== productId
  );
  saveMypageSell();
  target.remove();
};

const mypageSellButtonEvent = () => {
  // all select event
  mypageSellChkEvnt();

  // button event
  document.querySelectorAll(".mypageHeart").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      delMypageSellByHeart(e.target.closest("li"));
    });
  });

  document.querySelectorAll(".mypageSellXButton").forEach((item) => {
    item.addEventListener("click", (e) => {
      delMypageSellByHeart(e.target.closest("li"));
    });
  });
};

// 데이터 추가
fetch("../db.json")
  .then((response) => response.json())
  .then((jsonData) => {
    jsonData.product.forEach((product, index) => {
      addItemsInTheMypagePurchaseList(product, index);
      addItemsInTheMypageSellList(product, index);
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
