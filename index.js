// función para obtener clima por geolocalización

async function obtenerClimaPorGeolocalizacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;

            // Llamada a la API usando la geolocalización

            const apiKey = '774b3528728a1d1d6007d6f345182121';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(apiUrl);
                const datos = await response.json();
                mostrarClima(datos);
            } catch (error) {
                console.error('Error al obtener los datos del clima:', error);
                alert('Error al obtener los datos del clima');
            }
        }, (error) => {
            console.error('Error obteniendo la geolocalización:', error);
            alert('Error obteniendo la geolocalización');
        });
    } else {
        console.error('Geolocalización no soportada por este navegador.');
        alert('Geolocalización no soportada por este navegador.');
    }
}

// Función para obtener los datos del Clima de la API

async function obtenerClima(nombreCiudad) {
    const apiKey = '774b3528728a1d1d6007d6f345182121';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=${apiKey}&units=metric`);
        const datos = await response.json();
        mostrarClima(datos);
    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
        alert('Error al obtener los datos del clima');
    }
}

// Creación de variables para almacenar los datos del tiempo

function mostrarClima(datos) {
    const ciudad = document.getElementById('city-name');
    const iconoClima = document.getElementById('weather-icon');
    const descripcionClima = document.getElementById('weather-description');
    const temperatura = document.getElementById('temperature');
    const humedad = document.getElementById('humidity');
    const velocidadViento = document.getElementById('wind-speed');
    const direccionViento = document.getElementById('wind-direction');
    const presion = document.getElementById('pressure');

    ciudad.textContent = datos.name;
    iconoClima.src = `http://openweathermap.org/img/wn/${datos.weather[0].icon}.png`;
    iconoClima.alt = datos.weather[0].main;
    descripcionClima.textContent = datos.weather[0].description;
    temperatura.textContent = `Temperatura: ${datos.main.temp} °C`;
    humedad.textContent = `Humedad: ${datos.main.humidity}%`;
    velocidadViento.textContent = `Velocidad del viento: ${datos.wind.speed} m/s`;
    direccionViento.textContent = `Dirección del viento : ${datos.wind.deg} °`;
    presion.textContent = `Presión: ${datos.main.pressure} hPa`;
}

// Función para el funcionamiento de la barra de búsqueda

function barraBusqueda(event) {
    event.preventDefault();
    const entradaBusqueda = document.getElementById('buscador');
    const nombreCiudad = entradaBusqueda.value;
    if (nombreCiudad.trim() !== '') {
        obtenerClima(nombreCiudad);
    } else {
        alert('Por favor ingresa un nombre de ciudad');
    }
}

// Función para el funcionamiento de la lista desplegable

function citySelector(event) {
    event.preventDefault();
    const ciudadElegida = document.getElementById('city-select')
    const nombreCiudadElegida = ciudadElegida.value;

    obtenerClima(nombreCiudadElegida);
}

// Uso de onload para que al cargar la página se haga uso de la función obtenerClimaPorGeolocalización

window.onload = function () {
    obtenerClimaPorGeolocalizacion();

    const formularioBusqueda = document.getElementById('searchForm');
    formularioBusqueda.addEventListener('submit', barraBusqueda);

    const seleccionCiudad = document.getElementById('city-select');
    seleccionCiudad.addEventListener('change', citySelector);
}



