document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach((button) => {
        const text = button.querySelector('.btn-text');
        const arrow = button.querySelector('.btn-arrow');
        const arrowWidth = arrow.offsetWidth;

        const hoverTimeline = gsap.timeline({ paused: true });

        hoverTimeline
            .to(
                button,
                {
                    '--white-overlay-width': `${arrowWidth + 8}px`,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                0,
            )
            .to(
                text,
                {
                    color: '#ffffff',
                    x: 6,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                0,
            );

        button.addEventListener('mouseenter', () => {
            hoverTimeline.play();
        });

        button.addEventListener('mouseleave', () => {
            hoverTimeline.reverse();
        });
    });

    const darkButtons = document.querySelectorAll('.btn-primary-dark');

    darkButtons.forEach((button) => {
        const text = button.querySelector('.btn-text');

        const hoverTimeline = gsap.timeline({ paused: true });

        hoverTimeline.to(
            text,
            {
                x: 6,
                duration: 0.5,
                ease: 'power2.out',
            },
            0,
        );

        button.addEventListener('mouseenter', () => {
            hoverTimeline.play();
        });

        button.addEventListener('mouseleave', () => {
            hoverTimeline.reverse();
        });
    });
});
