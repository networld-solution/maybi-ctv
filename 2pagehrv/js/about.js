const swiperMain = (function () {
  let swiper;

  function initSwiper() {
    swiper = new Swiper(".swiper", {
      loop: true,
      speed: 800,
      grabCursor: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".slider-control-next",
        prevEl: ".slider-control-prev",
      },
    });
  }

  function initFAQ() {
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach((q) => {
      q.addEventListener("click", () => {
        const faqItem = q.closest(".faq-item");
        const isExpanded = q.getAttribute("aria-expanded") === "true";
        const activeItem = document.querySelector(".faq-item.active");

        if (activeItem && activeItem !== faqItem) {
          activeItem.classList.remove("active");
          const activeBtn = activeItem.querySelector(".faq-question");
          if (activeBtn) activeBtn.setAttribute("aria-expanded", "false");
        }

        faqItem.classList.toggle("active");
        q.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
      });
    });
  }

  return {
    init: function () {
      initFAQ();
      initSwiper();
    },
  };
})();

document.addEventListener("DOMContentLoaded", function (event) {
  swiperMain.init();
});
