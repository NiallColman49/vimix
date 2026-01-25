const carouselSwiper = new Swiper('.carousel-swiper', {
    effect: 'coverflow',
    centeredSlides: true,
    slidesPerView: 1.1,
    loop: true,
    grabCursor: true,
    speed: 600,
    breakpoints: {
        640: {
            slidesPerView: 1.2,
        },
        1536: {
            slidesPerView: 'auto',
        },
    },
    coverflowEffect: {
        rotate: 15,
        stretch: 80,
        depth: 350,
        modifier: 1,
        scale: 0.85,
        slideShadows: false,
    },
    on: {
        init: function () {
            this.el.style.overflow = 'visible';
            this.wrapperEl.style.overflow = 'visible';
            updateSlides(this);
        },
        setTranslate: function () {
            updateSlides(this);
        },
    },
});

function updateSlides(swiper) {
    swiper.slides.forEach((slide) => {
        const progress = slide.progress || 0;
        const absProgress = Math.abs(progress);
        const zIndex = Math.round(100 - absProgress * 10);
        slide.style.zIndex = zIndex;

        const innerContent = slide.querySelector('.relative');
        if (innerContent) {
            const verticalOffset = progress * -90;
            innerContent.style.transform = `translateY(${verticalOffset}px)`;
        }
    });
}
