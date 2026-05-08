window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', router);
document.addEventListener('click', async (e) => {
    // Verifica se o que foi clicado é um link de post
    if (e.target.classList.contains('post-link')) {
        e.preventDefault(); // Impede o navegador de mudar de página
        const slug = e.target.getAttribute('data-slug');
        await loadFullPost(slug);
    }
});
async function router() {
    const path = window.location.pathname;
    // Pequeno check para garantir que não vamos quebrar se o elemento sumir
    const container = document.getElementById('post-container');
    if (!container) return; 

    if (path.startsWith('/posts/')) {
        const parts = path.split('/');
        const slug = parts[2]; // Pega o que vem depois de /posts/
        if (slug) {
            await loadFullPost(slug);
        } else {
            window.history.pushState({}, '', '/');
            await fetchPosts();
        }
    } else {
        await fetchPosts();
    }
}

async function fetchPosts() {
    const container = document.getElementById('post-container');

    try {
        // Chamada para o Nginx (que repassa para a API)
        const response = await fetch('/api/posts');

        
        if (!response.ok) throw new Error('Erro ao buscar posts');
        
        const posts = await response.json();

        console.log("Dados recebidos: ", posts[0])
        // Limpa o aviso de "Carregando"
        container.innerHTML = '';

        if (posts.length === 0) {
            container.innerHTML = '<p>Nenhuma pesquisa publicada ainda.</p>';
            return;
        }

        // Monta cada post usando o template moderno/sombrio que criamos
        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'post-item';

            // Tratando as tags (como é um array no Postgres, vem como array no JSON)
            article.innerHTML = `
                <span class="post-meta">${post.category}</span>
                <h2><a href="#" class="post-link" data-slug="${post.slug}">${post.title}</a></h2>
                <p>${post.summary}</p>
            `;
            
            container.appendChild(article);
        });

    } catch (error) {
        console.error('Falha na missão:', error);
        container.innerHTML = '<p style="color: var(--accent-red)">Erro crítico ao acessar o banco de dados do laboratório.</p>';
    }
}

async function loadFullPost(slug) {
    const container = document.getElementById('post-container');
    try {
        container.innerHTML = '<div class="loading">Descriptografando dados...</div>';
        
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) throw new Error('Postagem não encontrada no banco.');
        const post = await response.json();

        // Atualiza a URL sem recarregar a página
        if (window.location.pathname !== `/posts/${slug}`) {
            window.history.pushState({}, '', `/posts/${slug}`);
        }

        const rawMarkdown = post.content || ""
        const formattedMarkdown = rawMarkdown.replace(/\\n/g, '\n')
        const htmlContent = marked.parse(formattedMarkdown)
        console.log(`Marked downed version : ${htmlContent}`)

        container.innerHTML = `
            <article class="full-post">
                <nav><a href="/" id="back-to-home" class="btn-back">← Arquivos</a></nav>
                <header>
                    <span class="category">${post.category}</span>
                    <h1>${post.title}</h1>
                    <p class="author">Por: ${post.author}</p>
                </header>
                <section class="post-content">
                    ${htmlContent}
                </section>
            </article>
        `;

        // Faz o link de voltar funcionar via router sem dar F5
        document.getElementById('back-to-home').addEventListener('click', (e) => {
            e.preventDefault();
            window.history.pushState({}, '', '/');
            router();
        });

    } catch (err) {
        container.innerHTML = `<p class="error">${err.message}</p>`;
    }
}

