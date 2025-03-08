let currentPosition; // variable que muestra la posicion actual de la imagen actual
let nameOfPosition;// variable que muestra el nombre asignado a la posicion actual de imagen
let currentObject;// variable que muestra la posicion del la imagen objeto
let currentObjectName; // variable que muestra el nombre del la imagen objeto actual

//obejtos que contendran propiedades que se utilizaran en la ejecucion de algunas funciones
const ave = {
    nombre: "ave",
    src: "/images/animales/aveCelular.png"
};

const gato = {
    nombre: "gato",
    src: "/images/animales/gatoCelular.png"
};

const oso = {
    nombre: "oso",
    src: "/images/animales/osoCelular.png"
};


const rana = {
    nombre: "rana",
    src: "/images/animales/ranaCelular.png"
};


const raton = {
    nombre: "raton",
    src: "/images/animales/ratonCelular.png"
};


let imagenes = [gato, ave, oso, rana, raton]; // varibale que guarda a los obejetos
let imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)]; // seleccion de una posicion aleatoria del array imagenes
let CorrectAnswers = ['aveArribaArbol', 'osoFrenteCasa', 'ranaAtrasValde', 'gatoAbajoArbol', 'ratonArribaPiedra']
let respuestas = JSON.parse(localStorage.getItem("respuestas")) || []; // array para guardar las respuestas correctas
let contador = parseInt(localStorage.getItem("contador")) || 0; // determinara si ya se han alcanzado todas las respuestas
// Reproducir el sonido correspondiente
const sonidoCorrecto = document.getElementById("sonidoCorrecto");
const sonidoIncorrecto = document.getElementById("sonidoIncorrecto");
const sonidoSuperado = document.getElementById("sonidoSuperado");
const SonidoFondo = document.getElementById("BackgroudSound");
SonidoFondo.loop = true;
sonidoCorrecto.volume = 0.4;
sonidoIncorrecto.volume = 0.2;
sonidoSuperado.volume = 0.2;
console.log("Respuestas actuales:", respuestas + ' contador: ' + contador);

// Función para crear un controlador de carrusel
// funciones que manejan las animaciones y traslacion de los carruseles por separado
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

        currentPosition = currentIndex; // asignamos el valor de la imagen actual a la variable
        nameOfPosition = (items[currentPosition]['children'][1]).name; // asignamos el nombre de la imagen actual a la variable
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
    cambiarImagen() // llamamos a la funcion para que se actualice automaticamente cada que se recargue la pagina
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

        currentObject = currentIndex; // asigna el valor de la imagen actual en este caso del objeto
        currentObjectName = (items[currentObject]['children'][1]).name; // asigna el nombre de la imagen actual
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
///////////////////////////////////////////////////
function mostrarDatos() { // funcion que muestra el manejo de los datos
try {
    let tituloModal = document.getElementById("exampleModalLabel");
    let imagenEncontrada = document.getElementById(imagenAleatoria.nombre);
    let Asnwer = imagenAleatoria.nombre + nameOfPosition + currentObjectName; // variable que representa la respuesta dada por el usuario
    let imgCelebration = document.getElementById("celebration");
    if (CorrectAnswers.includes(Asnwer)) { // condicional que muestra si la respuesta es correcta o no
        sonidoCorrecto.play(); // Reproducir sonido correcto
        tituloModal.textContent = "¡Felicidades! Has respondido correctamente. ";
        agregarRespuesta(Asnwer); // guardar la respuesta correcta cada vez que se encuentre en session storage
        // Cambiar el contenido del <h1>
        imagenes = imagenes.filter(item => item !== imagenAleatoria);
        imagenEncontrada.style.display = "inline";
        imgCelebration.style.display = "inline";
        imgCelebration.setAttribute("src", "images/tableros/gif-animado-celebrar-cumple.gif");
        imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)]; // seleccion de una posicion 
        console.log(imagenes);
        cambiarImagen();
    } else {
        sonidoIncorrecto.play(); // Reproducir sonido de nivel superado
        imgCelebration.style.display = "inline";
        imgCelebration.setAttribute("src", "images/tableros/bduck-duck.gif");
        tituloModal.textContent = "Lo siento, esa no es la respuesta correcta.";
    }
} catch (error) {
    let tituloModal = document.getElementById("exampleModalLabel");
    let siguienteNivel  = document.getElementById("NextLevel");
    siguienteNivel.style.display="inline";
    tituloModal.textContent = "¡Felicidades! Has completado todos los niveles. 🎉🎊🎉";
    sonidoSuperado.play();
    return;
}

}

// 2. Función para agregar una nueva respuesta
function agregarRespuesta(respuesta) {

    if (!(respuestas.includes(respuesta))) {
        // Agregar la nueva respuesta al array
        respuestas.push(respuesta);
        contador++;
        // Guardar el array actualizado en localStorage
        localStorage.setItem("respuestas", JSON.stringify(respuestas));
        localStorage.setItem("contador", contador);
        console.log("Respuestas actuales:", respuestas + ' contador: ' + contador);
    } else {
        return; // si la respuesta ya esta retorna nada
    }

}

function borrarLocalStorage() {
    // Borra todos los datos del localStorage
    localStorage.clear();
    console.log("LocalStorage borrado.");
}

function cambiarImagen() { // funcion para cambiar de imagen cada que se recargue la pagina
    // Asignamos el src a la imagen
    SonidoFondo.volume = 0.2;
    SonidoFondo.play();
    document.getElementById("imageName").setAttribute("name", imagenAleatoria.nombre); // asigna la el nombre de la imagen que se debe encontrar
    document.getElementById("imageToFoud").setAttribute("src", imagenAleatoria.src); // asigna el src de la imagen que se debe encontrar
}


// Inicializar ambos carruseles
const carousel1 = document.querySelectorAll('.carousel1');
const carousel2 = document.querySelectorAll('.carousel2');
const updateFunctions1 = Array.from(carousel1).map(createCarouselController1);
const updateFunctions2 = Array.from(carousel2).map(createCarouselController2);


