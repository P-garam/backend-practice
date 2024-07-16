import React, { useState, useEffect } from 'react';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/posts');
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                throw new Error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>Author: {post.author}</p>
                        <p>Likes: {post.likes}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
