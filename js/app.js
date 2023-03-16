// Variables. 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    // Agregar un curso presinando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', elminarCurso);

    // Vaciar el carrito 
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];  // Reseteamos el arreglo
    
        limpiarHTML();  // Eliminamos todo el HTML
    }); 

};



// Funciones.

function agregarCurso (e) {
    e.preventDefault();
    contenedorCarrito.innerHTML = '';
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        DatosDelCurso(cursoSeleccionado);

    }
    
};

// Elmina un curso del carrito 
function elminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Elimina el arreglo de "articulosCarrito" por el 'data-id'
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        console.log(articulosCarrito);
        
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
};

// Informacion del HTML.
function DatosDelCurso (curso) {
    // Crear un Objeto con los datos del curso.
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son los duplicados 
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito,infoCurso];
    };

    console.log(articulosCarrito);

    carritoHTML();
};



// Muestra el carrito de compras en el HTML.
function carritoHTML() {

    limpiarHTML();
    // Recorre el carrito yy genera el HTML.

    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src = "${curso.imagen}" width="100"> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${id}"> X </a> 
            </td>
        `;

        // Agrega el HTML del carrito en el tbody.
        contenedorCarrito.appendChild(row);
    })
};


// Elimina los cursos del Tbody.
function limpiarHTML() {
    
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
};