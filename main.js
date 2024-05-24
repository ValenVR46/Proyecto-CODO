const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

'use strict'

const grande = document.querySelector('.grande')
const punto = document.querySelectorAll('.punto')

// Cuando CLICK en punto
// Saber la posición de ese punto
// Aplicar un transform translateX al grande
// QUITAR la clase activo de TODOS puntos
// AÑADIR la clase activo al punto que hemos hecho CLICK

// Recorrer TODOS los punto
punto.forEach((cadaPunto, i) => {
    // Asignamos un CLICK a cadaPunto
    punto[i].addEventListener('click', () => {

        // Guardar la posición de ese PUNTO
        let posicion = i
        // Calculando el espacio que debe DESPLAZARSE el GRANDE
        let operacion = posicion * -100 / 7;

        // MOVEMOS el grand
        grande.style.transform = `translateX(${operacion}%)`;

        // Recorremos TODOS los punto
        punto.forEach((cadaPunto, i) => {
            // Quitamos la clase ACTIVO a TODOS los punto
            punto[i].classList.remove('activo')
        })
        // Añadir la clase activo en el punto que hemos hecho CLICK
        punto[i].classList.add('activo')

    })
})

document.addEventListener('DOMContentLoaded', () => {
    console.log("El DOM ha sido cargado correctamente.");
    function agregarAlCarrito(boton) {
        console.log("Se ha hecho clic en el botón");
        const producto = boton.closest('.product');
        console.log("Contenedor del producto:", producto);
        const nombre = producto.querySelector('h3').innerText;
        const precio = producto.querySelector('p:last-of-type').innerText;
        console.log("Nombre del producto:", nombre);
        console.log("Precio del producto:", precio);

        const nuevoItem = document.createElement('li');
        nuevoItem.innerHTML = `
            <span>Producto: ${nombre}</span>
            <span>Cantidad: 1</span>
            <span>Precio unitario: ${precio}</span>
        `;
        console.log("Nuevo item:", nuevoItem);

        // Mover la declaración de carrito dentro de la función agregarAlCarrito
        const carrito = document.getElementById('carrito');
        console.log("Contenedor del carrito:", carrito);
        if (!carrito) {
            console.error("No se encontró el contenedor del carrito");
            return;
        }

        const listaCarrito = carrito.querySelector('#carrito-lista');
        listaCarrito.appendChild(nuevoItem);
        localStorage.setItem('carrito', listaCarrito.innerHTML);

    }


    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    botonesAgregar.forEach((boton) => {
        boton.addEventListener('click', () => {
            agregarAlCarrito(boton);
        });
    });
});
