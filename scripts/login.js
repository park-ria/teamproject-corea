const userId = document.querySelector("#userId");
const userPw = document.querySelector("#userPw");
const form = document.querySelector(".login-main-npt form");

let userAccount = JSON.parse(localStorage.getItem("userAccount")) || [];

let setLoginEmail = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  userAccount = userAccount.find((account) => account.email === userId.value);

  console.log(userAccount);

  if (
    userId.value === userAccount.email &&
    userPw.value === userAccount.password
  ) {
    window.location.href = "/index.html";
    setLoginEmail.push(userAccount.email);
    localStorage.setItem("loginCheck", JSON.stringify(setLoginEmail));
  } else if (userId.value !== userAccount.email) {
    alert("아이디가 올바르지 않습니다.");
  } else {
    alert("비밀번호가 올바르지 않습니다.");
  }
});
