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

CREATE TABLE users (
    username TEXT PRIMARY KEY,
    pass TEXT NOT NULL
);
-- Indexar o slug e a data de publicação para buscas rápidas
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published_at ON posts(published_at);

;
