document.addEventListener('DOMContentLoaded', function() {
    const producto = JSON.parse(localStorage.getItem('productoAModificar'));

    if (producto) {
        document.getElementById('id').value = producto.id;
        document.getElementById('id').disabled = true;
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('cantidad').value = producto.cantidad;
        document.getElementById('categoria').value = producto.categoria;
    }
});


document.getElementById('btnGuardar').addEventListener('click', function() {
    // Obtener los valores del formulario
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;
    const categoria = document.getElementById('categoria').value;

    // Validaciones
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

    // Llamadas a funciones de validación (debes implementar estas funciones)
    if (!validarNombre(nombre) || !validarPrecio(precio) || !validarCantidad(cantidad) || !validarCategoria(categoria)) {
        return;
    }

    // Crear objeto producto
    const producto = {
        id: id,
        nombre: nombre,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad),
        categoria: categoria
    };

    // Llamar a la función para guardar el producto
    actualizarProducto(producto);
    localStorage.clear();
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

    // Verificar que la cantidad es un entero
    if (!Number.isInteger(cantidadNumerica)) {
        alert('La cantidad debe ser un número entero.');
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
    
}

function actualizarProducto(producto) {
    const urlApi = `http://localhost:8080/editarProducto/${producto.id}`;
    const usuario = 'jose';
    const contraseña = '6824';
    const credencialesBase64 = btoa(usuario + ':' + contraseña);

    const configuracion = {
        method: 'PUT',
        headers: {
            'Authorization': 'Basic ' + credencialesBase64,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    };

    fetch(urlApi, configuracion)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            return response.json();
        })
        .then(data => {
            alert(data.mensaje);
        })
        .catch(error => {
            console.error('Error al actualizar el producto:', error);
        });
}

function limpiarCamposFormulario() {
    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('categoria').value = '';
}

document.getElementById('btnVolver').addEventListener('click', function() {
    window.location.href = 'index.html';
});