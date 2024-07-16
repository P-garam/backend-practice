// routes/comments.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// 댓글 작성
router.post('/:postId', async (req, res) => {
    const { content, author } = req.body;
    const comment = new Comment({ postId: req.params.postId, content, author });
    await comment.save();

    const post = await Post.findById(req.params.postId);
    post.comments.push(comment._id);
    await post.save();

    res.json(comment);
});

module.exports = router;
