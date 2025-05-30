const urlDragonBall = "https://dragonball-api.com/api/characters";
const botonBuscar = document.getElementById("btn-buscar"); 


//Contactar con la API
const cargarDatos = async (url) => {
    try {
        const response = await fetch(urlDragonBall);

        if (!response.ok) {
            throw new error("Error en la API");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};

//Trae los datos de la API
console.log(cargarDatos(urlDragonBall));

