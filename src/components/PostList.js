/*
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
*/

// 예시: React 컴포넌트
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // React Router를 사용하여 라우팅을 관리하는 경우

const PostsList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // 게시글 목록을 가져오는 비동기 함수 (예를 들어, fetch 등을 사용)
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts'); // 서버에서 게시글 목록을 가져오는 API 엔드포인트
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h2>게시글 목록</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;

