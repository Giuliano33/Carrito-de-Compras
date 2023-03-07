// Variables. 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    //Agregar un curso presinando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

}




// Funciones.

function agregarCurso (e) {
    e.preventDefault();
    contenedorCarrito.innerHTML = '';
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        DatosDelCurso(cursoSeleccionado);

    }
    
}



// Informacion del HTML.

function DatosDelCurso (curso) {
    // Crear un Objeto con los datos del curso.
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    } 

    // Agrega elementos al arreglo de "carrito".
    
    articulosCarrito = [...articulosCarrito,infoCurso];

    console.log(articulosCarrito);

    carritoHTML();
};





// Muestra el carrito de compras en el HTML.

function carritoHTML() {

    limpiarHTML();

    // Recorre el carrito yy genera el HTML.

    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${curso.titulo}
            </td>
        `;

        // Agrega el HTML del carrito en el tbody.
        contenedorCarrito.appendChild(row);
    })
}


// Elimina los cursos del Tbody.

function limpiarHTML() {
    
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}