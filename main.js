
//tercera pre-entrega CARRITO DE COMPRAS DE UNA VINOTECA
/* Defininimos el  objeto Vino*/
function Vino(nombre, precio, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
}

// Definimos el objeto CarritoDeCompras
function Carrito() {
    this.vinos = [];

    this.agregarVino = function(vino) {
        this.vinos.push(vino);
        this.guardarCarritoEnLocalStorage(); // Guardar el carrito en localStorage al agregar un vino
    };

    this.filtrarPorPrecio = function(precioMaximo) {
        return this.vinos.filter(vino => vino.precio <= precioMaximo);
    };

    this.calcularTotal = function() {
        return this.vinos.reduce((total, vino) => total + vino.precio * vino.cantidad, 0);
    };

    this.mostrarCarrito = function() {
        const carritoContainer = document.getElementById("carrito-container");
        carritoContainer.innerHTML = ""; // Limpiar el contenido anterior

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
}

const carrito = new Carrito();
carrito.cargarCarritoDesdeLocalStorage();

function agregarProducto() {
    const nombre = prompt("Nombre del vino: ");
    const precio = parseFloat(prompt("Precio del vino: "));
    const cantidad = parseInt(prompt("Cantidad: "));

    const vino = new Vino(nombre, precio, cantidad);
    carrito.agregarVino(vino);
    console.log(`"${nombre}" se agregó al carrito.`);
    mostrarMenu();
}

function mostrarMenu() {
    console.log("1. Agregar bebida");
    console.log("2. Mostrar carrito");
    console.log("3. Filtrar por precio");
    console.log("4. Calcular el total del carrito");
    console.log("5. Salir");

    const opcion = prompt("Seleccione una opción: ");
    switch (opcion) {
        case '1':
            agregarProducto();
            break;
        case '2':
            carrito.mostrarCarrito();
            mostrarMenu();
            break;
        case '3':
            const precioMaximo = parseFloat(prompt("Filtrar productos por precio igual o menor a: "));
            const vinosFiltrados = carrito.filtrarPorPrecio(precioMaximo);
            console.log(`Vinos con precio igual o menor a $${precioMaximo}:`);
            vinosFiltrados.forEach(vino => {
                console.log(`${vino.nombre} - Precio: $${vino.precio}`);
            });
            mostrarMenu();
            break;
        case '4':
            const total = carrito.calcularTotal();
            console.log(`Total: $${total}`);
            mostrarMenu();
            break;
        case '5':
            break;
        default:
            console.log("Por favor, seleccione una opción válida.");
            mostrarMenu();
    }
}

mostrarMenu();
