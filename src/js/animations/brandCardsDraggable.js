gsap.registerPlugin(Draggable);

const brandCards = document.querySelectorAll('.brand-card');
let highestZ = 3;

brandCards.forEach((card) => {
    card.style.cursor = 'grab';
});

Draggable.create(brandCards, {
    type: 'x,y',
    inertia: true,
    onPress: function () {
        highestZ++;
        gsap.set(this.target, { zIndex: highestZ, cursor: 'grabbing' });
    },
    onRelease: function () {
        gsap.set(this.target, { cursor: 'grab' });
    },
});
