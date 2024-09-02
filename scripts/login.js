const ezenId = {
  id: "ezen1234@naver.com",
  pw: "20240614",
};

const userId = document.querySelector("#userId");
const userPw = document.querySelector("#userPw");
const form = document.querySelector(".login-main-npt form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(userId.value);
  if (userId.value === ezenId.id && userPw.value === ezenId.pw) {
    window.location.href = "../index.html";
  } else if (userId.value !== ezenId.id) {
    alert("아이디가 옳바르지 않습니다.");
  } else {
    alert("비밀번호가 옳바르지 않습니다.");
  }
});
