const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault();
    //Validación
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');
        return;
    }
    //Consultar api
    consultarAPI(ciudad,pais);
}

function mostrarError(mensaje) {
    //creamos una alerta
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) { //verificamos que no exista la alerta a través de la clase que le dimos
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
        <strong class="font-bold">¡Error!</strong>
        <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(()=>{
            alerta.remove();
        },4000);
    }
}

/*
Para poder consumir la API primero hay que solicitar la API KEY, se deben registrar en: https://home.openweathermap.org/users/sign_in
Luego ir a https://home.openweathermap.org/api_keys y copiar la KEY que te dan.
Link de documentación de la API, https://openweathermap.org/current
*/

function consultarAPI(ciudad,pais){
    const appID = 'fbf977614bda21387e3c6107dfc8e6d0';
    //Muy importante agregar https antes de la ruta de la api
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    fetch(url)
        .then(respuesta=> respuesta.json())
        .then(resultado=> {
            if (resultado.cod==='404'){
                mostrarError('Ciudad no encontrada');
            }
        });
}