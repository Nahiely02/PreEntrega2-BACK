class Vino {
  constructor(nombre, precio, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
  {
    id: 1,
    nombre: "Bodega Noemia Malbec 2017",
    precio: 50,
    img: "./assets/CHEVAL-DES-ANDES-Blend.png",
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "Achaval ferrer Granito 2018",
    precio: 100,
    img: "./assets/Achaval-Ferrer-Quimera-Granito.png",
    cantidad: 1,
  },
  {
    id: 3,
    nombre: "Bramare Cabernet Franc 2022",
    precio: 150,
    img: "./assets/Bramare_CabernetFranc.png",
    cantidad: 1,
  },
  {
    id: 4,
    nombre: "Calixto Pablo Merlot 2019",
    precio: 200,
    img: "./assets/CALIXTO-PABLO-CORTE-CLASICO-2018.png",
    cantidad: 1,
  },
  {
    id: 5,
    nombre: "Caro Blend 2022",
    precio: 200,
    img: "./assets/Caro_Blend.png",
    cantidad: 1,
  },
  {
    id: 6,
    nombre: "Chana punco Blend 2021",
    precio: 200,
    img: "./assets/CHANAR-PUNCO-blend.png",
    cantidad: 1,
  },
];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
  `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      carrito.forEach((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
      pintarCarrito();
    }
  });
});

const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-header-title">Carrito.</h1>
      `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="restar"> - </span>
        <p>${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${product.cantidad * product.precio} $</p>
        <span class="delete-product"> ❌ </span>
      `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      saveLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: ${total} $`;
  modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  console.log(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  carritoCounter();
  saveLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

document.addEventListener("DOMContentLoaded", function () {
  const nombreInput = document.getElementById("nombre-input");

  const agregarButton = document.getElementById("agregar-button");
  const filtroPrecioInput = document.getElementById("filtro-precio-input");
  const filtrarButton = document.getElementById("filtrar-button");
  const limpiarButton = document.getElementById("limpiar-button");
  const finalizarCompraButton = document.getElementById("finalizar-compra-button");

  // Agregar producto al carrito
  agregarButton.addEventListener("click", function () {
    const nombre = nombreInput.value;

    // Buscar el producto en la lista de productos
    const productoExistente = productos.find(producto => producto.nombre === nombre);

    if (productoExistente) {
      const repeat = carrito.some((repeatProduct) => repeatProduct.id === productoExistente.id);

      if (repeat) {
        carrito.forEach((prod) => {
          if (prod.id === productoExistente.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: productoExistente.id,
          img: productoExistente.img,
          nombre: productoExistente.nombre,
          precio: productoExistente.precio,
          cantidad: 1, // Otra opción es asignar una cantidad fija, por ejemplo, 1.
        });

        carritoCounter();
        saveLocal();
        pintarCarrito();
      }
    } else {
      console.log(`El vino ${nombre} no se encuentra en la lista de productos.`);
    }
  });

  // Filtrar productos por precio
  filtrarButton.addEventListener("click", function () {
    const precioFiltro = parseFloat(filtroPrecioInput.value);

    if (!isNaN(precioFiltro)) {
      const productosFiltrados = productos.filter(producto => producto.precio <= precioFiltro);
      // Puedes utilizar los productos filtrados como necesites, por ejemplo, mostrarlos en la interfaz.
      console.log(productosFiltrados);
    } else {
      alert("Por favor, introduce un valor numérico para el filtro de precio.");
    }
  });

  // Limpiar el carrito
  limpiarButton.addEventListener("click", function () {
    carrito = [];
    saveLocal();
    pintarCarrito(); // Actualizar la interfaz del carrito
  });

  // Finalizar compra
  finalizarCompraButton.addEventListener("click", function () {
    // Puedes agregar aquí la lógica para finalizar la compra, por ejemplo, enviar la información al servidor, etc.
    console.log("Compra finalizada");
  });
});
