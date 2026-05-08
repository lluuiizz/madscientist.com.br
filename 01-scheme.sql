CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY, -- ID numérico sequencial
    title VARCHAR(255) NOT NULL, -- Título do post
    slug VARCHAR(255) UNIQUE NOT NULL, -- URL amigável (ex: o-cha-de-nitrogenio)
    summary TEXT, -- Um resumo curto para aparecer na home
    content TEXT NOT NULL, -- O corpo do post (pode conter HTML ou Markdown)
    author VARCHAR(100) DEFAULT 'Mad Scientist', -- Nome do autor
    category VARCHAR(50), -- Categoria (ex: Química, Física, Código)
    tags TEXT[], -- Array de strings (recurso poderoso do Postgres para etiquetas)
    status VARCHAR(20) DEFAULT 'draft', -- 'draft' (rascunho) ou 'published' (publicado)
    published_at TIMESTAMP WITH TIME ZONE, -- Data de publicação (pode ser agendada)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexar o slug e a data de publicação para buscas rápidas
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published_at ON posts(published_at);

INSERT INTO posts (title, slug, summary, content, category, tags, status, published_at) 
VALUES 
(
    'A verdade sobre o café com nitrogênio líquido', 
    'cafe-nitrogenio-liquido', 
    'Muitos dizem que é perigoso. Eu digo que é a única forma de compilar código rápido.', 
    '<p>O nitrogênio líquido reduz a temperatura da xícara para -196°C instantaneamente...</p>', 
    'Química', 
    ARRAY['café', 'experimento', 'nitrogênio'], 
    'published', 
    NOW()
),
(
    'Docker Swarm em Raspberry Pis', 
    'docker-swarm-raspberry-pi', 
    'Orquestração de containers em hardware de baixo custo.', 
    '<p>Transforme seus mini computadores em um cluster de alta disponibilidade...</p>', 
    'DevOps', 
    ARRAY['docker', 'swarm', 'hardware'], 
    'published', 
    NOW()
);
