// models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now },
});

//새로추가한거
const Comment = mongoose.model('Comment', CommentSchema);


//module.exports = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

