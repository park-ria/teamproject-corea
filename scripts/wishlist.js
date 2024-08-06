// 탭 버튼 클릭 이벤트
const wishlistTabButton = document.querySelectorAll(".wishlistTabButton");
wishlistTabButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    const target = document.querySelector(
      `.${this.getAttribute("data-tab-name")}-content`
    );
    const wishlistContent = document.querySelectorAll(".wishlistContent");

    wishlistContent.forEach((item) => {
      if (item !== target) item.style.display = "none";
    });

    console.log(this);
    this.classList.add("active");
    target.style.display = "block";
  });
});
