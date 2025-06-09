const urlDragonBall = "https://dragonball-api.com/api/characters";
const botonBuscar = document.getElementById("btn-buscar"); 


//Contactar con la API
const cargarDatos = async (url) => {
    try {
        const response = await fetch(urlDragonBall);

        if (!response.ok) {
            throw new Error("Error en la API");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};


// Funcion para renderizar personajes
function renderizarPersonajes(personajes) {
    const contenedor = document.getElementById("contenedor-personajes");
    contenedor.innerHTML = " ";

    // Por cada personaje crea una carta con su informacion
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
}

// Permite crear un mensaje en las tarjetas
function mostrarMensaje(mensaje) {
  const contenedor = document.getElementById("mensaje-error");
  contenedor.textContent = mensaje;
}


//Trae los datos de la API y solo toma los items de data 
cargarDatos(urlDragonBall).then(data => {
    if (data && data.items && data.items.length > 0) {
        renderizarPersonajes(data.items);
    } else {
        mostrarMensaje("No se encontraron personajes."); // Se muestra este mensaje en caso de no encontrar personajes
    }
});