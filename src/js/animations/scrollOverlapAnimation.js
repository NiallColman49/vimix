document.addEventListener('DOMContentLoaded', () => {
    const pinnedStatSection = document.getElementById('pinned-stat-section');
    const overlayContent = document.getElementById('overlay-content');

    ScrollTrigger.create({
        trigger: pinnedStatSection,
        start: 'top top',
        pin: true,
        pinSpacing: false,
        endTrigger: overlayContent,
        end: 'top top',
    });

    gsap.fromTo(overlayContent,
        { opacity: 0.6 },
        {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: overlayContent,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
            }
        }
    );

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 250);
    });
});
