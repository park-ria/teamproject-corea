const searchAddr = document.querySelector("#searchAddr");
const cashBillType = document.querySelectorAll("input[name='cashBillType']");
const cashBillSubType = document.querySelector("#cashBillSubType");
const card = document.querySelectorAll("input[name='card']");
const payTypeButton = document.querySelectorAll(".payTypeButton");

const changePhone1 = () => {
  const phone1 = document.querySelector("#phone1");
  phone1.value = phone1.value.replace(/[^0-9]/g, "");

  if (phone1.value.length === 3) {
    document.querySelector("#phone2").focus();
  }
};

const changePhone2 = () => {
  const phone2 = document.querySelector("#phone2");
  phone2.value = phone2.value.replace(/[^0-9]/g, "");

  if (phone2.value.length === 4) {
    document.querySelector("#phone3").focus();
  }
};

const changePhone3 = () => {
  const phone3 = document.querySelector("#phone3");
  phone3.value = phone3.value.replace(/[^0-9]/g, "");
};

searchAddr.addEventListener("click", (e) => {
  e.preventDefault();

  const zonecode = document.querySelector("#zonecode");
  const address = document.querySelector("#address");

  zonecode.value = "";
  address.value = "";

  const width = 500;
  const height = 600;
  const themeObj = {
    bgColor: "#FFFFFF", //바탕 배경색
    searchBgColor: "#333333", //검색창 배경색
    contentBgColor: "#FFFFFF", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
    pageBgColor: "#FFFFFF", //페이지 배경색
    //textColor: "", //기본 글자색
    queryTextColor: "#FFFFFF", //검색창 글자색
    postcodeTextColor: "#FA4256", //우편번호 글자색
    //emphTextColor: "" //강조 글자색
    //outlineColor: "", //테두리
  };

  new daum.Postcode({
    theme: themeObj,
    width: 500,
    height: 600,
    oncomplete: function (data) {
      zonecode.value = data.zonecode;
      address.value = data.address;
    },
  }).open({
    popupTitle: "우편번호 검색",
    popupKey: "popup1",
    left: window.screen.width / 2 - width / 2,
    top: window.screen.height / 2 - height / 2,
  });
});

const changeEtcMsg = function (msg) {
  document.querySelector(".etcMsgCnt > strong").innerText = msg.value.length;
};

const createproductInfo = (product) => {
  const deliveryCharge = product.detail.delivery_charge.includes("별도")
    ? 4000
    : 0;
  const sumPrice = new Intl.NumberFormat("ko-kr", {
    currency: "KRW",
  }).format(Number(product.price.replace(/[^0-9]/g, "")) + deliveryCharge);
  let li = `
    <div class="store-name">
      <span class="shop-icon"></span>
      <p>${product.detail.store_name}</p>
    </div>
    <a href="/pages/detail.html?id=''">
      <div class="product-desc">
        <span class="product-desc-box productImgNm">
          <span class="productImg" style="background: url('../${
            product.image_path
          }') center/cover no-repeat;"></span>
          <p class="productName">
            <span class='pay'>pay</span>
            ${product.title}
          </p>
        </span>
        <span class="product-desc-box">
          <p>상품 가격</p>
          <p>${product.price}</p>
        </span>
        <span class="product-desc-box">
          <p class="productDeliveryCharge">${product.detail.delivery_charge}</p>
          <p class="productDeliveryPrice">${new Intl.NumberFormat("ko-kr", {
            currency: "KRW",
          }).format(deliveryCharge)}원</p>
        </span>
        <span class="product-desc-box">
          <p>합계</p>
          <p class="productPrice">${sumPrice}원</p>
        </span>
      </div>
    </a>
  `;
  document.querySelector(".productInfo").insertAdjacentHTML("beforeend", li);
};

const changeCashBillPlaceholder = () => {
  document.querySelector("#cashBillInfo").placeholder = `${
    cashBillSubType.options[cashBillSubType.selectedIndex].text
  }를 입력해주세요`;
};

cashBillSubType.addEventListener("change", () => {
  changeCashBillPlaceholder();
});

const changeCashBillSelect = (id) => {
  if (cashBillSubType.hasChildNodes()) {
    cashBillSubType.replaceChildren();
  }

  let option = "";
  if (id === "personal") {
    option = '<option value="cbPhoneNumber">휴대폰번호</option>';
  } else if (id === "business") {
    option = '<option value="cbBusinessNumber">사업자번호</option>';
  }
  option += '<option value="cbCardNumber">현금영수증 카드번호</option>';
  cashBillSubType.insertAdjacentHTML("beforeend", option);
  changeCashBillPlaceholder();
};

document.querySelector("#cashBill").addEventListener("click", function () {
  let isChecked = false;
  cashBillType.forEach((type) => {
    if (type.checked) isChecked = true;
  });

  if (this.checked) {
    if (!isChecked) {
      cashBillType[0].checked = this.checked;
      changeCashBillSelect(cashBillType[0].id);
    }
  } else {
    cashBillType.forEach((type) => {
      type.checked = this.chekced;
    });
  }
});

cashBillType.forEach((type) => {
  type.addEventListener("change", function () {
    if (this.checked) changeCashBillSelect(this.id);
  });
});

document
  .querySelector(".cashBillCheck .fa-solid")
  .addEventListener("click", function () {
    const cashBillTypeWrap = document.querySelector(".cashBillTypeWrap");
    const cashBillDesc = document.querySelector(".cashBillDesc");
    if (this.classList[1] === "fa-chevron-down") {
      this.classList.replace("fa-chevron-down", "fa-chevron-up");
      cashBillTypeWrap.classList.add("on");
      cashBillDesc.classList.add("on");
    } else if (this.classList[1] === "fa-chevron-up") {
      this.classList.replace("fa-chevron-up", "fa-chevron-down");
      cashBillTypeWrap.classList.remove("on");
      cashBillDesc.classList.remove("on");
    }
  });

const changeCashBillInfo = (info) => {
  info.value = info.value.replace(/[^0-9]/g, "");
};

card.forEach((radio) => {
  radio.addEventListener("change", function () {
    card.forEach((sibiling) => {
      if (sibiling === this) {
        this.parentElement.classList.add("active");
      } else {
        sibiling.parentElement.classList.remove("active");
      }
    });
  });
});

payTypeButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    payTypeButton.forEach((sibiling) => {
      if (sibiling === this) {
        this.classList.add("active");
      } else {
        sibiling.classList.remove("active");
      }
    });

    const target = this.getAttribute("data-guide");
    const payGuidelines = document.querySelectorAll(".payGuidelines");
    payGuidelines.forEach((guide) => {
      if (guide.classList[1] === target) {
        document.querySelector(`.${target}`).classList.add("active");
      } else {
        guide.classList.remove("active");
      }
    });
  });
});

fetch("../db.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const id = new URLSearchParams(window.location.search).get("id");

    const product = jsonData.product.find((product) => product.id === id);
    createproductInfo(product);
  });
