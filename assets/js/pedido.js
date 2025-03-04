// Precios de los productos
const precios = {
    "pan-trigo": 2.00,
    "Baguette": 2.50,
    "Donas": 3.00,
    "muffin": 1.50,
    "croissant": 2.00,
    "pan-agua": 1.80,
};

// Objeto para almacenar las cantidades seleccionadas (inicializado en 0)
let cantidades = {};
for (const producto in precios) {
    cantidades[producto] = 0;
}

// Función para agregar un producto a la lista
document.getElementById('agregar-producto').addEventListener('click', function() {
    const producto = document.getElementById('producto').value;
    const listaProductos = document.getElementById('lista-productos');

    if (producto && !cantidades[producto]) {
        // Crear un nuevo campo de cantidad
        const div = document.createElement('div');
        div.classList.add('producto-pedido');
        div.innerHTML = `
            <label>${document.getElementById('producto').options[document.getElementById('producto').selectedIndex].text}</label>
            <input type="number" id="cantidad-${producto}" min="0" value="0">
        `;
        listaProductos.appendChild(div);

        // Escuchar cambios en la cantidad
        const inputCantidad = document.getElementById(`cantidad-${producto}`);
        inputCantidad.addEventListener('input', () => {
            const cantidad = parseInt(inputCantidad.value) || 0; // Convertir a número o usar 0 si no es válido
            cantidades[producto] = cantidad; // Actualizar la cantidad en el objeto
            calcularTotal(); // Recalcular el total
        });
    }
});

// Función para calcular el total
function calcularTotal() {
    let total = 0;
    for (const producto in cantidades) {
        const cantidad = parseInt(cantidades[producto]) || 0; // Asegurar que sea un número
        const precio = precios[producto] || 0; // Asegurar que el precio exista
        total += cantidad * precio;
    }
    document.getElementById('total').textContent = total.toFixed(2); // Mostrar el total con 2 decimales
}

// Enviar pedido
document.getElementById('pedidoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pedido = {
        nombre: document.getElementById('nombre').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        productos: {}
    };

    for (const producto in cantidades) {
        if (cantidades[producto] > 0) {
            pedido.productos[producto] = cantidades[producto];
        }
    }

    // Guardar el pedido en localStorage
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Mostrar alerta con SweetAlert2
    Swal.fire({
        title: '¡Pedido Enviado!',
        text: 'Tu pedido ha sido registrado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        // Limpiar el formulario después de enviar
        document.getElementById('pedidoForm').reset();
        document.getElementById('lista-productos').innerHTML = ''; // Limpiar la lista de productos
        cantidades = {}; // Reiniciar el objeto de cantidades
        calcularTotal(); // Actualizar el total a 0
    });
});