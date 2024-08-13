// safeserviceModal
const modalBtn = document.querySelector("#modalBtn");

modalBtn.addEventListener("click", () => {
  const safeserviceModal = document.querySelector("#safeserviceModal");
  const closeBtn = safeserviceModal.querySelector(".closeBtn");

  safeserviceModal.classList.add("active");

  closeBtn.addEventListener("click", () => {
    safeserviceModal.classList.remove("active");
  });
});

// Testin moving to detail.html
const joonggoInfo = "../db.json";
const rankingSlides = document.querySelectorAll(".slideWrapper > li");

fetch(joonggoInfo)
  .then((response) => response.json())
  .then((joongoData) => {
    //console.log(joongoData.data);
    joongoData.data.forEach((product, index) => {
      // best-ranking
      if (index < 8) {
        const bestRankingUl = document.querySelector(".bestRankingUl");
        // const li = document.createElement("li");
        // const aTag = document.createElement("a");
        // const slideImg = document.createElement("div");
        // slideImg.className = "slide-img";
        // slideImg.style.background = `url("../${product.image_path}") center/cover no-repeat`;
        // li.appendChild(aTag).appendChild(slideImg);
        // const slideDesc = `
        //               <div class="slide-desc">
        //                 <h4 class="desc-title">
        //                   고사양 컴퓨터 라이젠 5900x x570 rtx3080
        //                 </h4>
        //                 <strong class="desc-price">880,000원</strong>
        //                 <p class="desc-info">
        //                   <span class="desc-time">26분 전</span>
        //                   <span class="desc-place"> | 고척제1동 </span>
        //                 </p>
        //               </div>
        // `;
        //aTag.innerHTML += slideDesc;
        //bestRankingUl.appendChild(li);

        /*const li = `
          <li>
            <a href="#none">
              <div class="slide-img" style="background:url('../${
                product.image_path
              }') center/cover no-repeat"></div>
              <div class="slide-desc">
                <h4 class="desc-title">
                  ${product.title}
                </h4>
                <strong class="desc-price">${product.price}</strong>
                <p class="desc-info">
                  <span class="desc-time">${product.time}</span>
                  <span class="desc-place">${
                    product.point ? " | " + product.point : ""
                  } </span>
                </p>
              </div>
            </a>
            <span class="badge badge-best"></span>
          </li>
        `;*/

        let li = `
          <li>
            <a href="#none">
              <div class="slide-img" style="background:url('../${product.image_path}') center/cover no-repeat"></div>
              <div class="slide-desc">
                <h4 class="desc-title">
                  ${product.title}
                </h4>
                <strong class="desc-price">${product.price}</strong>
                <p class="desc-info">
                  <span class="desc-time">${product.time}</span>
                  `;
        if (product.point) {
          li += `<span class="desc-place"> | ${product.point}</span>`;
        }

        li += `
                </p>
              </div>
            </a>
            <span class="badge badge-best"></span>
          </li>
          `;

        bestRankingUl.innerHTML += li;
      }
    });

    joongoData.data.forEach((product) => {
      rankingSlides.forEach((rankingSlide) => {
        rankingSlide.addEventListener("click", () => {
          const url = `pages/detail.html?id=${encodeURIComponent(179612232)}`;
          window.location.href = url;
        });
      });
    });
  });
