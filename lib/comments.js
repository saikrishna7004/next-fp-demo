"use server"
import fs from 'fs';
import path from 'path';

const commentsFilePath = path.join(process.cwd(), 'data', 'comments.json');

export async function getComments(postId) {
    try {
        if (!fs.existsSync(commentsFilePath)) {
            fs.writeFileSync(commentsFilePath, JSON.stringify({}));
        }
        const comments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf-8'));
        return comments[postId] || [];
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}

export async function saveComment(postId, comments) {
    try {
        const allComments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf-8'));
        allComments[postId] = comments;
        fs.writeFileSync(commentsFilePath, JSON.stringify(allComments, null, 2));
        return { success: true };
    } catch (error) {
        console.error('Error saving comment:', error);
        return { success: false, message: error.message };
    }
}
