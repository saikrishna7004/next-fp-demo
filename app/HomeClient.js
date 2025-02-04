"use client";

import { useState } from "react";

export default function HomeClient({ posts }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");

    const filteredPosts = posts.filter(post => {
        return (
            (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedTag ? post.tags.includes(selectedTag) : true)
        );
    });

    return (
        <div className="min-h-screen flex flex-col">
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded"
                />
                <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="ml-4 p-2 border rounded head"
                >
                    <option value="">All Tags</option>
                    {Array.from(new Set(posts.flatMap(post => post.tags))).map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>
            <main className="grid gap-8">
                {filteredPosts.map(post => (
                    <article key={post.id} className="p-4 border rounded">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p className="text-sm text-gray-600">{post.author} - {new Date(post.date).toLocaleDateString()}</p>
                        <p className="mt-2">{post.content.substring(0, 100)}...</p>
                        <div className="mt-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="tag mr-2">{tag}</span>
                            ))}
                        </div>
                        <a href={`/posts/${post.id}`} className="mt-4 inline-block text-blue-500">Read more</a>
                    </article>
                ))}
            </main>
        </div>
    );
}
