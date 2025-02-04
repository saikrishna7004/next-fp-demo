"use client";
import React, { useState } from 'react';
import { savePost } from '@/lib/savePost';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function BlogEditor({ post = {} }) {
    const [title, setTitle] = useState(post.title || '');
    const [content, setContent] = useState(post.content || '');
    const [tags, setTags] = useState(post.tags || []);
    const [newTag, setNewTag] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            ...post,
            title,
            content,
            tags,
        };
        const result = await savePost(newPost);
        if (result.success) {
            Swal.fire({
                icon: 'success',
                title: 'Post saved successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed to save post',
                text: result.message || 'An error occurred',
            });
        }
    };

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div>
                <label htmlFor="title" className="block text-lg font-medium title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 input"
                />
            </div>
            <div>
                <label htmlFor="content" className="block text-lg font-medium title">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 input"
                    rows="10"
                />
            </div>
            <div>
                <label htmlFor="tags" className="block text-lg font-medium title">Tags</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        id="tags"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 input"
                    />
                    <button type="button" onClick={handleAddTag} className="p-2 bg-indigo-600 text-white rounded-md">
                        Add
                    </button>
                </div>
                <div className="mt-2 space-x-2">
                    {tags.map(tag => (
                        <span key={tag} className="inline-flex items-center p-1 rounded tag">
                            {tag}
                            <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 text-red-500">
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            </div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
            </button>
        </form>
    );
}
