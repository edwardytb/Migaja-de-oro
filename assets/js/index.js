// Inicializar AOS
AOS.init({
    duration: 1200,
});



//menu 
// Mostrar/ocultar el menú en móviles y cambiar íconos
document.getElementById('menuIcon').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    const menuBars = document.getElementById('menuBars');
    const menuClose = document.getElementById('menuClose');
    const menuIcon = document.getElementById('menuIcon');

    // Alternar la visibilidad del menú
    navMenu.classList.toggle('active');

    // Alternar los íconos de menú y cerrar
    if (navMenu.classList.contains('active')) {
        menuBars.style.display = 'none';
        menuClose.style.display = 'block';
        menuIcon.classList.add('active');
    } else {
        menuBars.style.display = 'block';
        menuClose.style.display = 'none';
        menuIcon.classList.remove('active');
    }
});


// Manejar el envío del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombreContacto').value;
    const email = document.getElementById('emailContacto').value;
    const mensaje = document.getElementById('mensajeContacto').value;

    // Crear un objeto con los datos del mensaje
    const mensajeContacto = {
        nombre,
        email,
        mensaje,
        fecha: new Date().toLocaleString() // Agregar la fecha y hora
    };

    // Guardar el mensaje en localStorage
    let mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
    mensajes.push(mensajeContacto);
    localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));

    // Mostrar alerta de éxito
    Swal.fire({
        title: '¡Mensaje Enviado!',
        text: 'Gracias por contactarnos. Te responderemos pronto.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        // Limpiar el formulario después de enviar
        document.getElementById('contactForm').reset();
    });
});