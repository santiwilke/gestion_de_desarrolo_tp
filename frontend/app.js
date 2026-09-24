// Todas las llamadas pasan por Nginx (/api), que las reenvía a FastAPI
const API = "/api";

// Mensaje de bienvenida con el nombre del usuario 1
async function cargarBienvenida() {
  const saludo = document.getElementById("saludo");
  try {
    const respuesta = await fetch(API + "/usuarios/1");
    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
    const usuario = await respuesta.json();
    saludo.textContent = "¡Bienvenido/a, " + usuario.nombre + "!";
  } catch (error) {
    saludo.textContent = "No se pudo conectar con el backend";
    console.error(error);
  }
}

// Lista con todos los usuarios de la tabla
async function cargarUsuarios() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  try {
    const respuesta = await fetch(API + "/usuarios");
    const usuarios = await respuesta.json();
    usuarios.forEach(function (u) {
      const item = document.createElement("li");
      item.textContent = u.id + " · " + u.nombre + " (" + u.email + ")";
      lista.appendChild(item);
    });
  } catch (error) {
    lista.textContent = "Error al cargar los usuarios";
  }
}

function recargar() {
  cargarBienvenida();
  cargarUsuarios();
}

recargar();
