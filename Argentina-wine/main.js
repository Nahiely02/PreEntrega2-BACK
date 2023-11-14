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
let productos = [];

const getProducts = async () => {
  const response = await fetch("data.json");
  const data = await response.json();

  productos = data;

  data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h4>
      <p class="price">$ ${product.precio}</p>
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
          cantidad: 1,
        });
        console.log(carrito);
        console.log(carrito.length);
        carritoCounter();
        saveLocal();
        pintarCarrito();
      }
    });
  });
};

getProducts();

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
        <h6>${product.nombre}</h6>
        <p>$ ${product.precio}</p>
        <span class="restar"> - </span>
        <p>${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: $ ${product.cantidad * product.precio}</p>
        <span class="delete-product"> ❌ </span>
      `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      saveLocal();
      carritoCounter();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      carritoCounter();
      pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
      carritoCounter();
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: $ ${total} `;
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
  cantidadCarrito.style.display = "block"; ///

  const carritoLength = carrito.reduce((acc, el) => acc + el.cantidad, 0);

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};


const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Sección de los botones
document.addEventListener("DOMContentLoaded", function () {
  const nombreInput = document.getElementById("nombre-input");
  const agregarButton = document.getElementById("agregar-button");
  const filtroPrecioInput = document.getElementById("filtro-precio-input");
  const limpiarButton = document.getElementById("limpiar-button");
  const finalizarCompraButton = document.getElementById("finalizar-compra-button");

  // Filtrar por precio
  const mostrarProductos = (productos) => {
    shopContent.innerHTML = "";
    productos.forEach((product) => {
      let content = document.createElement("div");
      content.className = "card";
      content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h4>
        <p class="price">${product.precio} $</p>
      `;

      shopContent.append(content);

      let comprar = document.createElement("button");
      comprar.innerText = "comprar";
      comprar.className = "comprar";

      content.append(comprar);

      comprar.addEventListener("click", () => {
        // ... (agregar al carrito)
      });
    });
  };

  // Agregamos un evento al campo de entrada de precio
  filtroPrecioInput.addEventListener("input", () => {
    // Obtener el valor actual del campo
    const precioFiltrado = parseFloat(filtroPrecioInput.value);

    // Verifica si el valor es un número
    if (!isNaN(precioFiltrado)) {
      // Filtrar los productos según el precio ingresado
      const productosFiltrados = productos.filter((producto) => producto.precio <= precioFiltrado);
      mostrarProductos(productosFiltrados);
    } else {
      // Si el valor no es un número, mostrar todos los productos
      mostrarProductos(productos);
    }
  });

  // Limpiar carrito
  limpiarButton.addEventListener("click", () => {
    Swal.fire({
      title: "Limpiar Carrito",
      text: "¿Estás seguro que deseas limpiar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        carrito = [];
        saveLocal();
        pintarCarrito();
        Swal.fire("Carrito vacio", "", "success");
      }
    });
  });






 // Finalizar compra
 finalizarCompraButton.addEventListener("click", () => {
  // Verificar si el carrito no está vacío antes de intentar finalizar la compra
  if (carrito.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Carrito Vacío",
      text: "Agrega productos al carrito antes de finalizar la compra.",
    });
    return; // Detener la ejecución si el carrito está vacío
  }

  // Pide el correo electrónico al usuario
  Swal.fire({
    title: "Ingrese su email para recibir la factura de su compra",
    input: "email",
    inputPlaceholder: "ejemplo@email.com",
    showCancelButton: true,
    confirmButtonText: "Enviar",
  }).then((result) => {
    if (result.isConfirmed) {
      const email = result.value;

      // Muestra un mensaje de "Gracias por su compra" durante 3 segundos
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Gracias por su compra",
        showConfirmButton: false,
        timer: 3000,
      });

      // Puedes hacer algo con el correo electrónico, como enviarlo al servidor, etc.
      console.log(`Correo electrónico: ${email}`);
    }
  });
});



  // Agregar productos
  const manejarBusqueda = () => {
    nombreInput.addEventListener("input", () => {
      const textoBusqueda = nombreInput.value.toLowerCase();
      const sugerencias = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBusqueda)
      );
      mostrarSugerencias(sugerencias);
    });
  };

  const mostrarSugerencias = (sugerencias) => {
    const sugerenciasContainer = document.getElementById("sugerencias");
    sugerenciasContainer.innerHTML = "";

    if (sugerencias.length === 0) {
      const sinCoincidencias = document.createElement("div");
      sinCoincidencias.innerText = "No está disponible";
      sugerenciasContainer.appendChild(sinCoincidencias);
    } else {
      sugerencias.forEach((producto) => {
        const sugerenciaElemento = document.createElement("div");
        sugerenciaElemento.classList.add("sugerencia"); // Agregar la clase "sugerencia"
        sugerenciaElemento.innerHTML = `
          <span>${producto.nombre}</span>
        `;
        sugerenciasContainer.appendChild(sugerenciaElemento);

        // Agregamos evento de clic al elemento sugerido
        sugerenciaElemento.addEventListener("click", () => {
          manejarSeleccionProducto(producto);
        });
      });
    }
  };

  const manejarSeleccionProducto = (producto) => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === producto.id);

    if (repeat) {
      carrito.forEach((prod) => {
        if (prod.id === producto.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: producto.id,
        img: producto.img,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      });
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
      pintarCarrito();
    }

    // Limpiar sugerencias después de seleccionar un producto
    const sugerenciasContainer = document.getElementById("sugerencias");
    sugerenciasContainer.innerHTML = "";
  };

  manejarBusqueda();
});

