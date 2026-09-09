let animalesArray = [];
let imagenAleatoria = {};
let nombreAnimales = ['gato', 'raton', 'oso', 'rana', 'ave']
let animalBuscado = document.getElementById("imageToFoud2");
let tituloModal = document.getElementById("exampleModalLabel");
let imagenModal = document.getElementById("celebration");
let siguienteNivel = document.getElementById("NextLevel");
const celdas = document.querySelectorAll('.celda');
const tablero = document.getElementById("Tablero");
const contenedorImagen = document.getElementById("contenedorImagen");
const contenedorTablero = document.getElementById("contenedor-tablero");



const reproducirSonido = (resultado) => {
    const reproductor = document.getElementById(resultado);
    reproductor.volume = 0.2
    reproductor.play()
}

const mostrarModal = (tipoRespuesta = 'Correcta' | 'Incorrecta' | 'Superado') => {
    if (tipoRespuesta === 'Superado') {
        tituloModal.textContent = "¡Felicidades! Has completado el nivel. 🎉🎊🎉";
        imagenModal.setAttribute("src", "images/tableros/respuestaCorrecta.gif");
        return;
    }
    if (tipoRespuesta === 'Incorrecta') tituloModal.textContent = "Lo siento, esa no es la respuesta correcta.";
    if (tipoRespuesta === 'Correcta') tituloModal.textContent = "¡Felicidades! Has respondido correctamente.";
    imagenModal.setAttribute("src", `images/tableros/respuesta${tipoRespuesta}.gif`);

}

const crearAnimalesArray = () => {
    nombreAnimales.forEach((animalNombre) => {
        animalesArray.push({
            nombre: animalNombre,
            src: `/images/animales/${animalNombre}Celular.png`
        })
    })
}


const seleccionarAnimalAleatorio = () => {
    console.log(animalesArray);
    if (animalesArray.length === 0) return false
    return animalesArray[Math.floor(Math.random() * animalesArray.length)]
}

const inicializarPrimerAnimal = () => {
    animalBuscado.setAttribute("src", imagenAleatoria.src);
}

function cambiarImagen() {
    document.getElementById(imagenAleatoria.nombre).style.display = 'block';
    animalesArray = animalesArray.filter(item => item !== imagenAleatoria);
    imagenAleatoria = seleccionarAnimalAleatorio();
    console.log('valor: ', imagenAleatoria);
    animalBuscado.setAttribute("src", imagenAleatoria.src);
}

const agregarClaseCelda = () => {
    celdas.forEach(celda => {
        celda.addEventListener('click', mostrarDatosTablero);
        celda.setAttribute('data-bs-toggle', 'modal');
        celda.setAttribute('data-bs-target', '#exampleModal');
        celda.style.cursor = 'pointer'
    });
}

(() => {
    agregarClaseCelda()
    crearAnimalesArray();
    imagenAleatoria = seleccionarAnimalAleatorio();
    inicializarPrimerAnimal()
}
)()

let animalEncontrado = document.getElementById(imagenAleatoria.nombre)
function mostrarDatosTablero(event) {
    let elemento = event.target;
    let esRespuestaCorrecta = elemento.classList.contains(imagenAleatoria.nombre)

    if (animalesArray.length === 0) {
        siguienteNivel = document.getElementById("NextLevel");
        siguienteNivel.style.display = "inline";
        mostrarModal('Superado')
        reproducirSonido("sonidoSuperado");
        console.log(error);
    }
    if (esRespuestaCorrecta) {
        reproducirSonido("sonidoCorrecto");
        mostrarModal('Correcta')
        cambiarImagen();
    }
    if (!esRespuestaCorrecta) {
        reproducirSonido("sonidoIncorrecto");
        imagenModal.style.display = "inline";
        mostrarModal('Incorrecta')
    }


}
