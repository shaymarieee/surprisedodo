// server/src/models/User.js
// This file defines the User model using Mongoose for MongoDB
const mongoose = require('mongoose');

// Post schema for embedded posts in User
const commentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    date: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
    content: String,
    dateCreated: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [commentSchema],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    repostOf: { type: mongoose.Schema.Types.ObjectId } // Reference to original post if repost
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    active: { type: Boolean, default: true },
    bio: String,
    dateJoined: { type: Date, default: Date.now },
    profileUrl: String,
    posts: [postSchema]
});

module.exports = mongoose.model('User', userSchema);