// Fetch de películas desde una API simulada
fetch('https://api.example.com/peliculas')
  .then(res => res.json())
  .then(data => mostrarPeliculas(data));

function mostrarPeliculas(peliculas) {
  const contenedor = document.querySelector('.productos');
  peliculas.forEach(pelicula => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${pelicula.imagen}" alt="${pelicula.titulo}" />
      <h3>${pelicula.titulo}</h3>
      <p>Precio: $${pelicula.precio}</p>
      <button onclick="agregarAlCarrito('${pelicula.id}')">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

// Carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id) {
  const producto = carrito.find(p => p.id === id);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ id, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
}

function actualizarContador() {
  const contador = document.querySelector('#contador');
  contador.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
}

// Validación de formulario
document.querySelector('form').addEventListener('submit', e => {
  const email = e.target.email.value;
  if (!email.includes('@')) {
    e.preventDefault();
    alert('Correo inválido');
  }
});

