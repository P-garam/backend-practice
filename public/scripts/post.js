document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    fetch(`http://localhost:3001/api/posts/${postId}`)
        .then(response => response.json())
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
                        postContainer.querySelector('p').innerText = `Likes: ${updatedPost.likes}`;
                    });
            });

            const commentsContainer = document.getElementById('comments-container');
            post.comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.innerHTML = `
                    <p>${comment.content}</p>
                    <p>Author: ${comment.author}</p>
                `;
                commentsContainer.appendChild(commentElement);
            });

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
                    });
            });
        })
        .catch(error => console.error('Error:', error));
});
