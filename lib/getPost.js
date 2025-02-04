import fs from 'fs';
import path from 'path';

export async function getPost(id) {
    const posts = JSON.parse(await fs.promises.readFile(path.join(process.cwd(), 'data', 'posts.json'), 'utf-8'));
    const post = posts.find(post => post.id === parseInt(id));
    return post;
}

export default getPost;
