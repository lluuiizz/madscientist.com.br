document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const credentials = {
        user: document.getElementById('username').value,
        pass: document.getElementById('password').value
    };

    console.log(credentials.user)
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });

    if (response.ok) {
        // O Cookie já está salvo no navegador agora
        window.location.href = '/admin'; 
    } else {
        alert("Acesso negado!");
    }
});
