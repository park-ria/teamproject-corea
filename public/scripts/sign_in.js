const email = document.querySelector("#email");
const userPw1 = document.querySelector("#password1");
const userPw2 = document.querySelector("#password2");
const name = document.querySelector("#name");
const phone = document.querySelector("#phone");
let userAccount = JSON.parse(localStorage.getItem("userAccount")) || [];

const saveAccount = () => {
  localStorage.setItem("userAccount", JSON.stringify(userAccount));
};

let isValid = true;

email.addEventListener("change", () => {
  if (email.value.includes("@") === false) {
    document.querySelector("#error_email").innerText =
      "이메일 형식이 올바르지 않습니다.";
    document.querySelector("#error_email").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#error_email").innerText = "";
  }
});

userPw1.addEventListener("change", () => {
  if (userPw1.value.length >= 8 && userPw1.value.length <= 12) {
    document.querySelector("#error_password1").innerText = "";

    isValid = false;
  } else {
    document.querySelector("#error_password1").innerText =
      "8-12자 이내로 입력해주세요";
    document.querySelector("#error_password1").style.display = "block";
  }
});

userPw2.addEventListener("change", () => {
  if (userPw2.value !== userPw1.value) {
    document.querySelector("#error_password2").innerText =
      "비밀번호가 올바르지 않습니다.";
    document.querySelector("#error_password2").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#error_password2").innerText = "";
  }
});

name.addEventListener("change", () => {
  if (name.value == "" || name.value == null || name.value.length <= 1) {
    document.querySelector("#error_writer").innerText =
      "이름을 다시 입력해주세요";
    document.querySelector("#error_writer").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#error_writer").innerText = "";
  }
});

const tokenButton = document.querySelector("#token-button");
const tokenNumber = document.querySelector("#token");
const tokenTimer = document.querySelector("#token-timer");
const tokenConfirmButton = document.querySelector("#token-timer-confirmBtn");
const signupButton = document.querySelector("#signup-button");

// console.log(tokenConfirmButton);

const changePhone1 = () => {
  const phone1 = document.querySelector("#phone1");
  phone1.value = phone1.value.replace(/[^0-9.]/g, "");

  if (phone1.value.length === 3) {
    document.querySelector("#phone2").focus();
  }
};

const changePhone2 = () => {
  const phone2 = document.querySelector("#phone2");
  phone2.value = phone2.value.replace(/[^0-9.]/g, "");

  if (phone2.value.length === 4) {
    document.querySelector("#phone3").focus();
  }
};

const changePhone3 = () => {
  const phone1 = document.querySelector("#phone1").value;
  const phone2 = document.querySelector("#phone2").value;
  const phone3 = document.querySelector("#phone3").value;

  const phone3Str = document.querySelector("#phone3");
  phone3Str.value = phone3Str.value.replace(/[^0-9.]/g, "");

  if (phone1.length === 3 && phone2.length === 4 && phone3.length === 4) {
    tokenButton.style =
      "background:#0dcc5a; color: #fff; border:1px solid #0dcc5a; cursor: pointer";
    tokenButton.removeAttribute("disabled");
  }
};

let intersection;

const getTokenTimer = () => {
  let timer = 180;
  intersection = setInterval(() => {
    if (timer >= 0) {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      tokenTimer.innerText = minutes + ":" + String(seconds).padStart(2, "0");
      timer -= 1;
    } else {
      tokenNumber.innerText = "000000";
      tokenButton.style =
        "background:#0dcc5a; color: #0dcc5a; cursor: pointer, border:none";
      tokenButton.setAttribute("disabled", "true");

      tokenTimer.innerText = "3:00";
      tokenConfirmButton.style = "";
      tokenConfirmButton.setAttribute("disabled", "true");

      clearInterval(intersection);
    }
  }, 1000);
};

tokenButton.addEventListener("click", (e) => {
  e.preventDefault();
  const randomNum = String(Math.floor(Math.random() * 1000000)).padStart(
    6,
    "0"
  );
  tokenNumber.innerText = randomNum;
  // console.log(tokenConfirmButton);
  tokenConfirmButton.style =
    "background-color: #0dcc5a; color: #fff; border: 1px solid #0dcc5a; cursor:pointer";
  tokenConfirmButton.removeAttribute("disabled", "true");
  getTokenTimer();
});

tokenConfirmButton.addEventListener("click", function (e) {
  e.preventDefault();
  clearInterval(intersection);
  this.style =
    "background-color: #0dcc5a; color: #fff; border: 1px solid #0dcc5a; cursor:pointer";
  this.setAttribute("disabled", "true");
  this.innerText = "인증완료";
  alert("인증이 완료되었습니다 :ㅇ");

  signupButton.style =
    "background-color: #0dcc5a; color: #fff; border: 1px solid #0dcc5a; cursor:pointer";
  signupButton.removeAttribute("disabled");
});

document.frm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (email.value === "") {
    alert("이메일을 입력해주세요.");
    email.focus();
    return;
  }

  if (!email.value.includes("@")) {
    alert("이메일을 형식이 맞지 않습니다.\n다시 입력해주세요.");
    email.focus();
    return;
  }

  if (password1.value === "") {
    alert("비밀번호를 입력해주세요");
    password1.focus();
    return;
  }

  if (userPw1.value.length < 8 || userPw1.value.length > 12) {
    alert("비밀번호를 8~12자 이내로 입력해주세요");
    password1.focus();
    return;
  }

  if (password2.value === "") {
    alert("비밀번호를 확인해주세요");
    password2.focus();
    return;
  }

  if (password1.value !== password2.value) {
    alert("비밀번호와 비밀번호확인 값이 다릅니다.\n다시 입력해주세요.");
    password2.focus();
    return;
  }

  if (name.value === "") {
    alert("이름을 입력해주세요.");
    name.focus();
    return;
  }

  if (name.value.length <= 1) {
    alert("이름을 2자 이상 입력해주세요.");
    name.focus();
    return;
  }

  const phone1 = document.querySelector("#phone1");
  const phone2 = document.querySelector("#phone2");
  const phone3 = document.querySelector("#phone3");

  if (phone1.value === "") {
    alert("휴대폰 앞자리를 입력해주세요.");
    phone1.focus();
    return;
  }
  if (phone1.value.length !== 3) {
    alert("휴대폰 앞자리 숫자만 3자 입력해주세요.");
    phone1.focus();
    return;
  }

  if (phone2.value === "") {
    alert("휴대폰 중간자리를 입력해주세요.");
    phone2.focus();
    return;
  }
  if (phone2.value.length !== 4) {
    alert("휴대폰 앞자리 숫자만 4자 입력해주세요.");
    phone2.focus();
    return;
  }

  if (phone3.value === "") {
    alert("휴대폰 뒷자리를 입력해주세요.");
    phone3.focus();
    return;
  }
  if (phone3.value.length !== 4) {
    alert("휴대폰 앞자리 숫자만 4자 입력해주세요.");
    phone3.focus();
    return;
  }

  const userInfo = {
    email: email.value,
    password: password1.value,
    name: name.value,
    phone1: phone1.value,
    phone2: phone2.value,
    phone3: phone3.value,
    zipcode: zipcode.value,
    address: fullAddress.value,
  };
  userAccount.push(userInfo);
  saveAccount();
  location.href = "/pages/signinComplete.html";
});

const locations = document.querySelectorAll(".locationoptions label");
console.log(locations);

locations.forEach((label) => {
  label.addEventListener("click", function () {
    locations.forEach((target) => {
      if (target !== label) {
        target.classList.remove("active");
      }
    });
    label.classList.add("active");
  });
});

//우편번호
const fullAddress = document.querySelector(".fullAddress");
const zipcode = document.querySelector(".homeaddress");
const locationBtn = document.querySelector("#locationbtn");
locationBtn.addEventListener("click", () => {
  new daum.Postcode({
    oncomplete: function (data) {
      console.log(zipcode);

      let fullAddr = "";

      if (data.userSelectedType === "R") {
        fullAddr = data.roadAddress;
      } else {
        fullAddr = data.jibunAddress;
      }
      fullAddress.value = fullAddr;
      zipcode.value = data.zonecode;
    },
  }).open();
});

const genders = document.querySelectorAll(".gender label");
genders.forEach((label) => {
  label.addEventListener("click", function () {
    genders.forEach((target) => {
      if (target !== label) {
        target.classList.remove("active");
      }
    });
    label.classList.add("active");
  });
});
