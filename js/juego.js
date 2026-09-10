let animalesArray = [];
let imagenAleatoria = {};

const nombreAnimales = ['gato', 'raton', 'oso', 'rana', 'ave'];

const animalBuscado = document.getElementById("imageToFoud2");
const tituloModal = document.getElementById("exampleModalLabel");
const imagenModal = document.getElementById("celebration");
const siguienteNivel = document.getElementById("NextLevel");

const celdas = document.querySelectorAll('.celda');

const tablero = document.getElementById("Tablero");
const contenedorImagen = document.getElementById("contenedorImagen");
const contenedorTablero = document.getElementById("contenedor-tablero");


/* =========================
   SONIDOS
========================= */

const reproducirSonido = (resultado) => {
    const reproductor = document.getElementById(resultado);
    reproductor.volume = 0.2;
    reproductor.play();
};


/* =========================
   MODAL / RESULTADOS
========================= */

const mostrarResultado = (tipoRespuesta) => {
    const respuestas = {
        Correcta: {
            titulo: '¡Felicidades! Has respondido correctamente.',
            imagen: 'images/tableros/respuestaCorrecta.gif',
            sonido: 'sonidoCorrecto'
        },

        Incorrecta: {
            titulo: 'Lo siento, esa no es la respuesta correcta.',
            imagen: 'images/tableros/respuestaIncorrecta.gif',
            sonido: 'sonidoIncorrecto'
        },

        Superado: {
            titulo: '¡Felicidades! Has completado el nivel. 🎉🎊🎉',
            imagen: 'images/tableros/respuestaCorrecta.gif',
            sonido: 'sonidoSuperado'
        }
    };
    const respuesta = respuestas[tipoRespuesta];
    if (!respuesta) {
        console.error(`Tipo de respuesta no válido: ${tipoRespuesta}`);
        return;
    }

    tituloModal.textContent = respuesta.titulo;
    imagenModal.setAttribute("src", respuesta.imagen);
    imagenModal.style.display = 'inline';
    reproducirSonido(respuesta.sonido);
};


/* =========================
   CREACIÓN DE ANIMALES
========================= */

const crearAnimalesArray = () => {

    nombreAnimales.forEach((animalNombre) => {
        animalesArray.push({
            nombre: animalNombre,
            src: `/images/animales/${animalNombre}Celular.png`
        });

    });

};


/* =========================
   SELECCIONAR ANIMAL
========================= */

const seleccionarAnimalAleatorio = () => {

    if (animalesArray.length === 0) {
        return null;
    }

    const posicionAleatoria = Math.floor(
        Math.random() * animalesArray.length
    );

    return animalesArray[posicionAleatoria];
};


/* =========================
   MOSTRAR PRIMER ANIMAL
========================= */

const inicializarPrimerAnimal = () => {
    if (!imagenAleatoria) return;
    animalBuscado.setAttribute("src", imagenAleatoria.src);
};


/* =========================
   CAMBIAR ANIMAL
========================= */

const cambiarImagen = () => {

    const animalEncontrado = document.getElementById(
        imagenAleatoria.nombre
    );

    if (animalEncontrado) {
        animalEncontrado.style.display = 'block';
    }

    animalesArray = animalesArray.filter(
        animal => animal !== imagenAleatoria
    );

    if (animalesArray.length === 0) {
        siguienteNivel.style.display = 'inline';
        mostrarResultado('Superado');
        return;
    }

    imagenAleatoria = seleccionarAnimalAleatorio();

    animalBuscado.setAttribute("src", imagenAleatoria.src);

};


/* =========================
   EVENTOS DE LAS CELDAS
========================= */

const agregarEventosCeldas = () => {

    celdas.forEach((celda) => {
        celda.addEventListener('click', mostrarDatosTablero);
        celda.setAttribute('data-bs-toggle', 'modal');
        celda.setAttribute('data-bs-target', '#exampleModal');
    });

};


/* =========================
   RESPUESTA DEL USUARIO
========================= */

function mostrarDatosTablero(event) {
    const elemento = event.currentTarget;
    const esRespuestaCorrecta = elemento.classList.contains(imagenAleatoria.nombre);

    if (!esRespuestaCorrecta) {
        mostrarResultado('Incorrecta');
        return;
    }

    mostrarResultado('Correcta');
    cambiarImagen();

}


/* =========================
   INICIALIZACIÓN
========================= */

(() => {

    agregarEventosCeldas();
    crearAnimalesArray();
    imagenAleatoria = seleccionarAnimalAleatorio();
    inicializarPrimerAnimal();

})();