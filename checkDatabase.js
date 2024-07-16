const mongoose = require('mongoose');
const Post = require('./models/Post'); // 경로를 프로젝트 구조에 맞게 수정

mongoose.connect('mongodb://localhost:27017/backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to the database');

    try {
        const posts = await Post.find();
        console.log(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        mongoose.connection.close();
    }
});
