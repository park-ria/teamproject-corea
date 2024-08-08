// safeserviceModal
const safeService = document.querySelector("#safe-service");

safeService.addEventListener("click", () => {
  const safeserviceModal = document.querySelector("#safeserviceModal");
  const closeBtn = safeserviceModal.querySelector(".closeBtn");

  safeserviceModal.classList.add("active");

  closeBtn.addEventListener("click", () => {
    safeserviceModal.classList.remove("active");
  });
});
