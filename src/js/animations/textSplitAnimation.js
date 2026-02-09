const splitElements = document.querySelectorAll('[data-split-text]');

splitElements.forEach((el) => {
    const isAuto = el.hasAttribute('data-split-auto');
    const stagger = parseFloat(el.dataset.splitStagger) || 0.05;

    SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
            el.classList.add('is-ready');

            if (isAuto) {
                return gsap.from(self.lines, {
                    y: '120%',
                    duration: 0.6,
                    stagger,
                    ease: 'power2.out',
                    delay: 0.2,
                });
            }

            return gsap.from(self.lines, {
                y: '120%',
                duration: 0.6,
                stagger,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                },
            });
        },
    });
});
