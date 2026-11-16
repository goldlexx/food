function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const root = document.querySelector(container);
    const viewport = document.querySelector(wrapper);
    const track = document.querySelector(field);
    const slides = Array.from(document.querySelectorAll(slide));
    const next = document.querySelector(nextArrow);
    const previous = document.querySelector(prevArrow);
    const current = document.querySelector(currentCounter);
    const total = document.querySelector(totalCounter);
    if (!root || !viewport || !track || !slides.length || !next || !previous || !current || !total) return;

    let index = 0;
    track.style.display = 'flex';
    track.style.transition = 'transform 350ms ease';
    viewport.style.overflow = 'hidden';
    total.textContent = String(slides.length).padStart(2, '0');

    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    indicators.setAttribute('role', 'group');
    indicators.setAttribute('aria-label', 'Выбрать изображение');
    const dots = slides.map((_, position) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', `Изображение ${position + 1}`);
        button.addEventListener('click', () => show(position));
        indicators.append(button);
        return button;
    });
    root.append(indicators);

    function resize() {
        slides.forEach(item => { item.style.flex = `0 0 ${viewport.clientWidth}px`; });
        show(index, false);
    }

    function show(nextIndex, animate = true) {
        index = (nextIndex + slides.length) % slides.length;
        track.style.transition = animate ? 'transform 350ms ease' : 'none';
        track.style.transform = `translateX(-${viewport.clientWidth * index}px)`;
        current.textContent = String(index + 1).padStart(2, '0');
        dots.forEach((dot, position) => {
            if (position === index) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
    }

    next.addEventListener('click', () => show(index + 1));
    previous.addEventListener('click', () => show(index - 1));
    window.addEventListener('resize', resize, {passive: true});
    resize();
}

export default slider;
