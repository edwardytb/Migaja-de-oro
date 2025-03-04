document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Credenciales válidas (esto es solo un ejemplo, en un entorno real deberías usar una base de datos)
    const validUsername = 'admin';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
        window.location.href = 'panel.html';
    } else {
        document.getElementById('error-message').textContent = 'Usuario o contraseña incorrectos';
    }
});