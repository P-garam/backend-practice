// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // 경로 모듈 추가
const postRouter = require('./routes/posts.js'); // 위에서 설정한 라우터 import
const commentRouter = require('./routes/comments.js'); // 댓글 관리 라우터 import

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connected');
});

// 라우터 설정
app.use('/api/posts', postRouter); // '/posts' 엔드포인트에 postRouter 연결
app.use('/api/comments', commentRouter);

// 정적 파일 서빙 설정
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// edit.html 파일을 서빙할 수 있도록 추가
app.get('/edit.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'edit.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
