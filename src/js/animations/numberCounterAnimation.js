document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    function formatNumber(value, suffix = '') {
        const rounded = Math.round(value);
        const formatted = rounded.toLocaleString('en-GB');
        return formatted + suffix;
    }

    counters.forEach((counter) => {
        const target = parseInt(counter.dataset.target, 10);
        const suffix = counter.dataset.suffix || '';

        if (isNaN(target)) return;

        const obj = { value: 0 };
        counter.textContent = formatNumber(0, suffix);

        gsap.to(obj, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                once: true,
            },
            onUpdate: function () {
                counter.textContent = formatNumber(obj.value, suffix);
            },
        });
    });
});
