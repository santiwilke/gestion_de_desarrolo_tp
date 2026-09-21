async function cargarProductos() {
  const contenedor = document.getElementById("lista");
  contenedor.innerHTML = "Cargando...";
  try {
    const respuesta = await fetch("/api/productos");
    const productos = await respuesta.json();
    contenedor.innerHTML = productos.map(p => `
      <div class="card">
        <h3>${p.nombre}</h3>
        <p class="precio">$${p.precio}</p>
        <p class="stock">Stock: ${p.stock}</p>
      </div>
    `).join("");
  } catch (e) {
    contenedor.innerHTML = "Error al cargar: " + e;
  }
}

cargarProductos();