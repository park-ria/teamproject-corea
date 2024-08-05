const mainSlide = [
  {
    imgPath: "./img/xxx.jpg",
    title: "dddd",
  },
  {
    imgPath: "./img/xxx.jpg",
    title: "dddd",
    text1: "LUCKY DRAW",
    text2: "행운을 잡아라!",
    text3: `매주 특별 혜택까지!<i class="fa-solid fa-angle-right"></i>`,
  },
];

const ul = document.querySelector("ul");
mainSlide.forEach((item) => {
  const li = document.createElement("li");
  const aTag = document.createElement("a");
  aTag.style.background = `url("${item.imgPath}")`;
  li.appendChild(aTag);
});
