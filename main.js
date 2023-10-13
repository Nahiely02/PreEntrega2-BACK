
//segunda pre-entrega
/* Defininimos el  objeto Vino*/
function Vino(nombre, precio, cantidad) { /*le agregamos 3 propiedades*/
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
}

// Definimos el objeto CarritoDeCompras
function Carrito() {
    this.vinos = []; /*le agregamos una propiedad de tipo array*/

    // Agregar un vino al carrito
    this.agregarVino = function(vino) {
        this.vinos.push(vino); /* push: agregar vino*/
    };

    // Filtrar vinos por precio
    this.filtrarPorPrecio = function(precioMaximo) {
        return this.vinos.filter(vino => vino.precio <= precioMaximo);/*utilizamos una funcion flecha para filtrar por precio*/
    };

    // Calcular el total del carrito
    this.calcularTotal = function() {
        return this.vinos.reduce((total, vino) => total + vino.precio * vino.cantidad, 0);
    };

    // Mostrar el contenido del carrito
    this.mostrarCarrito = function() {
        console.log("Contenido del carrito de compras:");
        this.vinos.forEach(vino => {
            console.log(`${vino.nombre} - Cantidad: ${vino.cantidad} - Precio: $${vino.precio}`);
        });
        console.log(`Total: $${this.calcularTotal()}`);
    };
}

const carrito = new Carrito();

function agregarProducto() {
    const nombre = prompt("Nombre del vino: ");
    const precio = parseFloat(prompt("Precio del vino: "));
    const cantidad = parseInt(prompt("Cantidad: "));

    const vino = new Vino(nombre, precio, cantidad);
    carrito.agregarVino(vino);
    console.log(`"${nombre}" se agrego al carrito.`);
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




