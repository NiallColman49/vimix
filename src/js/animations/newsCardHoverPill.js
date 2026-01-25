document.addEventListener('DOMContentLoaded', () => {
    const newsCards = document.querySelectorAll('[data-news-card]');

    newsCards.forEach((card) => {
        const pill = card.querySelector('.news-card-pill');

        const xTo = gsap.quickTo(pill, 'left', { duration: 0.3, ease: 'power2.out' });
        const yTo = gsap.quickTo(pill, 'top', { duration: 0.3, ease: 'power2.out' });

        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left + 15;
            const y = e.clientY - rect.top + 15;
            gsap.set(pill, { left: x, top: y });
            gsap.to(pill, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(pill, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left + 15;
            const y = e.clientY - rect.top + 15;
            xTo(x);
            yTo(y);
        });
    });
});
