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
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.closest(".faq-item");
        const isExpanded = question.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
          faqItem.classList.remove("active");
          question.setAttribute("aria-expanded", "false");
        } else {
          faqItem.classList.add("active");
          question.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  return {
    init: function () {
      initSwiper();
      initFAQ();
    },
  };
})();

document.addEventListener("DOMContentLoaded", function (event) {
  swiperMain.init();
});
