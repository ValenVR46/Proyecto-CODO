document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    if (abrir) {
        abrir.addEventListener("click", () => {
            if (nav) {
                nav.classList.add("visible");
            }
        });
    }

    if (cerrar) {
        cerrar.addEventListener("click", () => {
            if (nav) {
                nav.classList.remove("visible");
            }
        });
    }

    const grande = document.querySelector(".grande");
    const puntos = document.querySelectorAll(".punto");

    if (puntos && grande) {
        puntos.forEach((punto, i) => {
            punto.addEventListener("click", () => {
                const posicion = i;
                const desplazamiento = posicion * -100;
                grande.style.transform = `translateX(${desplazamiento}%)`;

                puntos.forEach((p) => p.classList.remove("activo"));
                punto.classList.add("activo");
            });
        });
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingProduct = cart.find((item) => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartSummary();
    }

    document.querySelectorAll(".agregar-carrito").forEach((button) => {
        button.addEventListener("click", function (e) {
            e.stopPropagation();

            let productElement = this.closest(".product");
            let priceText = productElement
                .querySelector("p:last-of-type")
                .innerText.replace("Precio: $", "")
                .replace(/\./g, "");
            let price = parseFloat(priceText);
            if (isNaN(price)) {
                price = 0;
            }
            let product = {
                name: productElement.querySelector("h3").innerText,
                price: price,
                quantity: 1,
            };
            addToCart(product);
        });
    });

    function showCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartTableBody = document.querySelector("#carrito-tabla tbody");

        cartTableBody.innerHTML = "";

        let totalQuantity = 0;
        let totalPrice = 0;

        cart.forEach((product) => {
            let price = product.price != null ? product.price : 0;
            let subtotal = price * product.quantity;
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>$${price.toFixed(2)}</td>
                <td>$${subtotal.toFixed(2)}</td>
                <td>
                    <button class="eliminar-producto" data-product-name="${product.name}">Eliminar</button>
                </td>
            `;
            cartTableBody.appendChild(row);

            totalQuantity += product.quantity;
            totalPrice += subtotal;
        });

        // Eliminar filas existentes con información de totales
        let totalRows = cartTableBody.querySelectorAll(".total-row");
        totalRows.forEach(row => row.remove());

        // Agregar fila con total de productos
        let totalRow = document.createElement("tr");
        totalRow.classList.add("total-row");
        totalRow.innerHTML = `
            <td colspan="3" style="text-align: right;"><strong>Total de productos:</strong></td>
            <td colspan="2">${totalQuantity}</td>
        `;
        cartTableBody.appendChild(totalRow);

        // Agregar fila con total a pagar
        let totalPriceRow = document.createElement("tr");
        totalPriceRow.classList.add("total-row");
        totalPriceRow.innerHTML = `
            <td colspan="3" style="text-align: right;"><strong>Total a pagar:</strong></td>
            <td colspan="2">$${totalPrice.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(totalPriceRow);

        updateCartSummary();
    }

    function updateCartSummary() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalQuantity = 0;
        let totalPrice = 0;

        cart.forEach((product) => {
            if (product.price !== null && product.price !== undefined) {
                totalQuantity += product.quantity;
                totalPrice += product.price * product.quantity;
            }
        });

        let summaryElement = document.getElementById("carrito-resumen");
        if (summaryElement) {
            summaryElement.innerHTML = `
                <p>Total de productos: ${totalQuantity}</p>
                <p>Total a pagar: $${totalPrice.toFixed(2)}</p>
            `;
        }
    }

    let carritoTabla = document.getElementById("carrito-tabla");
    if (carritoTabla) {
        carritoTabla.addEventListener("click", function (e) {
            if (e.target && e.target.matches(".eliminar-producto")) {
                let productName = e.target.dataset.productName;
                removeFromCart(productName);
            }
        });
    }

    let vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener("click", clearCart);
    }

    function clearCart() {
        localStorage.removeItem("cart");
        showCart();
    }

    function removeFromCart(productName) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let updatedCart = cart.filter((product) => product.name !== productName);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        showCart();
    }

    if (document.getElementById("carrito-tabla")) {
        showCart();
    }
});
// formulario contacto
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector('form');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const datos = {
            nombre: formulario.querySelector('#name').value,
            correo: formulario.querySelector('#email').value,
            mensaje: formulario.querySelector('#message').value
        };

        localStorage.setItem('datosFormulario', JSON.stringify(datos));
        sessionStorage.setItem('datosFormulario', JSON.stringify(datos));
        window.location.href = 'respuesta.html';
    });
});



