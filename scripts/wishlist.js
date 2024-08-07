// 탭 버튼 클릭 이벤트
const wishlistTabButton = document.querySelectorAll(".wishlistTabButton");
wishlistTabButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    const wishlistContent = document.querySelectorAll(".wishlistContent");
    const target = document.querySelector(
      `.${this.getAttribute("data-tab-name")}-content`
    );

    // 탭 버튼 초기화 및 가상클래스 적용
    wishlistTabButton.forEach((sibling) => {
      if (sibling !== this) sibling.classList.remove("active");
    });
    this.classList.add("active");

    // 탭 내용 초기화 및 가상클래스 적용
    wishlistContent.forEach((item) => {
      if (item !== target) item.classList.remove("active");
      //item.style.display = "none";
    });
    //target.style.display = "block";
    target.classList.add("active");
    //max-height + opacity + overflow:hidden
  });
});
