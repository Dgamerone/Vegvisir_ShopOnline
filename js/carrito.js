let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const containerCarritoVacio = document.querySelector("#carrito-vacio");
const containerCarritoProductos = document.querySelector("#carrito-productos");
const containerCarritoAcciones = document.querySelector("#carrito-acciones");
const containerCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const containerTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    containerCarritoVacio.classList.add("disabled");
    containerCarritoProductos.classList.remove("disabled");
    containerCarritoAcciones.classList.remove("disabled");
    containerCarritoComprado.classList.add("disabled");

    containerCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
              <img class="carrito-producto-imagen" src="${
                producto.imagen
              }" alt="${producto.titulo}">
              <div class="carrito-producto-titulo">
                  <small>Titulo</small>
                  <h3>${producto.titulo}</h3>
              </div>
              <div class="carrito-producto-cantidad">
                  <small>Cantidad</small>
                  <p>${producto.cantidad}</p>
              </div>
              <div class="carrito-producto-precio">
                  <small>Precio</small>
                  <p>${producto.precio}</p>
              </div>
              <div class="carrito-producto-subtotal">
                  <small>Subtotal</small>
                  <p>${
                    producto.precio * producto.cantidad
                  }</p>                            
              </div>
              <button class="carrito-producto-eliminar" id="${
                producto.id
              }"><i class="bi bi-trash3-fill"></i></button>       
          
          `;

      containerCarritoProductos.append(div);
    });
  } else {
    containerCarritoVacio.classList.remove("disabled");
    containerCarritoProductos.classList.add("disabled");
    containerCarritoAcciones.classList.add("disabled");
    containerCarritoComprado.classList.add("disabled");
  }

  actualizarBotonesEliminar();
  actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelcarrito);
  });
}

function eliminarDelcarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idBoton
  );
  productosEnCarrito.splice(index, 1);
  cargarProductosCarrito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
  cargarProductosCarrito();
}

function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );

  containerCarritoVacio.classList.add("disabled");
  containerCarritoProductos.classList.add("disabled");
  containerCarritoAcciones.classList.add("disabled");
  containerCarritoComprado.classList.remove("disabled");
}

// FETCH

const urlFrases = "https://api.chucknorris.io/jokes/random";
const textoFrase = document.querySelector("#texto-frase");

fetch(urlFrases)
	.then((response) => response.json())
  .then((data) => {
    console.log(data);
    textoFrase.innerHTML = `
    <ul id="texto-frase">${data.value}</ul>   
    `
  })
