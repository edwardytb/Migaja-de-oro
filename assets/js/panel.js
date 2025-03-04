document.addEventListener('DOMContentLoaded', function() {
    // Mostrar pedidos
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const tbodyPedidos = document.getElementById('pedidosTable').getElementsByTagName('tbody')[0];

    pedidos.forEach((pedido, index) => {
        const row = tbodyPedidos.insertRow();
        row.insertCell(0).textContent = pedido.nombre;
        row.insertCell(1).textContent = pedido.direccion;
        row.insertCell(2).textContent = pedido.telefono;

        // Mostrar productos y cantidades
        const productosCell = row.insertCell(3);
        const productosList = document.createElement('ul');
        for (const producto in pedido.productos) {
            const li = document.createElement('li');
            li.textContent = `${producto}: ${pedido.productos[producto]}`;
            productosList.appendChild(li);
        }
        productosCell.appendChild(productosList);

        // Botón para eliminar pedido
        const accionesCell = row.insertCell(4);
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.addEventListener('click', () => eliminarPedido(index));
        accionesCell.appendChild(btnEliminar);
    });

    // Mostrar mensajes de contacto
    const mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
    const tbodyMensajes = document.getElementById('mensajesTable').getElementsByTagName('tbody')[0];

    mensajes.forEach((mensaje, index) => {
        const row = tbodyMensajes.insertRow();
        row.insertCell(0).textContent = mensaje.nombre;
        row.insertCell(1).textContent = mensaje.email;
        row.insertCell(2).textContent = mensaje.mensaje;
        row.insertCell(3).textContent = mensaje.fecha;

        // Botón para eliminar mensaje
        const accionesCell = row.insertCell(4);
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.addEventListener('click', () => eliminarMensaje(index));
        accionesCell.appendChild(btnEliminar);
    });

    // Función para eliminar un pedido
    function eliminarPedido(index) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e76f51',
            cancelButtonColor: '#ccc',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                pedidos.splice(index, 1); // Eliminar el pedido del array
                localStorage.setItem('pedidos', JSON.stringify(pedidos)); // Actualizar localStorage
                location.reload(); // Recargar la página para actualizar la tabla
            }
        });
    }

    // Función para eliminar un mensaje
    function eliminarMensaje(index) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e76f51',
            cancelButtonColor: '#ccc',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                mensajes.splice(index, 1); // Eliminar el mensaje del array
                localStorage.setItem('mensajesContacto', JSON.stringify(mensajes)); // Actualizar localStorage
                location.reload(); // Recargar la página para actualizar la tabla
            }
        });
    }
});