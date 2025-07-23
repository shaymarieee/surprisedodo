const User = require('../models/User');

// Add a post to a user (supports reposts)
async function addPost(userId, content, repostOf = null) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const newPost = {
        content,
        dateCreated: new Date(),
        likes: 0,
        comments: [],
        author: user._id,
        repostOf // null or the original post's id
    };
    user.posts.push(newPost);
    await user.save();
    return user.posts[user.posts.length - 1];
}

module.exports = {
    addPost
};