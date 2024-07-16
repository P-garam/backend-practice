document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3001/api/posts')
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts-container');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <p><a href="post.html?id=${post._id}">Read more</a></p>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error:', error));
});
