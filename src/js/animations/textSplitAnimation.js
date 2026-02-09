document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-split-text]');
    if (!elements.length) return;

    gsap.delayedCall(0.1, () => {
        elements.forEach(initSplitText);
    });

    function initSplitText(el) {
        const isAuto = el.hasAttribute('data-split-auto');
        const stagger = parseFloat(el.dataset.splitStagger) || 0.05;
        const hasBlockSpans = el.dataset.splitBlocks !== undefined;

        el._originalHTML = el.innerHTML;

        if (hasBlockSpans) {
            wrapBlockSpans(el);
        } else {
            splitIntoLines(el);
        }

        const lines = el.querySelectorAll('.split-line-inner');
        if (!lines.length) {
            el.classList.add('is-ready');
            return;
        }

        gsap.set(lines, { y: '120%' });

        el.classList.add('is-ready');

        const tween = gsap.to(lines, {
            y: 0,
            duration: 0.6,
            stagger: stagger,
            ease: 'power2.out',
            paused: true
        });

        if (isAuto) {
            gsap.delayedCall(0.2, () => tween.play());
        } else {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                once: true,
                onEnter: () => tween.play()
            });
        }
    }

    function wrapBlockSpans(el) {
        const blockSpans = el.querySelectorAll(':scope > span.block, :scope > span[class*="block"]');

        blockSpans.forEach(span => {
            const wrapper = document.createElement('div');
            wrapper.className = 'split-line';

            const inner = document.createElement('span');
            inner.className = 'split-line-inner';

            inner.innerHTML = span.innerHTML;

            const originalClasses = span.className.split(' ').filter(c => !c.includes('block'));
            if (originalClasses.length) {
                inner.classList.add(...originalClasses);
            }

            wrapper.appendChild(inner);
            span.parentNode.replaceChild(wrapper, span);
        });
    }

    function splitIntoLines(el) {
        const text = el.textContent.trim();
        if (!text) return;

        const hasBr = el.innerHTML.includes('<br');

        if (hasBr) {
            splitByBr(el);
            return;
        }

        const words = text.split(/\s+/);
        el.innerHTML = '';

        const wordSpans = words.map(word => {
            const span = document.createElement('span');
            span.style.display = 'inline';
            span.textContent = word + ' ';
            el.appendChild(span);
            return span;
        });

        const lines = [];
        let currentLine = [];
        let currentTop = null;

        wordSpans.forEach((span, index) => {
            const rect = span.getBoundingClientRect();
            const top = Math.round(rect.top);

            if (currentTop === null) {
                currentTop = top;
                currentLine.push(span);
            } else if (Math.abs(top - currentTop) < 5) {
                currentLine.push(span);
            } else {
                lines.push(currentLine);
                currentLine = [span];
                currentTop = top;
            }
        });

        if (currentLine.length) {
            lines.push(currentLine);
        }

        el.innerHTML = '';

        lines.forEach(lineWords => {
            const lineWrapper = document.createElement('div');
            lineWrapper.className = 'split-line';

            const lineInner = document.createElement('span');
            lineInner.className = 'split-line-inner';
            lineInner.textContent = lineWords.map(s => s.textContent.trim()).join(' ');

            lineWrapper.appendChild(lineInner);
            el.appendChild(lineWrapper);
        });
    }

    function splitByBr(el) {
        const html = el.innerHTML;
        const parts = html.split(/<br\s*\/?>/i);

        el.innerHTML = '';

        parts.forEach(part => {
            const trimmed = part.trim();
            if (!trimmed) return;

            const lineWrapper = document.createElement('div');
            lineWrapper.className = 'split-line';

            const lineInner = document.createElement('span');
            lineInner.className = 'split-line-inner';
            lineInner.textContent = trimmed.replace(/<[^>]*>/g, '');

            lineWrapper.appendChild(lineInner);
            el.appendChild(lineWrapper);
        });
    }
});    
