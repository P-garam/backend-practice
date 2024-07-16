document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});

async function loadPosts() {
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error('게시글 목록을 불러오는데 실패했습니다.');
        }

        const posts = await response.json();
        const postsDiv = document.getElementById('posts');
        postsDiv.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `<h3>${post.title}</h3>`;

            // 게시글 제목 클릭 시 해당 게시글의 상세 페이지로 이동
            postElement.addEventListener('click', () => {
                window.location.href = `/post.html?id=${post._id}`;
            });

            postsDiv.appendChild(postElement);
        });
    } catch (error) {
        console.error(error);
    }
}
