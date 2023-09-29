
//primera pre-entrega
//seleccionar un producto
let continuar = true;
let total = 0;

alert("Elija los productos que desea comprar. Presione ESC para finalizar la selección.");

do {
    alert("1. Coca-Cola");
    alert("2. Hamburguesa doble");
    alert("3. Hamburguesa simple");
    alert("4. Papas con cheddar");
    
    let producto = prompt("Ingrese su elección (1, 2, 3, 4) o presione ESC para finalizar:");

    if (producto === null || producto.toLowerCase() === "esc") {
        continuar = false;
    } else {
        producto = parseInt(producto);
        if (isNaN(producto) || producto < 1 || producto > 4) {
            alert("Entrada no válida. Por favor, ingrese un número válido (1, 2, 3, 4) o presione ESC para finalizar.");
        } else {
            sumaFinal(producto);
        }
    }
} while (continuar);

function sumaFinal(producto) {
    switch (producto) {
        case 1:
            total += 700; //+= acortamos codigo
            break;
        case 2:
            total += 2000;
            break;
        case 3:
            total += 1500;
            break;
        case 4:
            total += 1200;
            break;
        default:
            alert("Elección no válida, reintente.");
            break;
    }
}

alert("La suma total es de $" + total);


