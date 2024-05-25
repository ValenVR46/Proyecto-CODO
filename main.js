// Manejo del menú de navegación
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

// Manejo del carrusel
const grande = document.querySelector('.grande');
const puntos = document.querySelectorAll('.punto');

// Cuando CLICK en punto
// Saber la posición de ese punto
// Aplicar un transform translateX al grande
// QUITAR la clase activo de TODOS puntos
// AÑADIR la clase activo al punto que hemos hecho CLICK

// Recorrer TODOS los puntos
puntos.forEach((punto, i) => {
    punto.addEventListener('click', () => {
        const posicion = i;
        const desplazamiento = posicion * -100;
        grande.style.transform = `translateX(${desplazamiento}%)`;

        puntos.forEach(p => p.classList.remove('activo'));
        punto.classList.add('activo');
    });
});

// Función para agregar un producto al carrito
function addToCart(product) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    var existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Producto agregado al carrito");
    updateCartSummary();
}

// Manejo de eventos de clic en los botones "Agregar al carrito"
document.querySelectorAll(".agregar-carrito").forEach(button => {
    button.addEventListener("click", function(e) {
        e.stopPropagation();

        var productElement = this.closest(".product");
        var product = {
            name: productElement.querySelector("h3").innerText,
            price: parseFloat(productElement.querySelector("p").innerText.replace("Precio: ", "").replace("$", "")),
            quantity: 1
        };
        addToCart(product);
    });
});

// Función para mostrar los productos en el carrito
function showCart() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var cartList = document.getElementById("carrito-lista");

    cartList.innerHTML = "";

    cart.forEach(product => {
        var listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>Producto: ${product.name}</span>
            <span>Cantidad: ${product.quantity}</span>
            <span>Precio unitario: $${product.price.toFixed(2)}</span>
            <button class="eliminar-producto" data-product-name="${product.name}">Eliminar</button>
        `;
        cartList.appendChild(listItem);
    });

    updateCartSummary();
}

// Función para actualizar el resumen del carrito
function updateCartSummary() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var totalQuantity = 0;
    var totalPrice = 0;

    cart.forEach(product => {
        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
    });

    var summaryElement = document.getElementById("carrito-resumen");
    if (summaryElement) {
        summaryElement.innerHTML = `
            <p>Total de productos: ${totalQuantity}</p>
            <p>Total a pagar: $${totalPrice.toFixed(2)}</p>
        `;
    }
}

// Mostrar los productos en el carrito si estamos en la página del carrito
if (document.getElementById("carrito-lista")) {
    showCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var updatedCart = cart.filter(product => product.name !== productName);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    showCart(); // Actualizar la vista del carrito después de eliminar un producto
}

// Manejo de eventos de clic en los botones "Eliminar" del carrito
document.getElementById("carrito-lista").addEventListener("click", function(e) {
    if (e.target && e.target.matches(".eliminar-producto")) {
        var productName = e.target.dataset.productName;
        removeFromCart(productName);
    }
});

// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem("cart");
    showCart(); // Actualizar la vista del carrito después de vaciarlo
}

// Manejo de eventos de clic en el botón "Vaciar carrito"
document.getElementById("vaciar-carrito").addEventListener("click", clearCart);


