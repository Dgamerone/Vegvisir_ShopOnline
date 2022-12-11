const productos = [
  {
    id: "buzos-01",
    titulo: "Buzos 01",
    imagen: "./image/Buzos_Vegvisir_Todos.png",
    categoria: {
      nombre: "Buzos",
      id: "buzos",
    },
    precio: 3900,
  },

  {
    id: "buzos-02",
    titulo: "Buzos 02",
    imagen: "./image/Buzos_Vegvisir_Todos.png",
    categoria: {
      nombre: "Buzos",
      id: "buzos",
    },
    precio: 3900,
  },

  {
    id: "jogging-01",
    titulo: "Jogging 01",
    imagen: "./image/Joggings_Todos.png",
    categoria: {
      nombre: "Jogging",
      id: "jogging",
    },
    precio: 2900,
  },

  {
    id: "jogging-02",
    titulo: "Jogging 02",
    imagen: "./image/Joggings_Todos.png",
    categoria: {
      nombre: "Jogging",
      id: "jogging",
    },
    precio: 2900,
  },
];

// DOM

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
       <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
             <p class="producto-precio">$${producto.precio}</p>
             <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>

       `;
    contenedorProductos.append(div);
  });

    actualizarBotonesAgregar();
    
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach(boton => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(
        producto => producto.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;

      const productosBoton = productos.filter(
        producto => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los Productos";
      cargarProductos(productos);
    }
  });
});


// Agregar al carrito

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

// const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else{
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {

  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(producto => producto.id === idBoton);

  if(productosEnCarrito.some(producto => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;

  }else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumerito();
  
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numerito.innerText = nuevoNumerito;
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
