// Función para crear un controlador de carrusel
function createCarouselController(carousel) {
    const items = carousel.querySelectorAll('.item');
    const totalItems = items.length;
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let lastTouchX = 0;

    function normalizeIndex(index) {
        return ((index % totalItems) + totalItems) % totalItems;

        
    }

    function updateItemsPosition() {
        const spacing = window.innerWidth * 0.3;
        items.forEach((item, index) => {
            const diff = normalizeIndex(index - currentIndex);
            const x = diff * spacing;
            
            item.style.transform = `translateX(calc(-50% + ${x}px))`;
            item.style.display = Math.abs(diff) <= 2 ? 'flex' : 'none';
            
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        console.log((items[0]['children'][1]).name);
        console.log(currentIndex);

    }

    function handleTouchStart(e) {
        isDragging = true;
        carousel.classList.add('grabbing');
        startX = e.touches[0].clientX;
        lastTouchX = startX;
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        
        const touchX = e.touches[0].clientX;
        const deltaX = lastTouchX - touchX;
        lastTouchX = touchX;

        if (Math.abs(deltaX) > 1) {
            if (deltaX > 0) {
                currentIndex = normalizeIndex(currentIndex + 1);
            } else {
                currentIndex = normalizeIndex(currentIndex - 1);
            }
            updateItemsPosition();
            isDragging = false;
        }
    }

    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        carousel.classList.remove('grabbing');
        updateItemsPosition();
    }

    function handleDragStart(e) {
        isDragging = true;
        carousel.classList.add('grabbing');
        startX = e.pageX;
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        
        const deltaX = startX - e.pageX;
        
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                currentIndex = normalizeIndex(currentIndex + 1);
            } else {
                currentIndex = normalizeIndex(currentIndex - 1);
            }
            handleDragEnd();
        }
    }

    function handleDragEnd() {
        isDragging = false;
        carousel.classList.remove('grabbing');
        updateItemsPosition();
    }

    // Inicializar eventos
    carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
    carousel.addEventListener('touchend', handleTouchEnd);
    carousel.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    carousel.addEventListener('dragstart', (e) => e.preventDefault());

    // Actualizar posiciones iniciales
    updateItemsPosition();

    return updateItemsPosition;

        
        

}

// Inicializar ambos carruseles
const carousels = document.querySelectorAll('.carousel');
const updateFunctions = Array.from(carousels).map(createCarouselController);

// Manejar cambios de tamaño
window.addEventListener('resize', () => {
    updateFunctions.forEach(update => update());
});

window.addEventListener('orientationchange', () => {
    updateFunctions.forEach(update => update());
});

const dataThing = document.getElementsByClassName('.item');
console.log(dataThing);

// Apartado 1 tablero 1




