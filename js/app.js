import {appKey} from './ApiKey.js';

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
    //Limpar html
    limpiarHTML();

    //Muy importante agregar https antes de la ruta de la api
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appKey}`;

    fetch(url)
        .then(respuesta=> respuesta.json())
        .then(datos=> {
            if (datos.cod==='404'){
                mostrarError('Ciudad no encontrada');
                return;
            }
            mostrarClima(datos);
        });
}

function mostrarClima(datos){

    const {main: {temp,temp_min, temp_max, pressure, humidity}} = datos; //Destructuring
    const centigrados = kelvinACentigrados(temp);

    const actual = document.createElement('p');
    //&#8451  = °C
    actual.innerHTML = `
    Temperatura = ${centigrados} &#8451 
    `;

    actual.classList.add('font-bold','mt-5','text-6x1');
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');
    resultadoDiv.appendChild(actual);
    resultado.appendChild(resultadoDiv);

}

//Función que convierte los grados kelvin a centigrados
const kelvinACentigrados = grados =>  parseInt(grados - 273.15);


function limpiarHTML(){
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}