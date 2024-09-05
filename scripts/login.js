const form = document.querySelector(".login-main-npt form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userAccount = JSON.parse(localStorage.getItem("userAccount")) || [];
  let setLoginEmail = [];

  const userId = document.querySelector("#userId");
  const userPw = document.querySelector("#userPw");
  if (userId.value === "") {
    alert("아이디를 입력해주세요");
    userId.focus();
    return;
  }
  if (userPw.value === "") {
    alert("비밀번호를 입력해주세요");
    userPw.focus();
    return;
  }

  userAccount = userAccount.find((account) => account.email === userId.value);

  if (userAccount) {
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
  } else {
    alert("아이디가 올바르지 않습니다.");
  }
});
