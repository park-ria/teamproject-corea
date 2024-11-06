const id = new URLSearchParams(window.location.search).get("id");
const searchAddr = document.querySelector("#searchAddr");
const cashBillType = document.querySelectorAll("input[name='cashBillType']");
const cashBillSubType = document.querySelector("#cashBillSubType");
const card = document.querySelectorAll("input[name='card']");
const payTypeButton = document.querySelectorAll(".payTypeButton");
const payType = document.querySelector("#payType");
const modalLink = document.querySelectorAll(".modalLink");
const payTypeModal = document.querySelector(".payTypeModal");
const modalOverlay = document.querySelector(".payTypeModal-overlay");
const allCheck = document.querySelector("#allCheck");
const approvalYn = document.querySelectorAll("input[name='approvalYn']");
const descButton = document.querySelectorAll(".descButton");
const submitButton = orderInfo.querySelector("input[type='submit']");

const setUserInfo = (userInfo) => {
  orderInfo.recipient.value = userInfo.name;
  orderInfo.phone1.value = userInfo.phone1;
  orderInfo.phone2.value = userInfo.phone2;
  orderInfo.phone3.value = userInfo.phone3;
  orderInfo.zonecode.value = userInfo.zipcode;
  orderInfo.address.value = userInfo.address;
  orderInfo.cashBillInfo.value = `${userInfo.phone1}${userInfo.phone2}${userInfo.phone3}`;
};

window.addEventListener("load", () => {
  if (!id) {
    location.href = "/index.html";
  }

  const loginCheck = JSON.parse(localStorage.getItem("loginCheck")) || [];
  if (loginCheck.length > 0) {
    const accountArr = JSON.parse(localStorage.getItem("userAccount")) || [];
    const userInfo = accountArr.find(
      (account) => account.email === loginCheck[0]
    );

    if (userInfo) {
      setUserInfo(userInfo);
    }
  } else {
    location.href = "/pages/login.html";
  }
});

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

const krwFormat = (money) => {
  return new Intl.NumberFormat("ko-kr", {
    currency: "KRW",
  }).format(money);
};

let deliveryCharge = 0;
let productPrice = 0;
let payFee = 0;
let sumPrice = 0;

const filterPayTypeBtn = () => {
  const paycoTypeTab = document.querySelector(".paycoTypeTab");
  const tossTypeTab = document.querySelector(".tossTypeTab");
  const kakaoTypeTab = document.querySelector(".kakaoTypeTab");

  if (sumPrice > 2000000) {
    paycoTypeTab.classList.add("disabled");
    tossTypeTab.classList.add("disabled");
  } else {
    paycoTypeTab.classList.remove("disabled");
    tossTypeTab.classList.remove("disabled");
  }

  if (sumPrice > 3000000) {
    kakaoTypeTab.classList.add("disabled");
  } else {
    kakaoTypeTab.classList.remove("disabled");
  }
};

const setDiscountPrice = (flag) => {
  const discountPrice = document.querySelector("#discountPrice");
  const discountPriceVal = document.querySelector("#discountPriceVal");
  const discountWrap = document.querySelector(".discountWrap");
  let dscntPrc = 0;

  if (flag && sumPrice >= 10000 && sumPrice <= 2000000) {
    dscntPrc = sumPrice * 0.02 > 40000 ? 40000 : -(sumPrice * 0.02).toFixed(0);
    discountWrap.classList.add("active");
  } else if (!flag) {
    dscntPrc = 0;
    discountWrap.classList.remove("active");
  }

  discountPrice.innerText = krwFormat(dscntPrc);
  discountPriceVal.value = dscntPrc;

  sumPrice = productPrice + deliveryCharge + Number(payFee) + dscntPrc;

  document.querySelector("#sumPrice").innerText = krwFormat(sumPrice);
  submitButton.value = `${krwFormat(sumPrice)}원 결제`;
  document.querySelector("#sumPriceVal").value = sumPrice;
  filterPayTypeBtn();
};

const createproductInfo = (product) => {
  deliveryCharge = product.detail.delivery_charge.includes("별도") ? 4000 : 0;
  productPrice = Number(product.price.replace(/[^0-9]/g, ""));
  payFee =
    (productPrice * 3.5) / 100 > 2000
      ? 2000
      : ((productPrice * 3.5) / 100).toFixed(0);
  sumPrice = productPrice + deliveryCharge;

  let li = `
    <div class="store-name">
      <span class="shop-icon"></span>
      <p>${product.detail.store_name}</p>
    </div>
    <a href="/pages/detail.html?id=${product.id}">
      <div class="product-desc">
        <span class="product-desc-box productImgNm">
          <span class="productImg">
            <image src="../${product.image_path}" />
          </span>
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
          <p class="productDeliveryCharge">배송비 ${
            product.detail.delivery_charge
          }</p>
          <p class="productDeliveryPrice">${krwFormat(deliveryCharge)}원</p>
        </span>
        <span class="product-desc-box">
          <p>합계</p>
          <p class="productPrice">${krwFormat(sumPrice)}원</p>
        </span>
      </div>
    </a>
  `;
  document.querySelector(".productInfo").insertAdjacentHTML("beforeend", li);
  document.querySelector("#productPrice").innerText = krwFormat(productPrice);
  document.querySelector("#deliveryCharge").innerText =
    krwFormat(deliveryCharge);
  document.querySelector("#payFee").innerText = `${krwFormat(payFee)}원 `;
  document.querySelector("#sumPrice").innerText = krwFormat(sumPrice);
  submitButton.value = `${krwFormat(sumPrice)}원 결제`;

  document.querySelector("#productPriceVal").value = productPrice;
  document.querySelector("#deliveryChargeVal").value = deliveryCharge;
  document.querySelector("#payFeeVal").value = payFee;
  document.querySelector("#sumPriceVal").value = sumPrice;
  payType.value = "payco";
  setDiscountPrice(true);
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

    let discountFlag = false;
    let payTypeVal = target.replace("Guide", "");
    switch (target) {
      case "paycoGuide":
        if (sumPrice > 2000000) {
          payTypeVal = "";
        }
        discountFlag = true;
        break;
      case "tossGuide":
        if (sumPrice > 2000000) {
          payTypeVal = "";
        }
        break;
      case "kakaoGuide":
        if (sumPrice > 3000000) {
          payTypeVal = "";
          document.querySelector("#cashBill").setAttribute("disabled", "true");
          document.querySelector("#personal").setAttribute("disabled", "true");
          document.querySelector("#business").setAttribute("disabled", "true");
          document
            .querySelector("#cashBillSubType")
            .setAttribute("disabled", "true");
          document
            .querySelector("#cashBillInfo")
            .setAttribute("disabled", "true");
        } else {
          document.querySelector("#cashBill").removeAttribute("disabled");
          document.querySelector("#personal").removeAttribute("disabled");
          document.querySelector("#business").removeAttribute("disabled");
          document
            .querySelector("#cashBillSubType")
            .removeAttribute("disabled");
          document.querySelector("#cashBillInfo").removeAttribute("disabled");
        }
        break;
    }

    payType.value = payTypeVal;
    setDiscountPrice(discountFlag);
  });
});

modalLink.forEach((link) => {
  link.addEventListener("click", function () {
    let modalTitle = "";
    let modalContent = "";
    if (this.getAttribute("data-modal-key") === "payco") {
      modalTitle = "페이코 안내사항";
      modalContent = `
        <li>PAYCO는 NHN에서 제공하는 안전한 간편결제 서비스입니다.</li>
        <li>
          카드사 혜택 및 할부 적용 여부는 해당 카드사 정책에 따라 변경될 수
          있습니다.
        </li>
        <li>
          지원 가능 결제수단 : 페이코 결제창 내 노출되는 모든 카드/포인트/쿠폰
        </li>
        <li>
          페이코포인트 1일 결제한도는 200만원입니다. (안전거래 수수료 포함)
        </li>
      `;
    } else if (this.getAttribute("data-modal-key") === "naver") {
      modalTitle = "네이버페이 안내사항";
      modalContent = `
        <li>
          네이버페이는 네이버ID로 신용카드 또는 은행계좌 정보를 등록하여
          결제할 수 있는 간편결제 서비스입니다.
        </li>
        <li>
          주문 변경 시 카드사 혜택 및 할부 적용 여부는 해당 카드사 정책에 따라
          변경될 수 있습니다.
        </li>
        <li>
          지원 가능 결제수단 : 네이버페이 결제창 내 노출되는 모든 카드/계좌
        </li>
      `;
    }
    payTypeModal.querySelector("h3").innerHTML = modalTitle;
    payTypeModal.querySelector("ul").innerHTML = modalContent;
    payTypeModal.classList.add("active");
    modalOverlay.classList.add("active");
  });
});

document.querySelector(".payTypeModalClose").addEventListener("click", () => {
  payTypeModal.classList.remove("active");
  modalOverlay.classList.remove("active");
});

modalOverlay.addEventListener("click", () => {
  payTypeModal.classList.remove("active");
  modalOverlay.classList.remove("active");
});

allCheck.addEventListener("click", function () {
  approvalYn.forEach((chck) => {
    chck.checked = this.checked;
  });
  if (this.checked) {
    submitButton.classList.add("active");
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.classList.remove("active");
    submitButton.setAttribute("disabled", true);
  }
});

approvalYn.forEach((chck) => {
  chck.addEventListener("click", function () {
    const checkCount = document.querySelectorAll(
      "input[name='approvalYn']:checked"
    ).length;
    if (approvalYn.length === checkCount) {
      allCheck.checked = true;
      submitButton.classList.add("active");
    } else {
      allCheck.checked = false;
      submitButton.classList.remove("active");
    }
  });
});

descButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");
    this.closest("li").querySelector("iframe").classList.toggle("active");
  });
});

document
  .querySelector(".allCheckbox .fa-solid")
  .addEventListener("click", function () {
    const approvalCheckbox = document.querySelector(".approvalCheckbox");
    if (this.classList[1] === "fa-chevron-down") {
      this.classList.replace("fa-chevron-down", "fa-chevron-up");
      approvalCheckbox.classList.add("on");
    } else if (this.classList[1] === "fa-chevron-up") {
      this.classList.replace("fa-chevron-up", "fa-chevron-down");
      approvalCheckbox.classList.remove("on");
    }
  });

document.orderInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  const regExp = /^[0-9]+$/;
  const recipient = orderInfo.recipient;
  const phone1 = orderInfo.phone1;
  const phone2 = orderInfo.phone2;
  const phone3 = orderInfo.phone3;
  const zonecode = orderInfo.zonecode;
  const address = orderInfo.address;
  const detailAddress = orderInfo.detailAddress;

  if (recipient.value === "") {
    alert("받는사람 이름을 입력해주세요.");
    recipient.focus();
    return;
  }
  if (recipient.value.length < 2) {
    alert("받는사람 이름을 2자 이상 입력해주세요.");
    recipient.focus();
    return;
  }
  if (phone1.value === "") {
    alert("휴대폰 번호 앞자리를 입력해주세요.");
    phone1.focus();
    return;
  }
  if (!regExp.test(phone1.value) || phone1.value.length !== 3) {
    alert("휴대폰 번호 앞자리에 3자리 숫자만 입력해주세요.");
    phone1.focus();
    return;
  }
  if (phone2.value === "") {
    alert("휴대폰 번호 중간자리를 입력해주세요.");
    phone2.focus();
    return;
  }
  if (!regExp.test(phone2.value) || phone2.value.length !== 4) {
    alert("휴대폰 번호 중간자리에 4자리 숫자만 입력해주세요.");
    phone2.focus();
    return;
  }
  if (phone3.value === "") {
    alert("휴대폰 번호 뒷자리를 입력해주세요.");
    phone3.focus();
    return;
  }
  if (!regExp.test(phone3.value) || phone3.value.length !== 4) {
    alert("휴대폰 번호 뒷자리에 4자리 숫자만 입력해주세요.");
    phone3.focus();
    return;
  }
  if (zonecode.value === "") {
    alert("우편번호를 입력해주세요.");
    searchAddr.focus();
    return;
  }
  if (!regExp.test(zonecode.value) || zonecode.value.length !== 5) {
    alert("우편번호에 5자리 숫자만 입력해주세요.");
    searchAddr.focus();
    return;
  }
  if (address.value === "") {
    alert("기본주소를 입력해주세요.");
    searchAddr.focus();
    return;
  }
  if (detailAddress.value === "") {
    alert("상세주소를 입력해주세요.");
    detailAddress.focus();
    return;
  }

  const orderData = {};
  orderData.recipient = recipient.value;
  orderData.phone1 = phone1.value;
  orderData.phone2 = phone2.value;
  orderData.phone3 = phone3.value;
  orderData.zonecode = zonecode.value;
  orderData.address = address.value;
  orderData.detailAddress = detailAddress.value;
  orderData.deilveryMsg = orderInfo.deilveryMsg.value;
  orderData.etcMsg = orderInfo.etcMsg.value;
  orderData.payType = orderInfo.payType.value;

  switch (orderInfo.payType.value) {
    case "kakao":
      orderData.cashBill = orderInfo.cashBill.checked;
      orderData.cashBillType = orderInfo.cashBillType.value;
      orderData.cashBillSubType = orderInfo.cashBillSubType.value;
      orderData.cashBillInfo = orderInfo.cashBillInfo.value;
      break;
    case "accountTransfer":
      orderData.bank = orderInfo.bank.value;
      break;
    case "card":
      orderData.card = orderInfo.card.value;
      orderData.mipMonth = orderInfo.mipMonth.value;
      break;
  }
  orderData.productPriceVal = orderInfo.productPriceVal.value;
  orderData.deliveryChargeVal = orderInfo.deliveryChargeVal.value;
  orderData.payFeeVal = orderInfo.payFeeVal.value;
  orderData.discountPriceVal = orderInfo.discountPriceVal.value;
  orderData.sumPriceVal = orderInfo.sumPriceVal.value;
  orderData.approvalYn = orderInfo.allCheck.checked;

  localStorage.setItem("orderData", JSON.stringify(orderData));
  location.href = "/pages/payment.html";
});

fetch("../db.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const product = jsonData.product.find((product) => product.id === id);
    createproductInfo(product);
  });
