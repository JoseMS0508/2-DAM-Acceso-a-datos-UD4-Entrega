// Event Listener para cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    cargarProductosDesdeAPI();
});

// Event Listener para clics en todo el documento
document.addEventListener('click', function(event) {
    const tabla = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];
    const dentroDeLaTabla = tabla.contains(event.target);

    if (!dentroDeLaTabla) {
        document.querySelectorAll('#tablaProductos tr').forEach(tr => tr.classList.remove('seleccionada'));
    }
});


function cargarProductosDesdeAPI() {
    const urlApi = 'http://localhost:8080/productos';
    const usuario = 'jose';
    const contraseña = '6824';
    const credencialesBase64 = btoa(usuario + ':' + contraseña);

    const configuracion = {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + credencialesBase64,
            'Content-Type': 'application/json'
        }
    };

    fetch(urlApi, configuracion)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al recuperar los datos');
            }
            return response.json();
        })
        .then(datos => {
            const tabla = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];
            tabla.innerHTML = ''; // Limpiar la tabla antes de añadir nuevos datos
            datos.forEach(producto => {
                agregarProductoATabla(producto, tabla);
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

function agregarProductoATabla(producto, tabla) {
    let fila = tabla.insertRow();
    fila.insertCell().textContent = producto.id;
    fila.insertCell().textContent = producto.nombre;
    fila.insertCell().textContent = producto.precio;
    fila.insertCell().textContent = producto.cantidad;
    fila.insertCell().textContent = producto.categoria;

    // Evento de clic para alternar la selección de la fila
    fila.addEventListener('click', function(event) {
        event.stopPropagation(); // Evitar que este evento se propague al documento
        if (this.classList.contains('seleccionada')) {
            this.classList.remove('seleccionada');
        } else {
            document.querySelectorAll('#tablaProductos tr').forEach(tr => tr.classList.remove('seleccionada'));
            this.classList.add('seleccionada');
        }
    });
}

// Event Listener para el botón "Eliminar"
document.getElementById('btnEliminar').addEventListener('click', function() {
    const tabla = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];
    const filaSeleccionada = document.querySelector('#tablaProductos tr.seleccionada');

    if (filaSeleccionada) {
        const id = Number(filaSeleccionada.cells[0].textContent); // Convierte el ID a tipo Number
        borrarProductoPorId(id); // Llama al método para borrar el producto
    } else {
        alert('Por favor, selecciona una fila para eliminar.');
    }
});

function borrarProductoPorId(id) {
    const urlApi = `http://localhost:8080/borrarProducto/${id}`;
    const usuario = 'jose';
    const contraseña = '6824';
    const credencialesBase64 = btoa(usuario + ':' + contraseña);

    const configuracion = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Basic ' + credencialesBase64,
            'Content-Type': 'application/json'
        }
    };

    fetch(urlApi, configuracion)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al borrar el producto');
            }
            return response.json();
        })
        .then((data) => {
            alert(data.mensaje);
            cargarProductosDesdeAPI(); // Recarga la lista de productos
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
        });
}

//CODIGO NECESARIO FUNCIONALIDAD BOTON AÑADIR

document.getElementById('btnAñadir').addEventListener('click', function() {
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const precio = document.getElementById('precio').value.trim();
    const cantidad = document.getElementById('cantidad').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const id = document.getElementById('id').value.trim();


    // Validaciones
    if (id) {
        alert('El ID se asignará automáticamente, por favor deja el campo de ID vacío.');
        return;
    }
    if (!nombre) {
        alert('Por favor, rellena el nombre del producto.');
        return;
    }
    if (!precio) {
        alert('Por favor, rellena el precio del producto.');
        return;
    }
    if (!cantidad) {
        alert('Por favor, rellena la cantidad del producto.');
        return;
    }
    if (!categoria) {
        alert('Por favor, rellena la categoría del producto.');
        return;
    }

    // Llamadas a funciones de validación
    if (!validarNombre(nombre) || !validarPrecio(precio) || !validarCantidad(cantidad) || !validarCategoria(categoria)) {
        return;
    }

    // Crear objeto producto
    const producto = {
        nombre: nombre,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad),
        categoria: categoria
    };

    // Llamar a la función para guardar el producto
    guardarProducto(producto);

    // Recargar los productos y limpiar los campos de entrada
    cargarProductosDesdeAPI();
    limpiarCamposFormulario();
    
});

function validarNombre(nombre) {
    // Longitud de caracteres
    if (nombre.length > 20) {
        alert('El nombre del producto debe tener entre 1 y 50 caracteres.');
        return false;
    }

    // Verificar que no sean solo números
    if (!isNaN(nombre)) {
        alert('El nombre del producto no puede contener solo números.');
        return false;
    }

    // Securizacion básica para evitar inyecciones simples
    const nombreSinInyecciones = nombre.replace(/<[^>]*>?/gm, '');

    if (!(nombreSinInyecciones === nombre)) {
        alert('Introduce un nombre con caracteres válidos');
        return false;
    }

    //Si ha pasado todos los filtros entonces esta validado
    return true;
}

function validarPrecio(precio) {
   // Verificar que la entrada es un número
    const precioAComprobar = Number(precio);
    if (isNaN(precioAComprobar)) {
        alert('El precio debe ser un número.');
        return false;
    }

    // Verificar que el precio no sea negativo
    if (precioAComprobar < 0) {
        alert('El precio no puede ser negativo.');
        return false;
    }

    // Verificar la cantidad de dígitos después del punto decimal
    // Por ejemplo, restringir a 2 dígitos después del punto decimal
    const partes = precioAComprobar.toString().split('.');
    if (partes.length > 1 && partes[1].length > 2) {
        alert('El precio no puede tener más de dos dígitos después del punto decimal.');
        return false;
    }

    return true;
}

function validarCantidad(cantidad) {
    // Trimming para remover espacios en blanco al inicio y al final
    const cantidadTrimmed = cantidad.trim();

    // Verificar que la entrada es un número
    const cantidadNumerica = Number(cantidadTrimmed);
    if (isNaN(cantidadNumerica)) {
        alert('La cantidad debe ser un número.');
        return false;
    }

    // Verificar que el id es un entero
    if ((cantidad.includes('.'))) {
        alert('El id debe ser un número entero sin decimales.');
        return false;
    }

    // Verificar que la cantidad no es negativa
    if (cantidadNumerica < 0) {
        alert('La cantidad no puede ser negativa.');
        return false;
    }

    return true;
}

function validarCategoria(categoria) {
        // Longitud de caracteres
        if (categoria.length > 20) {
            alert('La categoria del producto debe tener entre 1 y 50 caracteres.');
            return false;
        }
    
        // Verificar que no sean solo números
        if (!isNaN(categoria)) {
            alert('La categoria del producto no puede contener solo números.');
            return false;
        }
    
        // Securizacion básica para evitar inyecciones simples
        const nombreSinInyecciones = categoria.replace(/<[^>]*>?/gm, '');
    
        if (!(nombreSinInyecciones === categoria)) {
            alert('Introduce una categoria con caracteres válidos');
            return false;
        }
    
        //Si ha pasado todos los filtros entonces esta validado
        return true;
    return true;
}

function validarId(id) {
    // Verificar que la entrada es un número
    const idNumerico = Number(id);
    if (isNaN(idNumerico)) {
        alert('El id debe ser un número.');
        return false;
    }
    
    // Verificar que el id es un entero
    if ((id.includes('.'))) {
        alert('El id debe ser un número entero sin decimales.');
        return false;
    }

    // Verificar que el id no es negativo
    if (idNumerico < 0) {
        alert('El id no puede ser un número negativo.');
        return false;
    }

    return true;
}


function guardarProducto(producto) {
    const urlApi = 'http://localhost:8080/guardarProducto';
    const usuario = 'jose';
    const contraseña = '6824';
    const credencialesBase64 = btoa(usuario + ':' + contraseña);

    const configuracion = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + credencialesBase64,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    };

    fetch(urlApi, configuracion)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar el producto');
            }
            return response.json();
        })
        .then(data => {
            alert(data.mensaje);
            cargarProductosDesdeAPI(); // Recargar la lista de productos
        })
        .catch(error => {
            console.error('Error al guardar el producto:', error);
        });
}

function limpiarCamposFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('categoria').value = '';
}



//BOTON MODIDICAR

document.getElementById('btnModificar').addEventListener('click', function() {
    const filaSeleccionada = document.querySelector('#tablaProductos tr.seleccionada');

    if (!filaSeleccionada) {
        alert('Por favor, selecciona un producto a modificar.');
        return;
    }

    const producto = {
        id: filaSeleccionada.cells[0].textContent,
        nombre: filaSeleccionada.cells[1].textContent,
        precio: filaSeleccionada.cells[2].textContent,
        cantidad: filaSeleccionada.cells[3].textContent,
        categoria: filaSeleccionada.cells[4].textContent
    };

    // Guardar el producto seleccionado en el almacenamiento local
    localStorage.setItem('productoAModificar', JSON.stringify(producto));

    // Abrir la nueva página HTML para modificar
    window.location.href = 'modificar.html';
});

//BOTON BUSCAR

document.getElementById('btnBuscar').addEventListener('click', function() {
    const parametrosBusqueda = {
        id: document.getElementById('id').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        precio: document.getElementById('precio').value.trim(),
        cantidad: document.getElementById('cantidad').value.trim(),
        categoria: document.getElementById('categoria').value.trim()
    };

    //Si el campo id tiene datos
    if(parametrosBusqueda.id !=="") {
        //Comprobamos si esos datos estan correctos para poder usarlos para buscar
        if (!(validarId(parametrosBusqueda.id ))) {
            return;
        }
    }

    //Si el campo nombre tiene datos
    if(parametrosBusqueda.nombre !=="") {
        //Comprobamos si esos datos estan correctos para poder usarlos para buscar
        if (!(validarNombre(parametrosBusqueda.nombre ))) {
            return;
        }
    }

    //Si el campo precio tiene datos
    if(parametrosBusqueda.precio !=="") {
        //Comprobamos si esos datos estan correctos para poder usarlos para buscar
        if (!(validarPrecio(parametrosBusqueda.precio))) {
            return;
        }
    }

    //Si el campo id tiene datos
    if(parametrosBusqueda.cantidad !=="") {
        //Comprobamos si esos datos estan correctos para poder usarlos para buscar
        if (!(validarCantidad(parametrosBusqueda.cantidad))) {
            return;
        }
    }

    //Si el campo id tiene datos
    if(parametrosBusqueda.categoria !=="") {
        //Comprobamos si esos datos estan correctos para poder usarlos para buscar
        if (!(validarCategoria(parametrosBusqueda.categoria))) {
            return;
        }
    }

    buscarProductos(parametrosBusqueda);
});


function buscarProductos(parametros) {
    const queryParams = new URLSearchParams();

    for (const key in parametros) {
        if (parametros[key]) {
            queryParams.append(key, parametros[key]);
        }
    }

    // Asumiendo que ya tienes la autenticación básica configurada:
    const usuario = 'jose';
    const contraseña = '6824';
    const credencialesBase64 = btoa(usuario + ':' + contraseña);

    fetch(`http://localhost:8080/productosBuscados?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + credencialesBase64,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la búsqueda de productos');
        }
        return response.json();
    })
    .then(datos => {
        const tabla = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];
        tabla.innerHTML = ''; // Limpiar la tabla antes de añadir nuevos datos
        datos.forEach(producto => {
            agregarProductoATabla(producto, tabla);
        });
    })
    .catch(error => {
        console.error('Error al buscar productos:', error);
    });
}

