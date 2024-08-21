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
  if (userPw1.value.includes("!@#$") === false) {
    document.querySelector("#error_password1").innerText = "";
    isValid = false;
  } else {
    document.querySelector("#error_password1").innerText =
      "!@#$가 들어가면 안됩니다.";
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
