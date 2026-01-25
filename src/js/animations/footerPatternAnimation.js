document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('footer-pattern');
    if (!container) return;

    const response = await fetch('./src/assets/images/patterns/pattern.svg');
    const svgText = await response.text();
    container.innerHTML = svgText;

    const svg = container.querySelector('svg');
    if (!svg) return;

    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.display = 'block';

    function updateViewBox() {
        const width = window.innerWidth;
        if (width < 640) {
            svg.setAttribute('viewBox', '0 0 624 154');
        } else if (width < 1024) {
            svg.setAttribute('viewBox', '0 0 936 154');
        } else {
            svg.setAttribute('viewBox', '0 0 1872 154');
        }
    }

    updateViewBox();
    window.addEventListener('resize', updateViewBox);

    const paths = svg.querySelectorAll('path');

    function animateRandomPaths() {
        const pathArray = Array.from(paths);
        const shuffled = pathArray.sort(() => Math.random() - 0.5);
        const subset = shuffled.slice(0, Math.floor(paths.length * 0.15));

        gsap.to(subset, {
            opacity: 0.3,
            duration: 0.8,
            stagger: {
                each: 0.02,
                from: 'random',
            },
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.to(subset, {
                    opacity: 1,
                    duration: 0.8,
                    stagger: {
                        each: 0.02,
                        from: 'random',
                    },
                    ease: 'power2.inOut',
                });
            },
        });
    }

    animateRandomPaths();
    setInterval(animateRandomPaths, 2000);
});
