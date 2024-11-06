window.addEventListener("load", () => {
  const loginCheck = JSON.parse(localStorage.getItem("loginCheck")) || [];
  if (loginCheck.length === 0) {
    location.href = "/pages/login.html";
  }
});

const setOrderData = () => {
  const orderData = JSON.parse(localStorage.getItem("orderData")) || {};
  if (orderData) {
    const today = new Date();
    const year = today.getFullYear();
    const month =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1;
    const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const time = today.getTime();
    document.querySelector(".oderNum").innerText = `JG${String(time).slice(
      0,
      5
    )}-${String(time).slice(5)}`;
    document.querySelector(".oderDate").innerText = `${year}-${month}-${date}`;
    let payType = "";
    switch (orderData.payType) {
      case "payco":
        payType = "페이코 페이";
        break;
      case "toss":
        payType = "토스 페이";
        break;
      case "naver":
        payType = "네이버 페이";
        break;
      case "kakao":
        payType = "카카오 페이";
        break;
      case "accountTransfer":
        payType = "무통장 입금";
        break;
      case "card":
        payType = "카드 결제";
        break;
    }
    document.querySelector(".payMethod").innerText = payType;
    document.querySelector(".payNum").innerText = `${new Intl.NumberFormat(
      "ko-kr",
      { currency: "KRW" }
    ).format(orderData.sumPriceVal)}원`;
  }
};

setOrderData();
