const pool = require('../config/db')


async function getPosts() {
    const client = await pool.connect()
    try {
        const query_res = await client.query('SELECT title, summary, category, tags, slug FROM posts')
        const data = query_res.rows.map(post => ({
            title: post.title,
            summary: post.summary,
            category: post.category,
            tags: post.tags,
            slug: post.slug
        }))

        
        return data
    } catch (err) {
        throw err;
    } finally {
        client.release()
    }
}

async function publishPost(data) {
    const client = await pool.connect()

    try {
        await client.query('BEGIN')
        const query = {
            text: 'INSERT INTO posts (title, slug, category, summary, tags, content, author) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            values: [data.title, data.slug, data.category, data.summary, data.tags, data.content, data.author]
        }

        await client.query(query)
        console.log("tentando criar o post! com os valores : \n\n", data)


        await client.query('COMMIT')

    } catch(err) {
        await client.query('ROLLBACK')
        throw err

    } finally {
        client.release()
    }

}

async function getSpecificPost(slug) {
    const client = await pool.connect()
    try {
        const post = (await client.query('SELECT title, summary, category, tags, content, author FROM posts WHERE slug = $1', [slug])).rows[0]
        const data = {
            title: post.title,
            summary: post.summary,
            category: post.category,
            tags: post.tags,
            content: post.content,
            author: post.author
        }
        
        return data
    } catch (err) {
        throw err;
    } finally {
        client.release()
    }

}

async function updatePost(slug, data) {
    return 'TODO: UpdatePost'

}

async function deletePost(slug) {
    return 'TODO: DeletePost'
}

module.exports = {getPosts, publishPost, getSpecificPost, updatePost, deletePost}
