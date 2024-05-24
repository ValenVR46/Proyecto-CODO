// Seleccionar el contenedor grande del carrusel
const carruselGrande = document.querySelector('.grande');
// Seleccionar las imágenes dentro del carrusel
const imagenes = carruselGrande.querySelectorAll('.img');
// Seleccionar los puntos
const puntos = document.querySelectorAll('.punto');

// Variable para almacenar el índice de la imagen actual
let indiceImagenActual = 0;

// Función para cambiar la imagen actual del carrusel
function cambiarImagen() {
    // Calcular la posición X para la siguiente imagen
    const nuevaPosicion = -indiceImagenActual * 100 / imagenes.length + '%';

    // Mover el carrusel al siguiente índice de imagen
    carruselGrande.style.transform = 'translateX(' + nuevaPosicion + ')';

    // Actualizar los puntos
    puntos.forEach((punto, index) => {
        punto.classList.toggle('activo', index === indiceImagenActual);
    });

    // Actualizar el índice de la imagen actual para la siguiente iteración
    indiceImagenActual++;

    // Si hemos alcanzado el final del carrusel, volver al inicio
    if (indiceImagenActual >= imagenes.length) {
        indiceImagenActual = 0;
    }
}

// Función para iniciar la animación del carrusel automáticamente
function iniciarCarruselAutomatico() {
    // Cambiar la imagen cada 3 segundos (3000 milisegundos)
    setInterval(cambiarImagen, 3000);
}

// Llamar a la función para iniciar el carrusel automáticamente
iniciarCarruselAutomatico();
