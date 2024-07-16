// public/scripts/new-post.js
document.getElementById('post-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, author })
    })
        .then(response => response.json())
        .then(post => {
            window.location.href = `post.html?id=${post._id}`;
        })
        .catch(error => console.error)
    })
