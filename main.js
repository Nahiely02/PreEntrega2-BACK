
//tercera pre-entrega CARRITO DE COMPRAS DE UNA VINOTECA
/* Defininimos el  objeto Vino*/
function Vino(nombre, precio, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
}

function Carrito() {
    this.vinos = []; //array

    this.agregarVino = function(vino) {
        this.vinos.push(vino);
        this.guardarCarritoEnLocalStorage();
    };

    this.filtrarPorPrecio = function(precioMaximo) {
        return this.vinos.filter(vino => vino.precio <= precioMaximo);
    };

    this.calcularTotal = function() {
        return this.vinos.reduce((total, vino) => total + vino.precio * vino.cantidad, 0);
    };

    this.mostrarCarrito = function() {
        const carritoContainer = document.getElementById("carrito-container");
        carritoContainer.innerHTML = "";

        const carritoList = document.createElement("ul");
        carritoList.className = "carrito-list";
        this.vinos.forEach(vino => {
            const vinoItem = document.createElement("li");
            vinoItem.textContent = `${vino.nombre} - Cantidad: ${vino.cantidad} - Precio: $${vino.precio}`;
            carritoList.appendChild(vinoItem);
        });
        carritoContainer.appendChild(carritoList);
    };

    this.guardarCarritoEnLocalStorage = function() {
        localStorage.setItem("carrito", JSON.stringify(this.vinos));
    };

    this.cargarCarritoDesdeLocalStorage = function() {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            this.vinos = JSON.parse(carritoGuardado);
        }
    };

    this.limpiarCarrito = function() {
        this.vinos = [];
        this.guardarCarritoEnLocalStorage();
        console.log("Se vació el carrito")
    }
}

const carrito = new Carrito();
carrito.cargarCarritoDesdeLocalStorage();

function agregarProducto() {
    const nombre = document.getElementById("nombre-input").value;
    const precio = parseFloat(document.getElementById("precio-input").value);
    const cantidad = parseInt(document.getElementById("cantidad-input").value);

    if (nombre && !isNaN(precio) && !isNaN(cantidad) && precio > 0 && cantidad > 0) {
        const vino = new Vino(nombre, precio, cantidad);
        carrito.agregarVino(vino);
        console.log(`"${nombre}" se agregó al carrito.`);
        document.getElementById("nombre-input").value = "";
        document.getElementById("precio-input").value = "";
        document.getElementById("cantidad-input").value = "";
    } else {
        console.log("Por favor, complete todos los campos correctamente y asegúrese de que el precio y la cantidad sean números positivos.");
    }
}

function filtrarPorPrecio() {
    const precioMaximo = parseFloat(document.getElementById("filtro-precio-input").value);

    if (!isNaN(precioMaximo)) {
        const vinosFiltrados = carrito.filtrarPorPrecio(precioMaximo);
        console.log(`Vinos con precio igual o menor a $${precioMaximo}:`);
        vinosFiltrados.forEach(vino => {
            console.log(`${vino.nombre} - Precio: $${vino.precio}`);
        });
    } else {
        console.log("Ingrese un precio válido.");
    }
}

function calcularTotalCarrito() {
    const total = carrito.calcularTotal();
    console.log(`Total: $${total}`);
}

document.getElementById("agregar-button").addEventListener("click", agregarProducto);
document.getElementById("filtrar-button").addEventListener("click", filtrarPorPrecio);
document.getElementById("total-button").addEventListener("click", calcularTotalCarrito);
document.getElementById("limpiar-button").addEventListener("click", function() {
    carrito.limpiarCarrito(); // Limpia el carrito
});

