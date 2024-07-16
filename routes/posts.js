/*
// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// 게시글 생성

router.post('/', async (req, res) => {
    const { title, content, author } = req.body;
    const post = new Post({ title, content, author });
    await post.save();
    res.json(post);
});


// 게시글 목록 조회
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('comments');
    res.json(posts);
});

// 게시글 상세 조회
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id).populate('comments');
    res.json(post);
});

// 게시글 수정
router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
        req.params.id,
        { title, content, updatedAt: Date.now() },
        { new: true }
    );
    res.json(post);
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
});

// 좋아요 기능
router.post('/:id/like', async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.likes += 1;
    await post.save();
    res.json(post);
});

module.exports = router;
*/

// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment'); // Comment 모델 추가


// 게시글 생성
router.post('/', async (req, res) => {
    const { title, content, author } = req.body;
    const post = new Post({ title, content, author });
    try {
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 게시글 목록 조회
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('comments');
    res.json(posts);
});

// 게시글 상세 조회
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id).populate('comments');
    res.json(post);
});

// 게시글 수정
router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
        req.params.id,
        { title, content, updatedAt: Date.now() },
        { new: true }
    );
    res.json(post);
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
});

// 좋아요 기능
router.post('/:id/like', async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.likes += 1;
    await post.save();
    res.json(post);
});

module.exports = router;
