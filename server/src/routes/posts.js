const User = require('../models/User');

// Add a post to a user (MongoDB version)
async function addPost(userId, content) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const newPost = { content, dateCreated: new Date() };
    user.posts.push(newPost);
    await user.save();
    // Return the newly added post (last in the array)
    return user.posts[user.posts.length - 1];
}

module.exports