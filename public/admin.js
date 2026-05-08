// Função para verificar se o cookie ainda é válido no servidor
async function checkAuth() {
    try {
        const res = await fetch('/api/login/check-auth');
        if (!res.ok) throw new Error();
    } catch (err) {
        // Se o cookie expirou ou não existe, volta para o login
        window.location.href = '/login';
    }
}

document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log("Submiting form!!!")
    const fileInput = document.getElementById('markdown-file');
    const file = fileInput.files[0];
    const messageDiv = document.getElementById('message');

    if (!file) return;

    // 1. Ler o arquivo .md no cliente
    const reader = new FileReader();
    
    reader.onload = async (event) => {
        const content = event.target.result; // O texto do Markdown

        // 2. Montar o objeto para o Backend
        const postData = {
            title: document.getElementById('title').value,
            slug: document.getElementById('slug').value,
            category: document.getElementById('category').value,
            summary: document.getElementById('summary').value,
            tags: document.getElementById('tags').value.split(',').map(t => t.trim()),
            content: content, // Markdown puro aqui
            author: "Dr. Mad" // Ou pegar do login
        };

        try {
            messageDiv.innerText = "Enviando para o banco de dados...";

            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                messageDiv.style.color = "var(--accent-green)";
                messageDiv.innerText = "✅ Experimento publicado com sucesso!";
                document.getElementById('post-form').reset();
            } else {
                throw new Error("Falha ao salvar no laboratório.");
            }
        } catch (err) {
            messageDiv.style.color = "var(--accent-red)";
            messageDiv.innerText = "❌ Erro: " + err.message;
        }
    };

    reader.readAsText(file);
});
// Executa assim que a página admin carrega
document.addEventListener('DOMContentLoaded', checkAuth);
