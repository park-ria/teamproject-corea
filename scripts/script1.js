const userId = document.querySelector("#userId");

userId.addEventListener("focus", function () {
  this.style.backgroundColor = "pink";
});

userId.addEventListener("blur", function () {
  this.style.backgroundColor = "transparent";
});

const userPw = document.querySelector("#userPw");

userPw.addEventListener("focus", function () {
  this.style.backgroundColor = "pink";
});

userPw.addEventListener("blur", function () {
  this.style.backgroundColor = "transparent";
});
