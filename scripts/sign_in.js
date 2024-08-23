const tokenButton = document.querySelector("#token-button");
const tokenNumber = document.querySelector("#token");
const tokenTimer = document.querySelector("#token-timer");
const tokenConfirmButton = document.querySelector("#token-timer-confirmBtn");
const signupButton = document.querySelector("#signup-button");

console.log(tokenConfirmButton);


const changePhone1 = () => {
  const phone1 = document.querySelector("#phone1").value;
  if (phone1.length === 3) {
    document.querySelector("#phone2").focus();
  }
};

const changePhone2 = () => {
  const phone2 = document.querySelector("#phone2").value;
  if (phone2.length === 4) {
    document.querySelector("#phone3").focus();
  }
};

const changePhone3 = () => {
  const phone1 = document.querySelector("#phone1").value;
  const phone2 = document.querySelector("#phone2").value;
  const phone3 = document.querySelector("#phone3").value;

  if (phone1.length === 3 && phone2.length === 4 && phone3.length === 4) {
    tokenButton.style =
      "background-color: #0dcc5a; color: #fff; cursor: pointer, border:none";
    tokenButton.removeAttribute("disabled");
  }
};

let interval;

const getTokenTimer = () => {
  let timer = 180;
  interval = setInterval(() => {
    if (timer >= 0) {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      tokenTimer.innerText = minutes + ":" + String(seconds).padStart(2, "0");
      timer -= 1;
    } else {
      tokenNumber.innerText = "000000";
      tokenButton.style = "background-color: #0dcc5a; color: #fff; cursor: pointer, border:none";
      tokenButton.setAttribute("disabled", "true");

      tokenTimer.innerText = "3:00";
      tokenConfirmButton.style = "";
      tokenConfirmButton.setAttribute("disabled", "true");

      clearInterval(interval)
    }
  }, 1000);
};

tokenButton.addEventListener("click", (e) => {
  e.preventDefault();
  const randomNum = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  tokenNumber.innerText = randomNum;
  // console.log(tokenConfirmButton);
  tokenConfirmButton.style =
    "background-color: #0dcc5a; color: #fff; cursor: pointer";
  tokenConfirmButton.removeAttribute("disabled", "true");
  getTokenTimer();
});

tokenConfirmButton.addEventListener("click", function (e) {
  e.preventDefault();
  clearInterval(interval);
  this.style = "background-color: #fff";
  this.setAttribute("disabled", "true");
  this.innerText = "인증완료";
  alert("인증이 완료되었습니다 :ㅇ");

  signupButton.style =
    "background-color:#0dcc5a; color: #fff; border: 1px solid none; cursor:pointer"
  signupButton.removeAttribute("disalbed");
});

signupButton.addEventListener("click", (e) => {
  e.preventDefault();
})


const email = document.querySelector("#email");
const userPw1 = document.querySelector("#password1");
const userPw2 = document.querySelector("#password2");
const name = document.querySelector("#name");
const phone = document.querySelector("#phone");

// console.log(email, userPw1, userPw2, name, phone);
let isValid = true;

email.addEventListener("change", () => {
  if (email.value.includes("@") === false) {
    document.querySelector("#error_email").innerText =
      "이메일 형식이 올바르지 않습니다.";
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
  }
});

userPw2.addEventListener("change", () => {
  if (userPw2.value !== userPw1.value) {
    document.querySelector("#error_password2").innerText =
      "비밀번호가 올바르지 않습니다.";
    isValid = false;
  } else {
    document.querySelector("#error_password2").innerText = "";
  }
});

name.addEventListener("change", ()=>{
  console.log(name.value);
  if (name.value === null || name.value === ""){
    document.querySelector("#error_writer").innerText="이름을 다시 입력해주세요.";
    isValid = false;
  }else{
    document.querySelector("#error_writer").innerText="";
  }
});

