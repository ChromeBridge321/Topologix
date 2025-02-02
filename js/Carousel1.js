var currentPosition;
var nameOfPosition;

var currentObject;
var currentObjectName;
let CorrectAnswers = ['ArribaPiedra', 'ArribaCasa', 'DentroCasa', 'AtrasHongo', 'DentroValde']
// Función para crear un controlador de carrusel
function createCarouselController1(carousel) {
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

        console.log(currentIndex);
        console.log((items[currentIndex]['children'][1]).name);
        currentPosition = currentIndex;
        nameOfPosition = (items[currentPosition]['children'][1]).name;
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
    cambiarImagen()
    updateItemsPosition()
    return updateItemsPosition;




}

function createCarouselController2(carousel) {
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

        console.log(currentIndex);
        console.log((items[currentIndex]['children'][1]).name);
        currentObject = currentIndex;
        currentObjectName = (items[currentObject]['children'][1]).name;
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

    updateItemsPosition()
    return updateItemsPosition;




}


function mostrarDatos() {

    let Asnwer = nameOfPosition + currentObjectName;
    if (CorrectAnswers.includes(Asnwer)) {
        alert("Respuesta Correcta");
    } else {
        alert("Respuesta Incorrecta");
    }

}

function cambiarImagen() {
    // Array con las posibles imágenes
    

    let imagenes = ["/images/animales/aveCelular.png", "/images/animales/gatoCelular.png",
        "/images/animales/osoCelular.png", "/images/animales/ranaCelular.png", "/images/animales/ratonCelular.png"
    ];
    // Elegimos una imagen aleatoria
    let imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];

    // Asignamos el src a la imagen
    document.getElementById("imageToFoud").setAttribute("src", imagenAleatoria);
    let src = document.getElementById("imageToFoud").src;
    console.log(src)
}


// Inicializar ambos carruseles
const carousel1 = document.querySelectorAll('.carousel1');
const carousel2 = document.querySelectorAll('.carousel2');
const updateFunctions1 = Array.from(carousel1).map(createCarouselController1);
const updateFunctions2 = Array.from(carousel2).map(createCarouselController2);

// Manejar cambios de tamaño
window.addEventListener('resize', () => {
    updateFunctions.forEach(update => update());
});

window.addEventListener('orientationchange', () => {
    updateFunctions.forEach(update => update());
});


// Apartado 1 tablero 1




