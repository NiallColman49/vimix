document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('footer-pattern');
    if (!container) return;

    const response = await fetch('./src/assets/images/patterns/pattern.svg');
    container.innerHTML = await response.text();

    const svg = container.querySelector('svg');
    if (!svg) return;

    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.display = 'block';

    gsap.matchMedia().add(
        {
            mobile: '(max-width: 639px)',
            tablet: '(min-width: 640px) and (max-width: 1023px)',
            desktop: '(min-width: 1024px)',
        },
        (context) => {
            const { mobile, tablet } = context.conditions;
            if (mobile) {
                svg.setAttribute('viewBox', '0 0 624 154');
            } else if (tablet) {
                svg.setAttribute('viewBox', '0 0 936 154');
            } else {
                svg.setAttribute('viewBox', '0 0 1872 154');
            }
        }
    );

    const paths = Array.from(svg.querySelectorAll('path'));

    function getRandomSubset() {
        const shuffled = gsap.utils.shuffle([...paths]);
        const count = Math.floor(paths.length * 0.15);
        return shuffled.slice(0, count);
    }

    function animateRandomPaths() {
        const subset = getRandomSubset();

        gsap.timeline({ onComplete: animateRandomPaths, delay: 0.2 })
            .to(subset, {
                opacity: 0.3,
                duration: 0.8,
                stagger: { each: 0.02, from: 'random' },
                ease: 'power2.inOut',
                yoyo: true,
                repeat: 1,
            });
    }

    animateRandomPaths();
});
