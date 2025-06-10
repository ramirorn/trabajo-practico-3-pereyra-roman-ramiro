// Url base de la API
const urlDragonBall = "https://dragonball-api.com/api/characters?limit=100";
// Elementos del DOM 
const botonBuscar = document.getElementById("btn-buscar");
const inputBusqueda = document.getElementById("input-busqueda");
let todosLosPersonajes = []; // Aquí se almacenarán todos los personajes

// Contactar con la API
const cargarDatos = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error en la API");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error al cargar datos:", error);
        return null; // en caso de que no se puedan obtener los personajes
    }
};


// Funcion para renderizar personajes
function renderizarPersonajes(personajes) {
    const contenedor = document.getElementById("contenedor-personajes");
    contenedor.innerHTML = " ";

    // Por cada personaje crea una carta con su informacion
    if (personajes && personajes.length > 0) { // Asegura que haya personajes
        personajes.forEach(personaje => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "card m-3";
            tarjeta.style.width = "18rem";

            tarjeta.innerHTML = `
            <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}">
            <div class="card-body">
            <h5 class="card-title">${personaje.name} </h5>
            <p class="card-text"><strong>Raza:</strong>${personaje.race || "Desconocida"}</p>
            <p class="card-text"><strong>Genero:</strong>${personaje.gender || "Desconocido"}</p>
            </div>
            `;

            contenedor.appendChild(tarjeta); //asigna las tarjetas como hijos del contenedor principal
        });
    } else {
        // Muestra este mensaje si no hay personajes para renderizar
        mostrarMensaje("No se encontraron personajes que coincidan con la busqueda");
    }
}

// Permite crear un mensaje en las tarjetas
function mostrarMensaje(mensaje) {
    const contenedor = document.getElementById("mensaje-error");
    contenedor.textContent = mensaje;
}

botonBuscar.addEventListener("click", (e) => {
    e.preventDefault(); // Evita que la pagina se recargue
    const termino = inputBusqueda.value.trim().toLowerCase();

    mostrarMensaje(""); // Limpia los mensajes anteriores

    if (termino === "") {
        mostrarMensaje("Por favor ingresa un nombre dentro de la lista de personajes");
        renderizarPersonajes(todosLosPersonajes); // Muestra todos los personajes si el campo está vacío
        return;
    }

    const personajesFiltrados = todosLosPersonajes.filter(personaje =>
        personaje.name.toLowerCase().includes(termino)
    );

    if (personajesFiltrados.length > 0) {
        renderizarPersonajes(personajesFiltrados);
    } else {
        mostrarMensaje("No se encontraron personajes con ese nombre");
    }
});


// Trae los datos de la API, los guarda y renderiza la lista inicial
cargarDatos(urlDragonBall).then(data => {
    if (data && data.items && data.items.length > 0) {
        todosLosPersonajes = data.items; // Se guardan todos los personajes
        renderizarPersonajes(todosLosPersonajes); // Y se renderizan
    } else {
        mostrarMensaje("No se encontraron personajes");
    }
});