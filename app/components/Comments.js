"use client";

import { useState, useEffect } from "react";
import { getComments, saveComment } from "@/lib/comments";

export default function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        async function fetchComments() {
            const fetchedComments = await getComments(postId);
            setComments(fetchedComments);
        }
        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
            const updatedComments = comments.map((comment, index) =>
                index === editingIndex ? { ...comment, text: editingText } : comment
            );
            await saveComment(postId, updatedComments);
            setComments(updatedComments);
            setEditingIndex(null);
            setEditingText("");
        } else {
            const updatedComments = [...comments, { name: "Anonymous", text: newComment }];
            await saveComment(postId, updatedComments);
            setComments(updatedComments);
            setNewComment("");
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditingText(comments[index].text);
    };

    const handleDelete = async (index) => {
        const updatedComments = comments.filter((_, i) => i !== index);
        await saveComment(postId, updatedComments);
        setComments(updatedComments);
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                    value={editingIndex !== null ? editingText : newComment}
                    onChange={(e) => editingIndex !== null ? setEditingText(e.target.value) : setNewComment(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Add a comment..."
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    {editingIndex !== null ? "Update" : "Submit"}
                </button>
            </form>
            <div className="space-y-4">
                {comments?.map((comment, index) => (
                    <div key={index} className="comment">
                        <p className="font-semibold">{comment.name}</p>
                        <p>{comment.text}</p>
                        <button onClick={() => handleEdit(index)} className="mr-2 text-blue-500">Edit</button>
                        <button onClick={() => handleDelete(index)} className="text-red-500">Delete</button>
                    </div>
                ))}
                {!comments?.length && <p>No comments yet</p>}
            </div>
        </div>
    );
}
