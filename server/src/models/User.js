// server/src/models/User.js
// This file defines the User model using Mongoose for MongoDB
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: String,
    dateCreated: { type: Date, default: Date.now }
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