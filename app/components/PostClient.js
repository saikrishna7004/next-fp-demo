"use client";

import { useState, useEffect } from "react";

export default function PostClient({ postId }) {
    const [likes, setLikes] = useState(0);
    const [views, setViews] = useState(0);

    useEffect(() => {
        const storedLikes = parseInt(localStorage.getItem(`likes-${postId}`)) || 0;
        const storedViews = parseInt(localStorage.getItem(`views-${postId}`)) || 0;

        setLikes(storedLikes);
        setViews(storedViews + 1);
        localStorage.setItem(`views-${postId}`, storedViews + 1);
    }, [postId]);

    const handleLike = () => {
        const updatedLikes = likes + 1;
        setLikes(updatedLikes);
        localStorage.setItem(`likes-${postId}`, updatedLikes);
    };

    return (
        <div className="mt-4 flex items-center">
            <button onClick={handleLike} className="mr-4 text-blue-500">Like ({likes})</button>
            <span>Views: {views}</span>
        </div>
    );
}
