const SliderMain = (function () {
    let sliderWrapper;
    let slides;
    let prevBtn;
    let nextBtn;
    let dots;

    let currentIndex = 0;
    let totalSlides = 0;
    let autoSlideInterval;

    function updateSlider() {
        slides.forEach(slide => slide.classList.remove('active'));
        if (slides[currentIndex]) {
            slides[currentIndex].classList.add('active');
        }

        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    function bindEvents() {
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
                resetAutoSlide();
            });
        });
    }

    return {
        init: function () {
            sliderWrapper = document.querySelector('.slider-wrapper');
            slides = document.querySelectorAll('.slider-item');
            prevBtn = document.querySelector('.slider-control-prev');
            nextBtn = document.querySelector('.slider-control-next');
            dots = document.querySelectorAll('.slider-dot');

            if (!sliderWrapper || slides.length === 0) return;

            totalSlides = slides.length;
            
            if (slides[0]) slides[0].classList.add('active');
            if (dots[0]) dots[0].classList.add('active');

            bindEvents();
            startAutoSlide();
        },
    };
})();

document.addEventListener("DOMContentLoaded", function (event) {
    SliderMain.init();
    
    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Optional: Close all other open FAQs (Accordion style)
            // document.querySelectorAll('.faq-item').forEach(item => {
            //     item.classList.remove('active');
            //     item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            // });

            if (isExpanded) {
                faqItem.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            } else {
                faqItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
