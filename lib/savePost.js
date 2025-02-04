"use server";
import fs from 'fs';
import path from 'path';

const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');

export async function savePost(post) {
    try {
        const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'));
        if (post.id) {
            const index = posts.findIndex(p => p.id === post.id);
            if (index !== -1) {
                posts[index] = post;
            } else {
                return { success: false, message: 'Post not found' };
            }
        } else {
            post.id = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
            post.date = new Date().toISOString();
            post.author = 'Admin';
            posts.push(post);
        }
        fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
        return { success: true };
    } catch (error) {
        console.error('Error saving post:', error);
        return { success: false, message: error.message };
    }
}
