// FAQ - accordion event
const faqContents = document.querySelectorAll(".faq .content");
const faqTitles = document.querySelectorAll(".faq .title");

faqContents[0].classList.add("active");
faqTitles.forEach((title) => {
  title.addEventListener("click", () => {
    faqContents.forEach((item) => {
      item.classList.remove("active");
    });

    faqTitles.forEach((otherTitle) => {
      if (otherTitle !== title) {
        otherTitle.classList.remove("active");
      }
    });

    let content = title.nextElementSibling;

    if (title.classList.contains("active")) {
      title.classList.remove("active");
      content.classList.remove("active");
    } else {
      title.classList.add("active");
      content.classList.add("active");
    }
  });
});
