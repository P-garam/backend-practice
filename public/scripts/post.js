// public/scripts/post.js
/*
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    fetch(`http://localhost:3001/api/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(post => {
            const postContainer = document.getElementById('post-container');
            postContainer.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p>Author: ${post.author}</p>
                <p>Likes: ${post.likes}</p>
                <button id="like-button">Like</button>
                <h3>Comments</h3>
                <div id="comments-container"></div>
                <form id="comment-form">
                    <input type="text" id="comment-author" placeholder="Your name" required>
                    <textarea id="comment-content" placeholder="Your comment" required></textarea>
                    <button type="submit">Add Comment</button>
                </form>
            `;

            document.getElementById('like-button').addEventListener('click', () => {
                fetch(`http://localhost:3001/api/posts/${postId}/like`, { method: 'POST' })
                    .then(response => response.json())
                    .then(updatedPost => {
                        document.getElementById('likes-count').innerText = updatedPost.likes;
                    })
                    .catch(error => console.error('Error:', error));
            });

            const commentsContainer = document.getElementById('comments-container');
            if (post.comments && post.comments.length > 0) {
                post.comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.innerHTML = `
                        <p>${comment.content}</p>
                        <p>Author: ${comment.author}</p>
                    `;
                    commentsContainer.appendChild(commentElement);
                });
            } else {
                commentsContainer.innerHTML = '<p>No comments yet.</p>';
            }

            document.getElementById('comment-form').addEventListener('submit', (event) => {
                event.preventDefault();
                const author = document.getElementById('comment-author').value;
                const content = document.getElementById('comment-content').value;

                fetch(`http://localhost:3001/api/comments/${postId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ author, content })
                })
                    .then(response => response.json())
                    .then(newComment => {
                        const commentElement = document.createElement('div');
                        commentElement.innerHTML = `
                            <p>${newComment.content}</p>
                            <p>Author: ${newComment.author}</p>
                        `;
                        commentsContainer.appendChild(commentElement);
                        document.getElementById('comment-author').value = '';
                        document.getElementById('comment-content').value = '';
                    })
                    .catch(error => console.error('Error:', error));
            });
        })
        .catch(error => console.error('Error:', error));
});
*/

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    fetch(`http://localhost:3001/api/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(post => {
            const postContainer = document.getElementById('post-container');
            postContainer.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p>Author: ${post.author}</p>
                <p>Likes: ${post.likes}</p>
                <button id="like-button">Like</button>
                <h3>Comments</h3>
                <div id="comments-container"></div>
                <form id="comment-form">
                    <input type="text" id="comment-author" placeholder="Your name" required>
                    <textarea id="comment-content" placeholder="Your comment" required></textarea>
                    <button type="submit">Add Comment</button>
                </form>
            `;

            document.getElementById('like-button').addEventListener('click', () => {
                fetch(`http://localhost:3001/api/posts/${postId}/like`, { method: 'POST' })
                    .then(response => response.json())
                    .then(updatedPost => {
                        document.getElementById('likes-count').innerText = updatedPost.likes;
                    });
            });

            const commentsContainer = document.getElementById('comments-container');
            if (post.comments && post.comments.length > 0) {
                post.comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.innerHTML = `
                        <p>${comment.content}</p>
                        <p>Author: ${comment.author}</p>
                    `;
                    commentsContainer.appendChild(commentElement);
                });
            } else {
                commentsContainer.innerHTML = '<p>No comments yet.</p>';
            }

            document.getElementById('comment-form').addEventListener('submit', (event) => {
                event.preventDefault();
                const author = document.getElementById('comment-author').value;
                const content = document.getElementById('comment-content').value;

                fetch(`http://localhost:3001/api/comments/${postId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ author, content })
                })
                    .then(response => response.json())
                    .then(newComment => {
                        const commentElement = document.createElement('div');
                        commentElement.innerHTML = `
                            <p>${newComment.content}</p>
                            <p>Author: ${newComment.author}</p>
                        `;
                        commentsContainer.appendChild(commentElement);
                        document.getElementById('comment-author').value = '';
                        document.getElementById('comment-content').value = '';
                    });
            });
        })
        .catch(error => console.error('Error:', error));
});

function loadPosts() {
    fetch('http://localhost:3001/api/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('게시글 목록을 불러오는데 실패했습니다.');
            }
            return response.json();
        })
        .then(posts => {
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = ''; // Clear any existing content

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h3><a href="post.html?id=${post._id}">${post.title}</a></h3>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});
